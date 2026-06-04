<?php

namespace App\Services;

use RuntimeException;
use SimpleXMLElement;
use ZipArchive;

class MedalTallyExcelParser
{
    private const MAIN_NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    private const REL_NS = 'http://schemas.openxmlformats.org/package/2006/relationships';
    private const OFFICE_REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

    public function parse(string $path): array
    {
        $zip = new ZipArchive();

        if ($zip->open($path) !== true) {
            throw new RuntimeException('Unable to open Excel workbook.');
        }

        try {
            $sharedStrings = $this->sharedStrings($zip);
            $sheets = $this->sheetIndex($zip);
            $overall = [];
            $sportTallies = [];
            $asOfText = null;
            $warnings = [];

            foreach ($sheets as $sheet) {
                $rows = $this->rows($zip, $sheet['path'], $sharedStrings);

                if ($sheet['name'] === 'Overall Standings') {
                    $asOfText = $this->cell($rows, 3, 1);
                    $overall = $this->parseTallyRows($rows, 6, $sheet['name'], includeRank: true);
                    continue;
                }

                if ($sheet['name'] === 'Tally Calculations') {
                    continue;
                }

                $sportName = $this->normalizeSportName($this->cell($rows, 4, 1) ?: $sheet['name']);
                $sportTallies[$sportName] = $this->parseTallyRows($rows, 6, $sheet['name']);

                foreach ($sportTallies[$sportName] as $row) {
                    if ($row['gold'] + $row['silver'] + $row['bronze'] !== $row['total']) {
                        $warnings[] = "{$sheet['name']} row {$row['source_row']}: {$row['municipality']} total does not equal gold + silver + bronze.";
                    }
                }
            }

            if (! $overall) {
                throw new RuntimeException('The workbook does not contain readable Overall Standings rows.');
            }

            if (! $sportTallies) {
                throw new RuntimeException('The workbook does not contain readable sport tally sheets.');
            }

            return [
                'as_of_text' => $asOfText,
                'overall' => $overall,
                'sports' => $sportTallies,
                'warnings' => $warnings,
            ];
        } finally {
            $zip->close();
        }
    }

    private function sharedStrings(ZipArchive $zip): array
    {
        $xml = $this->xml($zip, 'xl/sharedStrings.xml', optional: true);

        if (! $xml) {
            return [];
        }

        $strings = [];

        foreach ($xml->children(self::MAIN_NS)->si as $si) {
            $strings[] = $this->textNodes($si);
        }

        return $strings;
    }

    private function sheetIndex(ZipArchive $zip): array
    {
        $workbook = $this->xml($zip, 'xl/workbook.xml');
        $relationships = $this->xml($zip, 'xl/_rels/workbook.xml.rels');
        $relationshipMap = [];

        foreach ($relationships->Relationship as $relationship) {
            $relationshipMap[(string) $relationship['Id']] = (string) $relationship['Target'];
        }

        $sheets = [];
        foreach ($workbook->children(self::MAIN_NS)->sheets->sheet as $sheet) {
            $attributes = $sheet->attributes();
            $relationshipAttributes = $sheet->attributes(self::OFFICE_REL_NS);
            $target = $relationshipMap[(string) $relationshipAttributes['id']] ?? null;

            if (! $target) {
                continue;
            }

            $sheets[] = [
                'name' => (string) $attributes['name'],
                'path' => str_starts_with($target, 'xl/') ? $target : 'xl/'.ltrim($target, '/'),
            ];
        }

        return $sheets;
    }

    private function rows(ZipArchive $zip, string $path, array $sharedStrings): array
    {
        $xml = $this->xml($zip, $path);
        $rows = [];

        foreach ($xml->children(self::MAIN_NS)->sheetData->row as $row) {
            $rowNumber = (int) (string) $row->attributes()['r'];
            foreach ($row->c as $cell) {
                $cellRef = (string) $cell->attributes()['r'];
                $rows[$rowNumber][$this->columnIndex($cellRef)] = $this->cellValue($cell, $sharedStrings);
            }
        }

        return $rows;
    }

    private function parseTallyRows(array $rows, int $headerRow, string $sheetName, bool $includeRank = false): array
    {
        $parsed = [];
        $startRow = $headerRow + 1;

        for ($row = $startRow; $row <= max(array_keys($rows)); $row++) {
            $municipality = trim((string) $this->cell($rows, $row, $includeRank ? 2 : 1));

            if ($municipality === '' || strcasecmp($municipality, 'TOTAL') === 0) {
                continue;
            }

            $gold = $this->numberOrNull($this->cell($rows, $row, $includeRank ? 3 : 2));
            $silver = $this->numberOrNull($this->cell($rows, $row, $includeRank ? 4 : 3));
            $bronze = $this->numberOrNull($this->cell($rows, $row, $includeRank ? 5 : 4));
            $total = $this->numberOrNull($this->cell($rows, $row, $includeRank ? 6 : 5));

            if ($gold === null && $silver === null && $bronze === null && $total === null) {
                continue;
            }

            $parsed[] = [
                'municipality' => $municipality,
                'gold' => $gold ?? 0,
                'silver' => $silver ?? 0,
                'bronze' => $bronze ?? 0,
                'total' => $total ?? (($gold ?? 0) + ($silver ?? 0) + ($bronze ?? 0)),
                'source_sheet' => $sheetName,
                'source_row' => $row,
            ];
        }

        return $parsed;
    }

    private function cell(array $rows, int $row, int $column): mixed
    {
        return $rows[$row][$column] ?? null;
    }

    private function numberOrNull(mixed $value): ?int
    {
        if ($value === null || $value === '' || $value === '-') {
            return null;
        }

        return (int) $value;
    }

    private function cellValue(SimpleXMLElement $cell, array $sharedStrings): mixed
    {
        $attributes = $cell->attributes();
        $type = (string) ($attributes['t'] ?? '');
        $main = $cell->children(self::MAIN_NS);

        if ($type === 's') {
            $index = (int) ($main->v ?? 0);

            return $sharedStrings[$index] ?? null;
        }

        if ($type === 'inlineStr') {
            return $this->textNodes($cell);
        }

        if (! isset($main->v)) {
            return null;
        }

        $value = (string) $main->v;

        if (is_numeric($value)) {
            return str_contains($value, '.') ? (float) $value : (int) $value;
        }

        return $value;
    }

    private function columnIndex(string $cellRef): int
    {
        preg_match('/^[A-Z]+/', $cellRef, $matches);
        $letters = $matches[0] ?? 'A';
        $index = 0;

        foreach (str_split($letters) as $letter) {
            $index = ($index * 26) + (ord($letter) - 64);
        }

        return $index;
    }

    private function normalizeSportName(string $name): string
    {
        $name = trim(preg_replace('/\s+/', ' ', mb_convert_case($name, MB_CASE_TITLE, 'UTF-8')));

        return match ($name) {
            'Dance Sport' => 'Dancesport',
            default => $name,
        };
    }

    private function textNodes(SimpleXMLElement $xml): string
    {
        $xml->registerXPathNamespace('main', self::MAIN_NS);

        return implode('', array_map(
            fn (SimpleXMLElement $text) => (string) $text,
            $xml->xpath('.//main:t') ?: []
        ));
    }

    private function xml(ZipArchive $zip, string $path, bool $optional = false): ?SimpleXMLElement
    {
        $contents = $zip->getFromName($path);

        if ($contents === false) {
            if ($optional) {
                return null;
            }

            throw new RuntimeException("Missing workbook part: {$path}");
        }

        $xml = simplexml_load_string($contents);

        if (! $xml) {
            throw new RuntimeException("Invalid workbook XML: {$path}");
        }

        $xml->registerXPathNamespace('main', self::MAIN_NS);

        return $xml;
    }
}

<?php

namespace App\Services;

use App\Models\Medal;
use App\Models\MedalImport;
use App\Models\Municipality;
use App\Models\Sport;
use App\Models\SportMedalTally;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MedalTallyImportService
{
    public function __construct(private readonly MedalTallyExcelParser $parser)
    {
    }

    public function import(UploadedFile|string $file, ?User $user = null): MedalImport
    {
        $path = $file instanceof UploadedFile ? $file->getRealPath() : $file;
        $filename = $file instanceof UploadedFile ? $file->getClientOriginalName() : basename($file);
        $parsed = $this->parser->parse($path);

        return DB::transaction(function () use ($parsed, $filename, $user) {
            $import = MedalImport::create([
                'user_id' => $user?->id,
                'original_filename' => $filename,
                'as_of_text' => $parsed['as_of_text'],
                'status' => 'pending',
                'warnings' => $parsed['warnings'],
            ]);

            $rowsImported = 0;

            foreach ($parsed['sports'] as $sportName => $rows) {
                $sport = Sport::firstOrCreate(
                    ['name' => $sportName],
                    ['icon' => Str::slug($sportName)]
                );

                foreach ($rows as $row) {
                    $municipality = Municipality::firstOrCreate(['name' => $row['municipality']]);

                    SportMedalTally::create([
                        'medal_import_id' => $import->id,
                        'sport_id' => $sport->id,
                        'municipality_id' => $municipality->id,
                        'gold' => $row['gold'],
                        'silver' => $row['silver'],
                        'bronze' => $row['bronze'],
                        'total' => $row['total'],
                        'source_sheet' => $row['source_sheet'],
                        'source_row' => $row['source_row'],
                    ]);

                    $rowsImported++;
                }
            }

            Medal::query()->delete();

            foreach ($parsed['overall'] as $row) {
                $municipality = Municipality::firstOrCreate(['name' => $row['municipality']]);

                Medal::updateOrCreate(
                    ['municipality_id' => $municipality->id],
                    [
                        'gold' => $row['gold'],
                        'silver' => $row['silver'],
                        'bronze' => $row['bronze'],
                        'total' => $row['total'],
                    ]
                );

                $rowsImported++;
            }

            $import->update([
                'status' => 'imported',
                'rows_imported' => $rowsImported,
                'imported_at' => now(),
            ]);

            return $import;
        });
    }
}

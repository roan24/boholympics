<?php

namespace App\Services;

use App\Models\Medal;
use App\Models\Municipality;
use Illuminate\Support\Collection;

class MedalTallyService
{
    public function tally(): Collection
    {
        return Municipality::query()
            ->withCount([
                'results as gold' => fn ($query) => $query->where('medal_type', 'gold'),
                'results as silver' => fn ($query) => $query->where('medal_type', 'silver'),
                'results as bronze' => fn ($query) => $query->where('medal_type', 'bronze'),
                'results as total',
            ])
            ->get()
            ->sortBy([
                ['gold', 'desc'],
                ['silver', 'desc'],
                ['bronze', 'desc'],
                ['total', 'desc'],
                ['name', 'asc'],
            ])
            ->values()
            ->map(fn ($municipality, $index) => [
                'rank' => $index + 1,
                'id' => $municipality->id,
                'name' => $municipality->name,
                'logo' => $municipality->logo,
                'gold' => $municipality->gold,
                'silver' => $municipality->silver,
                'bronze' => $municipality->bronze,
                'total' => $municipality->total,
            ]);
    }

    public function refreshCache(): void
    {
        $this->tally()->each(function (array $row) {
            Medal::updateOrCreate(
                ['municipality_id' => $row['id']],
                [
                    'gold' => $row['gold'],
                    'silver' => $row['silver'],
                    'bronze' => $row['bronze'],
                    'total' => $row['total'],
                ]
            );
        });
    }
}

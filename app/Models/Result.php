<?php

namespace App\Models;

use App\Services\MedalTallyService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    protected $fillable = [
        'event_id',
        'municipality_id',
        'medal_type',
        'athlete_name',
        'team_name',
        'score',
        'remarks',
    ];

    protected static function booted(): void
    {
        static::saved(fn () => app(MedalTallyService::class)->refreshCache());
        static::deleted(fn () => app(MedalTallyService::class)->refreshCache());
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }
}

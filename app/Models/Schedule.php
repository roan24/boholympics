<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = [
        'event_id',
        'municipality_a_id',
        'municipality_b_id',
        'venue',
        'scheduled_at',
        'status',
    ];

    protected function casts(): array
    {
        return ['scheduled_at' => 'datetime'];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function municipalityA(): BelongsTo
    {
        return $this->belongsTo(Municipality::class, 'municipality_a_id');
    }

    public function municipalityB(): BelongsTo
    {
        return $this->belongsTo(Municipality::class, 'municipality_b_id');
    }
}

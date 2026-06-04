<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SportMedalTally extends Model
{
    protected $fillable = [
        'medal_import_id',
        'sport_id',
        'municipality_id',
        'gold',
        'silver',
        'bronze',
        'total',
        'source_sheet',
        'source_row',
    ];

    public function import(): BelongsTo
    {
        return $this->belongsTo(MedalImport::class, 'medal_import_id');
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Medal extends Model
{
    protected $fillable = ['municipality_id', 'gold', 'silver', 'bronze', 'total'];

    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }
}

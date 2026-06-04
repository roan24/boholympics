<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MedalImport extends Model
{
    protected $fillable = [
        'user_id',
        'original_filename',
        'as_of_text',
        'status',
        'rows_imported',
        'warnings',
        'imported_at',
    ];

    protected $casts = [
        'warnings' => 'array',
        'imported_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sportTallies(): HasMany
    {
        return $this->hasMany(SportMedalTally::class);
    }
}

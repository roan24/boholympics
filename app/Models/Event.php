<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    protected $fillable = ['sport_id', 'name', 'category', 'gender', 'status'];

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }
}

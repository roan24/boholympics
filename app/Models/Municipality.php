<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Municipality extends Model
{
    protected $fillable = ['name', 'logo'];

    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }

    public function medal(): HasOne
    {
        return $this->hasOne(Medal::class);
    }
}

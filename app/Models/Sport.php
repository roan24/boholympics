<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sport extends Model
{
    protected $fillable = ['name', 'icon'];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}

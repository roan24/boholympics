<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Sport;
use Inertia\Inertia;
use Inertia\Response;

class SportsController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Sports', [
            'sports' => Sport::withCount('events')->orderBy('name')->get(),
        ]);
    }
}

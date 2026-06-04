<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResultsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $filters = $request->only(['sport_id', 'category', 'gender']);

        $results = Result::with(['event.sport', 'municipality'])
            ->when($filters['sport_id'] ?? null, fn ($query, $sportId) => $query->whereHas('event', fn ($event) => $event->where('sport_id', $sportId)))
            ->when($filters['category'] ?? null, fn ($query, $category) => $query->whereHas('event', fn ($event) => $event->where('category', $category)))
            ->when($filters['gender'] ?? null, fn ($query, $gender) => $query->whereHas('event', fn ($event) => $event->where('gender', $gender)))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Public/Results', [
            'results' => $results,
            'sports' => Sport::orderBy('name')->get(['id', 'name']),
            'filters' => $filters,
        ]);
    }
}

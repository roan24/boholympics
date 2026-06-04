<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $filters = $request->only(['sport_id', 'status', 'gender']);

        $schedules = Schedule::with(['event.sport', 'municipalityA', 'municipalityB'])
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['sport_id'] ?? null, fn ($query, $sportId) => $query->whereHas('event', fn ($event) => $event->where('sport_id', $sportId)))
            ->when($filters['gender'] ?? null, fn ($query, $gender) => $query->whereHas('event', fn ($event) => $event->where('gender', $gender)))
            ->orderBy('scheduled_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Public/Schedule', [
            'schedules' => $schedules,
            'sports' => Sport::orderBy('name')->get(['id', 'name']),
            'filters' => $filters,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Municipality;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Sport;
use App\Services\MedalTallyService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(MedalTallyService $tally): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'cards' => [
                'municipalities' => Municipality::count(),
                'sports' => Sport::count(),
                'events' => Event::count(),
                'results' => Result::count(),
            ],
            'leaders' => $tally->tally()->take(5)->values(),
            'recentResults' => Result::with(['event.sport', 'municipality'])->latest()->take(6)->get(),
            'upcomingSchedules' => Schedule::with(['event.sport'])->orderBy('scheduled_at')->take(6)->get(),
        ]);
    }
}

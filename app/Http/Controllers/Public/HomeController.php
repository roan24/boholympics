<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Sport;
use App\Services\MedalTallyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request, MedalTallyService $tally): Response
    {
        return Inertia::render('Public/Home', [
            'leaders' => $tally->tally()->take(5)->values(),
            'stats' => [
                'municipalities' => $tally->tally()->count(),
                'sports' => Sport::count(),
                'events' => Event::count(),
                'completedEvents' => Event::where('status', 'completed')->count(),
            ],
            'liveEvents' => Event::with('sport')->where('status', 'live')->latest()->take(8)->get(),
            'recentResults' => Result::with(['event.sport', 'municipality'])->latest()->take(8)->get(),
            'upcomingSchedules' => Schedule::with(['event.sport', 'municipalityA', 'municipalityB'])
                ->whereIn('status', ['scheduled', 'live'])
                ->where('scheduled_at', '>=', now()->subHours(3))
                ->orderBy('scheduled_at')
                ->take(8)
                ->get(),
        ]);
    }
}

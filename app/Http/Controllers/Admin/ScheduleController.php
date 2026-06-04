<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScheduleRequest;
use App\Models\Event;
use App\Models\Municipality;
use App\Models\Schedule;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Schedules', [
            'schedules' => Schedule::with(['event.sport', 'municipalityA', 'municipalityB'])->latest('scheduled_at')->paginate(15),
            'events' => Event::with('sport')->orderBy('name')->get(),
            'municipalities' => Municipality::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(ScheduleRequest $request)
    {
        Schedule::create($request->validated());

        return back()->with('success', 'Schedule added.');
    }

    public function update(ScheduleRequest $request, Schedule $schedule)
    {
        $schedule->update($request->validated());

        return back()->with('success', 'Schedule updated.');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return back()->with('success', 'Schedule deleted.');
    }
}

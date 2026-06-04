<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Models\Sport;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Events', [
            'events' => Event::with('sport')->latest()->paginate(15),
            'sports' => Sport::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(EventRequest $request)
    {
        Event::create($request->validated());

        return back()->with('success', 'Event added.');
    }

    public function update(EventRequest $request, Event $event)
    {
        $event->update($request->validated());

        return back()->with('success', 'Event updated.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return back()->with('success', 'Event deleted.');
    }
}

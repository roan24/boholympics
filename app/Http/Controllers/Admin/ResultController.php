<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResultRequest;
use App\Models\Event;
use App\Models\Municipality;
use App\Models\Result;
use Inertia\Inertia;
use Inertia\Response;

class ResultController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Results', [
            'results' => Result::with(['event.sport', 'municipality'])->latest()->paginate(15),
            'events' => Event::with('sport')->orderBy('name')->get(),
            'municipalities' => Municipality::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(ResultRequest $request)
    {
        Result::create($request->validated());

        return back()->with('success', 'Result saved and medal tally refreshed.');
    }

    public function update(ResultRequest $request, Result $result)
    {
        $result->update($request->validated());

        return back()->with('success', 'Result updated and medal tally refreshed.');
    }

    public function destroy(Result $result)
    {
        $result->delete();

        return back()->with('success', 'Result deleted and medal tally refreshed.');
    }
}

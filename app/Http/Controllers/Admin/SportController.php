<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SportRequest;
use App\Models\Sport;
use Inertia\Inertia;
use Inertia\Response;

class SportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Sports', [
            'sports' => Sport::withCount('events')->orderBy('name')->paginate(15),
        ]);
    }

    public function store(SportRequest $request)
    {
        Sport::create($request->validated());

        return back()->with('success', 'Sport added.');
    }

    public function update(SportRequest $request, Sport $sport)
    {
        $sport->update($request->validated());

        return back()->with('success', 'Sport updated.');
    }

    public function destroy(Sport $sport)
    {
        $sport->delete();

        return back()->with('success', 'Sport deleted.');
    }
}

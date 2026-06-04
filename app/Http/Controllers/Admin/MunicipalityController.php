<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MunicipalityRequest;
use App\Models\Municipality;
use Inertia\Inertia;
use Inertia\Response;

class MunicipalityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Municipalities', [
            'municipalities' => Municipality::withCount('results')->orderBy('name')->paginate(15),
        ]);
    }

    public function store(MunicipalityRequest $request)
    {
        Municipality::create($request->validated());

        return back()->with('success', 'Municipality added.');
    }

    public function update(MunicipalityRequest $request, Municipality $municipality)
    {
        $municipality->update($request->validated());

        return back()->with('success', 'Municipality updated.');
    }

    public function destroy(Municipality $municipality)
    {
        $municipality->delete();

        return back()->with('success', 'Municipality deleted.');
    }
}

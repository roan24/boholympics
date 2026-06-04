<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MedalImport;
use App\Services\MedalTallyImportService;
use App\Services\MedalTallyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class MedalTallyController extends Controller
{
    public function __invoke(MedalTallyService $tally): Response
    {
        return Inertia::render('Admin/MedalTally', [
            'tally' => $tally->tally(),
            'lastImport' => MedalImport::query()
                ->latest('imported_at')
                ->first(['id', 'original_filename', 'as_of_text', 'status', 'rows_imported', 'warnings', 'imported_at']),
        ]);
    }

    public function import(Request $request, MedalTallyImportService $importer): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'extensions:xlsx', 'max:10240'],
        ]);

        try {
            $import = $importer->import($request->file('file'), $request->user());
        } catch (Throwable $exception) {
            return back()->with('error', 'Import failed: '.$exception->getMessage());
        }

        $message = "Imported {$import->rows_imported} medal tally rows from {$import->original_filename}.";

        if (count($import->warnings ?? []) > 0) {
            $message .= ' Review warnings below.';
        }

        return back()->with('success', $message);
    }
}

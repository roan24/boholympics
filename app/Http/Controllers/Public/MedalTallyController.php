<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\MedalTallyService;
use Inertia\Inertia;
use Inertia\Response;

class MedalTallyController extends Controller
{
    public function __invoke(MedalTallyService $tally): Response
    {
        return Inertia::render('Public/MedalTally', [
            'tally' => $tally->tally(),
        ]);
    }
}

<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MedalTallyController as AdminMedalTallyController;
use App\Http\Controllers\Admin\MunicipalityController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Admin\ScheduleController as AdminScheduleController;
use App\Http\Controllers\Admin\SportController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\MedalTallyController;
use App\Http\Controllers\Public\ResultsController;
use App\Http\Controllers\Public\ScheduleController;
use App\Http\Controllers\Public\SportsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/medal-tally', MedalTallyController::class)->name('medal-tally');
Route::get('/sports', SportsController::class)->name('sports');
Route::get('/schedule', ScheduleController::class)->name('schedule');
Route::get('/results', ResultsController::class)->name('results');

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('/municipalities', MunicipalityController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/sports', SportController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/events', EventController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/schedules', AdminScheduleController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/results', ResultController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/medal-tally', AdminMedalTallyController::class)->name('medal-tally');
    Route::post('/medal-tally/import', [AdminMedalTallyController::class, 'import'])->name('medal-tally.import');
    Route::resource('/users', UserController::class)->only(['index', 'store', 'update', 'destroy']);
});

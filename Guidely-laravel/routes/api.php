<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TouristeController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\LoginController;

Route::get('/test', function () {
    return "API WORKING";
});

// ─── Inscription ───────────────────────────────────────────
Route::post('/guides',    [GuideController::class,   'store']);
Route::post('/touristes', [TouristeController::class, 'store']);

// ─── Connexion ─────────────────────────────────────────────
Route::post('/login/guide',    [LoginController::class, 'loginGuide']);
Route::post('/login/touriste', [LoginController::class, 'loginTouriste']);
Route::get('/guides/{id}', [GuideController::class, 'show']);
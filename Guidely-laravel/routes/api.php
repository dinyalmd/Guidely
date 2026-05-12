<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TouristeController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\AdminController;

Route::get('/test', function () {
    return "API WORKING";
});

// ─── Inscription ───────────────────────────────────────────
Route::post('/guides',    [GuideController::class,   'store']);
Route::post('/touristes', [TouristeController::class, 'store']);

// ─── Connexion ─────────────────────────────────────────────
Route::post('/login/guide',    [LoginController::class, 'loginGuide']);
Route::post('/login/touriste', [LoginController::class, 'loginTouriste']);
Route::post('/login/admin',    [AdminController::class, 'login']);

// ─── Guide profil ──────────────────────────────────────────
Route::get('/guides/{id}', [GuideController::class, 'show']);

// ─── Admin ─────────────────────────────────────────────────
Route::prefix('admin')->group(function () {
    Route::get('/stats',                              [AdminController::class, 'getStats']);

    // Guides
    Route::get('/guides',                             [AdminController::class, 'getGuides']);
    Route::put('/guides/{id}/valider',                [AdminController::class, 'validerGuide']);
    Route::delete('/guides/{id}',                     [AdminController::class, 'supprimerGuide']);

    // Touristes
    Route::get('/touristes',                          [AdminController::class, 'getTouristes']);
    Route::delete('/touristes/{id}',                  [AdminController::class, 'supprimerTouriste']);

    // Réservations
    Route::get('/reservations',                       [AdminController::class, 'getReservations']);
    Route::put('/reservations/{id}/statut',           [AdminController::class, 'updateReservationStatut']);
    Route::delete('/reservations/{id}',               [AdminController::class, 'supprimerReservation']);
});
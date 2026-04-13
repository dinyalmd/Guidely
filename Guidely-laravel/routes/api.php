<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TouristeController; 
use App\Http\Controllers\Api\GuideController;
Route::get('/test', function() {
    return "API WORKING";
});

Route::post('/guides', [GuideController::class, 'store']);
Route::post('/touristes', [TouristeController::class, 'store']);
?>
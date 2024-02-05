<?php

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\TestimoniesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api_key')->controller(TestimoniesController::class)->group(function() {
    Route::get('/testimonies', 'showData')->name('testimoniesShowApi');
    Route::post('/testimonies/store', 'store')->name('testimoniesStoreApi');
    Route::get('/testimonies/{id}/edit', 'edit')->name('testimoniesEditApi');
    Route::post('/testimonies/{id}/update', 'update')->name('testimoniesUpdateApi');
    Route::delete('/testimonies/{id}/delete', 'delete')->name('testimoniesDeleteApi');
});

Route::middleware('api_key')->controller(ClientsController::class)->group(function() {
    Route::get('/clients', 'showData')->name('clientsShowApi');
    Route::post('/clients/store', 'store')->name('clientsStoreApi');
    Route::get('/clients/{id}/edit', 'edit')->name('clientsEditApi');
    Route::post('/clients/{id}/update', 'update')->name('clientsUpdateApi');
    Route::delete('/clients/{id}/delete', 'delete')->name('clientsDeleteApi');
});

Route::middleware('api_key')->controller(PortfolioController::class)->group(function() {
    Route::get('/portfolio', 'showData')->name('portfolioShowApi');
    Route::post('/portfolio/store', 'store')->name('portfolioStoreApi');
    Route::get('/portfolio/{id}/edit', 'edit')->name('portfolioEditApi');
    Route::post('/portfolio/{id}/update', 'update')->name('portfolioUpdateApi');
    Route::delete('/portfolio/{id}/delete', 'delete')->name('portfolioDeleteApi');
});
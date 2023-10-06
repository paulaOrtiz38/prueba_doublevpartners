<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('tickets',[TicketController::class,'index']);
Route::post('tickets/save',[TicketController::class,'store']);
Route::get('tickets/{id}',[TicketController::class,'show']);
Route::delete('tickets/{id}',[TicketController::class,'destroy']);
Route::put('tickets/{id}',[TicketController::class,'update']);
//Route::resource('tickets', 'TicketController');

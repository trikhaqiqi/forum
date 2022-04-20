<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/dashboard', DashboardController::class)->name('dashboard');

Route::resource('threads', ThreadController::class);

Route::post('threads/{thread:slug}/reply', [ReplyController::class, 'store'])->name('replies.store');

require __DIR__ . '/auth.php';

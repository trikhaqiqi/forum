<?php

use App\Models\User;
use App\Models\Thread;

test('an authenticated user can create new thread', function () {
    // $this->withoutExceptionHandling();
    $thread = Thread::factory()->make();
    // dd($thread->toArray());
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post(route('threads.store'), $thread->toArray());
    expect($response->getStatusCode())->toEqual(302);
    $response->assertRedirect();
});

test('an authenticated user can not create new thread if he does not fill anything required', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post(route('threads.store'), [
        'title' => '',
    ]);
    expect($response->getStatusCode())->toEqual(302);
    $response->assertRedirect();
});

test('a guest can not create new threads', function () {
    $thread = Thread::factory()->make();
    $response = $this->post(route('threads.store'), $thread->toArray());
    $response->assertRedirect(route('login'));
    $this->assertGuest();
});

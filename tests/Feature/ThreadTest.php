<?php

use App\Models\User;
use App\Models\Thread;

test('an authenticated user can create new thread', function () {
    $thread = Thread::factory()->make();
    $user = User::factory()->create();
    $this->actingAs($user)->post(route('threads.store'), $thread->toArray())->assertRedirect();
});

test('an authenticated user can not create new thread if he does not fill anything required', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->post(route('threads.store'), [
        'title' => '',
    ])->assertRedirect();
});

test('a guest can not create new threads', function () {
    $thread = Thread::factory()->make();
    $this->post(route('threads.store'), $thread->toArray())->assertRedirect(route('login'));
    $this->assertGuest();
});

<?php

use App\Models\Thread;
use App\Models\User;

beforeEach(function () {
    $this->thread = Thread::factory()->create();
    $this->user = User::factory()->create();
});


it('can be reply by authenticated user', function () {
    $this->actingAs($this->user)->post(route('replies.store', $this->thread->slug), [
        'body' => 'A first reply',
    ])->assertRedirect();
    expect($this->thread->replies->count())->toEqual(1);
});

it('can not be reply by unauthenticated user', function () {
    $this->post(route('replies.store', $this->thread->slug), [
        'body' => 'A first reply',
    ])->assertRedirect(route('login'));
    $this->assertGuest();
});

it('will be redirect to 404 page if thread does not exists', function () {
    $this->actingAs($this->user)->post(route('replies.store', 1), [
        'body' => 'A first reply',
    ])->assertStatus(404);
});

it('can not be reply if authenticated user does not fill the body field', function () {
    $response = $this->actingAs($this->user)->post(route('replies.store', $this->thread->slug), []);
    $response->assertRedirect()->assertSessionHasErrors();
});

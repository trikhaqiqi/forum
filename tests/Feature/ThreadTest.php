<?php

use App\Models\Category;
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

it('can be update by the owner of thread', function () {
    // $this->withoutExceptionHandling();
    $user = User::factory()->create();
    $thread = Thread::factory()->create();

    $response = $this->actingAs($user)->put(route('threads.update', $thread->id), [
        'id' => 5,
        'title' => 'Thread Updated',
        'body' => 'The body is updated',
        'category_id' => Category::factory()->create()->id,
    ]);

    // dd($response->getRequest());
    $response->assertRedirect();
    expect($response->getRequest()->title)->toEqual('Thread Updated');
});

it('can not be updated if he does not fill anything required', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();

    $response = $this->actingAs($user)->put(route('threads.update', $thread->id), []);
    $response->assertRedirect()->assertSessionHasErrors();
});

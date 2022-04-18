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
    $thread = Thread::factory()->create(['user_id' => $user->id]);

    expect($user->id)->toEqual($thread->user_id);

    $response = $this->actingAs($user)->put(route('threads.update', $thread->id), [
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
    $thread = Thread::factory()->create(['user_id' => $user->id]);

    expect($thread->user_id)->toEqual($user->id);

    $response = $this->actingAs($user)->put(route('threads.update', $thread->id), []);
    $response->assertRedirect()->assertSessionHasErrors();
});

it('can not be updated if he does not own the thread', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();
    $response = $this->actingAs($user)->put(route('threads.update', $thread->id), []);
    expect($response->status())->toEqual(403);
});

it('can be deleted by the owner of the thread', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create(['user_id' => $user->id]);
    expect($user->id)->toEqual($thread->user_id);
    $response = $this->actingAs($user)->delete(route('threads.destroy', $thread->id));
    $response->assertRedirect(route('threads.index'));
    $this->assertDeleted($thread);
});

it('can not be deleted if he does not own the thread', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();
    $response = $this->actingAs($user)->delete(route('threads.destroy', $thread->id));
    expect($response->status())->toEqual(403);
});

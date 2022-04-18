<?php

namespace App\Http\Controllers;

use App\Http\Resources\ThreadResource;
use App\Models\Category;
use App\Models\Thread;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $thread = Thread::query()->with(['category', 'user']);
        return inertia('Threads/Index', [
            'threads' => ThreadResource::collection($thread->latest()->paginate()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Threads/Create', [
            'categories' => Category::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category_id' => ['required'],
        ]);

        // dd($request->toArray());
        $thread = $request->user()->threads()->create([
            'title' => $name = $request->title,
            'slug' => Str::slug($name . '-' . Str::random(6)),
            'body' => $request->body,
            'category_id' => $request->category_id,
        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        return inertia('Threads/Show', [
            'thread' => new ThreadResource($thread),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        return inertia('Threads/Edit', [
            'categories' => Category::get(),
            'thread' => $thread,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);
        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category_id' => ['required'],
        ]);

        $thread->update([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);
        $thread->delete();
        return redirect(route('threads.index'));
    }
}

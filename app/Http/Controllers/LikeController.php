<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $key = $request->keys()[0];
        switch ($key) {
            case 'thread':
                $thread = Thread::find($request->get($key));
                $toggle = $thread->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
                $request->user()->likes()->$toggle($thread->likes()->make());
                break;
            case 'reply':
                $reply = Reply::find($request->get($key));
                $toggle = $reply->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
                $request->user()->likes()->$toggle($reply->likes()->make());
                break;

            default:
                abort(404);
                break;
        }
    }
}

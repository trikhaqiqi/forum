<?php

namespace App\Http\Resources;

use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'teaser' => Str::limit($this->body, 180),
            'created_at' => $this->created_at->format("d F, Y"),
            // Ini untuk mark reply best comment
            'answer_id' => $this->answer_id,
            // Ini akhirannya
            'likes_count' => $this->likes_count,
            'replies_count' => $this->replies_count,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                // 'picture' => $this->when(request()->routeIs('threads.show', $this->slug), $this->user->picture()),
                'picture' => $this->user->picture(),
            ],
        ];
    }
}

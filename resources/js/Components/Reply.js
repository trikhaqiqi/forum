import React, { useState } from "react";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/inertia-react";

export default function Reply({ thread }) {

    const {data, setData, post, reset} = useForm({
        body: '',
        parent_id: '',
    });

    const handleChange = (e) => setData(e.target.name, e.target.value)

    const showReplyForm = (parent) => {
        // console.log(parent);
        setData({...data, parent_id: parent.id})
    }

    const replyStoreHandler = (e) => {
        e.preventDefault();
        post(route('replies.store', thread.data.slug), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    }

    return (
        <div>
            {thread.replies.length ? thread.replies.map(reply => (
                        <div key={reply.id} className="py-4">
                            <div className="flex gap-x-4">
                                <img className="w-8 h-8 mt-1 rounded-full" src={reply.user.picture} alt={reply.user.name} />
                                <div>
                                    <h4 className="text-sm font-medium">{reply.user.name}</h4>

                                    <div>{reply.body}</div>
                                    <div className="flex items-center gap-x-4">
                                        <span className="text-gray-500 text-xs">
                                            {reply.created_at}
                                        </span>
                                        <button className="text-gray-500 text-xs" onClick={() => showReplyForm(reply)}>
                                            Reply
                                        </button>
                                    </div>

                                    {reply.children.length ? reply.children.map(child => (
                                        <div className="flex gap-x-4 space-y-4 mt-4" key={child.id}>
                                            <img className="w-8 h-8 mt-3 rounded-full" src={child.user.picture} alt={child.user.name} />
                                            <div>
                                                <h4 className="text-sm font-medium">{child.user.name}</h4>
                                                <span className="text-gray-500 text-xs">
                                                    Replied at {child.created_at}
                                                </span>
                                                <div>{child.body}</div>
                                            </div>
                                        </div>
                                    )) : '' }

                                    {data.parent_id ? data.parent_id == reply.id &&
                                        <form onSubmit={replyStoreHandler}>
                                            <div className="mb-5">
                                                <textarea name="body" value={data.body} onChange={handleChange} />
                                            </div>
                                            <Button>Reply</Button>
                                        </form>
                                    : ''}
                                </div>
                            </div>
                        </div>
                    )): 'No reply'}
                <div className="h-px bg-black"></div>

                <form onSubmit={replyStoreHandler}>
                    <div className="mb-5">
                        <textarea name="body" value={data.body} onChange={handleChange} />
                    </div>
                    <Button>Reply</Button>
                </form>
        </div>
    );
}

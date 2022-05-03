import React, { useState } from "react";
import Button from "@/Components/Button";
import { Link, useForm } from "@inertiajs/inertia-react";
import ReplyBlock from "./ReplyBlock";

export default function Reply({ thread, auth }) {

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
                        <ReplyBlock key={reply.id} {...{ reply, thread, auth, data, setData, showReplyForm, replyStoreHandler, handleChange }} />
                    )): 'No reply'}
                <div className="h-px bg-black"></div>

                { auth.user ? !data.parent_id &&
                    <form onSubmit={replyStoreHandler}>
                        <div className="mb-5">
                            <textarea name="body" value={data.body} onChange={handleChange} />
                        </div>
                        <Button>Reply</Button>
                    </form>
                : ''}
        </div>
    );
}

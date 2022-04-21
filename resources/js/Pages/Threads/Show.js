import Button from "@/Components/Button";
import App from "@/Layouts/App";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";

export default function Show({ thread }) {
    const {data, setData, post, reset} = useForm({
        body: '',
    });

    const handleChange = (e) => setData(e.target.name, e.target.value)

    const replyStoreHandler = (e) => {
        e.preventDefault();
        post(route('replies.store', thread.data.slug), {
            onSuccess: () => reset()
        });
    }
    return (
            <div>
                <Head title={thread.data.title} />
                <h1>{thread.data.title}</h1>
                <div>
                    {thread.data.created_at}
                </div>
                <div className="leading-relaxed">
                    {thread.data.body}
                </div>
                <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)} method="delete" as="button">
                    Delete
                </Link>

                <div className="h-px bg-black"></div>
                    {thread.replies.length ? thread.replies.map(reply => (
                        <div key={reply.id} className="py-4">

                            <div className="flex gap-x-4">
                                <img className="w-8 h-8 mt-1 rounded-full" src={reply.user.picture} alt={reply.user.name} />
                                <div>
                                    <h4 className="text-sm font-medium">{reply.user.name}</h4>
                                    <span className="text-gray-500 text-xs">
                                        {reply.created_at}
                                    </span>
                                <div>{reply.body}</div>
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

Show.layout = page => <App children={page} />

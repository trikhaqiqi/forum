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
        post(route('replies.store', thread.slug), {
            onSuccess: () => reset()
        });
    }
    return (
            <div>
                <Head title={thread.title} />
                <h1>{thread.title}</h1>
                <div>
                    {thread.created_at}
                </div>
                <div className="leading-relaxed">
                    {thread.body}
                </div>
                <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.slug)} method="delete" as="button">
                    Delete
                </Link>

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

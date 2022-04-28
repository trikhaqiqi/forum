import Reply from "@/Components/Reply";
import App from "@/Layouts/App";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React from "react";

export default function Show({ thread }) {

    const { auth } = usePage().props;

    // console.log(auth.user.id, thread.user_id);
    // console.log(`user ${auth.user.id}`, `thread user_id ${thread.user_id}`);

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

                { auth.user ? auth.user.id === thread.data.user.id &&
                    <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)} method="delete" as="button">
                        Delete
                    </Link> : ''
                }

                <div className="h-px bg-black"></div>
                {/* <Reply thread={thread}/> */}
                <Reply {...{ auth, thread }} />
            </div>
        );
}

Show.layout = page => <App children={page} />

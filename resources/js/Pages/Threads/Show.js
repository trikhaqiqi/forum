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
            <div className="bg-white rounded-lg shadow">
                <div className="flex p-6">
                    <div className="flex-shrink-0 mr-3">
                        <img className="w-8 h-8 rounded-full" src={thread.data.user.picture} alt={thread.data.user.name} />
                    </div>
                    <div>
                        <h1>{thread.data.title}</h1>
                        <div>
                            {thread.data.created_at}
                        </div>
                        <div className="leading-relaxed">
                            {thread.data.body}
                        </div>
                    </div>
                </div>
                <div className="border-t px-6 py-3">
                    {auth.user ?
                        <>
                            {auth.user.id === thread.data.user.id &&
                                <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)} method="delete" as="button">
                                    Delete
                                </Link>}
                            <Link className="px-3 space-x-2 py-0.5 text-sm rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition duration-200" href={route('likes.store')} method="POST" data={{ thread: thread.data.id }} as="button" preserveScroll>
                                <span>Like</span>
                                <span>{thread.data.likes_count}</span>
                            </Link>
                        </>
                        : ''}
                </div>
            </div>



            {/* { auth.user ? auth.user.id === thread.data.user.id &&
                    <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)} method="delete" as="button">
                        Delete
                    </Link> : ''
                } */}

            {/* <div className="h-px bg-black"></div> */}
            {/* <Reply thread={thread}/> */}
            <Reply {...{ auth, thread }} />
        </div>
    );
}

Show.layout = page => <App children={page} />;

import Pagination from "@/Components/Pagination";
import App from "@/Layouts/App";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Index(props) {
    const { data: threads, meta } = props.threads
    // console.log(props.threads);
    return (
        <div className="space-y-4">
            {threads.length ? threads.map(thread => (
                <div className="block bg-white" key={thread.id}>
                    <Link href="#" className="text-blue-500 font-medium text-sm">{thread.category.name}</Link>
                    <Link href={route('threads.show', thread.slug)}>
                        <h1>{thread.title}</h1>
                    </Link>
                    <div className="flex items-center gap-x-4">
                        <h4>{thread.user.name}</h4>
                        <span className="text-gray-500 text-xs">{thread.created_at}</span>
                    </div>
                </div>
            )) : 'No threads.'}
            <Pagination meta={meta} />
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads" />

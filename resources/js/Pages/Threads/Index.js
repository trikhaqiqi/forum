import App from "@/Layouts/App";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Index( props ) {
    const { data: threads } = props.threads
    // console.log(props);
    return (
        <div className="space-y-4">
            {threads.length ? threads.map(thread => (
                <div className="block bg-white shadow-sm border p-5 rounded-lg" key={thread.id}>
                    <Link href="#" className="text-blue-500 font-medium text-sm">{thread.category.name}</Link>
                    <Link href={route('threads.show', thread.slug)}>
                        <h1>{thread.title}</h1>
                    </Link>
                    <div className="flex items-center">
                        <img className="w-9 h-9 rounded-full mr-3 text-sm font-medium" src={thread.user.picture} alt={thread.user.name} />
                        <div>
                            <h4 className="-mb-1">{thread.user.name}</h4>
                            <span className="text-gray-500 text-xs">{thread.created_at}</span>
                        </div>
                    </div>
                </div>
            )) : 'No threads.'}
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads"/>

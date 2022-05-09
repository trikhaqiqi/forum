import React, { useState, useEffect, useCallback } from "react";
import Pagination from "@/Components/Pagination";
import App from "@/Layouts/App";
import { Head, Link } from "@inertiajs/inertia-react";
import { debounce, pickBy } from "lodash";
import { Inertia } from "@inertiajs/inertia";
import Filter from "@/Components/Filter";

export default function Index(props) {
    const { filter, categories } = props;

    const { data: threads, meta } = props.threads;

    const [keyword, setKeyword] = useState(filter.search);

    const reload = useCallback(
        debounce((q) => {
            // console.log(q);
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, category: filter.category }), { preserveState: true });
        }, 500)
        , []);

    useEffect(() => reload(keyword), [keyword]);

    // console.log(props.threads);
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-x-4 max-w-lg">
                <Filter categories={categories} initialState={filter.category || ''} />
                <input type="text" placeholder="Search..." name="search" id="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
            {threads.length ? threads.map(thread => (
                <div className="block bg-white" key={thread.id}>
                    <Link href={`/threads?category=${thread.category.slug}`} className="text-blue-500 font-medium text-sm">{thread.category.name}</Link>
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

Index.layout = page => <App children={page} title="Threads" />;

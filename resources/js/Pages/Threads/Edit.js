// import App from "@/Layouts/App";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Forum from "@/Layouts/Forum";

export default function Edit({ thread, categories }) {
    const { data, setData, put } = useForm({
        title: thread.title,
        body: thread.body,
        category_id: thread.category_id,
    });

    const updateHandler = (e) => {
        e.preventDefault();
        put(route('threads.update', thread.id));
    };

    const handleChange = (e) => setData(e.target.name, e.target.value);

    return (
        <div>
            <form onSubmit={updateHandler}>
                <div className="mb-5">
                    <Input type="text" name="title" value={data.title} handleChange={handleChange} />
                </div>
                <div className="mb-5">
                    <textarea name="body" value={data.body} onChange={handleChange} />
                </div>
                <div className="mb-5">
                    <select name="category_id" value={data.category_id} onChange={handleChange}>
                        <option>Choose category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <Button>
                    Update
                </Button>
            </form>
        </div>
    );
}

Edit.layout = page => <Forum children={page} />;

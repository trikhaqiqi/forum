import Button from "@/Components/Button";
import Input from "@/Components/Input";
// import App from "@/Layouts/App";
import Forum from "@/Layouts/Forum";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

export default function Create(props) {
    const { categories } = props;

    const { data, setData, post, reset } = useForm({
        title: '', body: '', category_id: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const storeHandler = (e) => {
        e.preventDefault();
        post(route('threads.store'));
    };

    return (
        <div>
            <form onSubmit={storeHandler}>
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
                    Create
                </Button>
            </form>
        </div>
    );
}

Create.layout = page => <Forum children={page} title="New Thread" />;

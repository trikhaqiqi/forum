import React from 'react';
import App from '@/Layouts/App';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <div>
            Dashboard
        </div>
    );
}

Dashboard.layout = page => <App children={page} />

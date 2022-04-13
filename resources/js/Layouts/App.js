import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';

export default function App({ title, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title ?? 'Kudang Koding | Forum'} />
            <Navbar />

            <main>{children}</main>
        </div>
    );
}

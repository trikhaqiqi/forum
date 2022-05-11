import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Sidebar from '@/Components/Sidebar';

export default function App({ title, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <Head title={title ?? 'Forum'} />
            <Navbar />
            {children}
        </div>
    );
}

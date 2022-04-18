import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';

export default function App({ title, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen">
            <Head title={title ?? 'Kudang Koding | Forum'} />
            <Navbar />
            <div className="container">
                <main className='pt-8'>{children}</main>
            </div>
        </div>
    );
}

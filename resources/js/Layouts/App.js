import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';

export default function App({ title, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title ?? 'Forum'} />
            <Navbar />
            {children}

            <footer className='border-t py-8 lg:py-16 mt-16 bg-white'>
                <div className="container">
                    <div className="text-center">
                        &copy; 2022 Kudang Koding
                    </div>
                </div>
            </footer>
        </div>
    );
}

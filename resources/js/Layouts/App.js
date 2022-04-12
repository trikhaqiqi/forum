import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function App({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main>{children}</main>
        </div>
    );
}

import React from 'react';
import App from '@/Layouts/App';
import { Head } from '@inertiajs/inertia-react';
import Hero from '@/Components/Hero';

export default function Dashboard(props) {
    return (
        <Hero>
            <div className="container">
                <h1 className='font-bold text-black tracking-tighter text-xl sm:text-3xl lg:text-6xl'>
                    Your Statistic
                </h1>
            </div>
        </Hero>
    );
}

Dashboard.layout = page => <App children={page} />;

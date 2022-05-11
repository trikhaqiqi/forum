import React from 'react';
import App from '@/Layouts/App';
import { Head, Link } from '@inertiajs/inertia-react';
import Hero from '@/Components/Hero';

export default function Home(props) {
    return (
        <div>
            <Hero>
                <div className="container">
                    <div className="w-full lg:w-2/3">
                        <h1 className='font-bold text-black tracking-tighter text-xl sm:text-3xl lg:text-6xl'>
                            Forum <span className='text-blue-600'>Developer</span>
                        </h1>
                        <p className="leading-normal md:leading-relaxed text-base sm:text-xl mt-2 lg:mt-4 mb-4 text-gray-600">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi maiores nostrum consequatur esse ullam obcaecati! Perspiciatis porro error inventore iste, dolores nam sapiente mollitia dolorum dicta expedita. Esse, laudantium nemo.
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-x-2">
                            <Link className='w-44 transition-shadow duration-200 text-center rounded-lg bg-white shadow hover:shadow-md hover:text-blue-600 py-2.5 font-semibold' href='/threads'>Browse</Link>
                            <Link className='w-44 transition-shadow duration-200 text-center rounded-lg bg-white shadow hover:shadow-md hover:text-blue-600 py-2.5 font-semibold' href='/threads'>Popular Threads</Link>
                        </div>
                    </div>
                </div>
            </Hero>
        </div>
    );
}

Home.layout = page => <App children={page} />;

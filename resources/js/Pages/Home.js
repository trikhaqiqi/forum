import React from 'react';
import App from '@/Layouts/App';
import { Head, Link } from '@inertiajs/inertia-react';
import Hero from '@/Components/Hero';

export default function Home({ threads }) {
    // console.log(threads);
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
                            <Link className='w-44 transition duration-200 text-center rounded-lg bg-blue-500 hover:bg-blue-700 text-white shadow hover:shadow-md py-2.5 font-semibold' href='/threads'>Browse</Link>
                            <Link className='w-44 transition duration-200 text-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow hover:shadow-md py-2.5 font-semibold' href='/threads'>Popular Threads</Link>
                        </div>
                    </div>
                </div>
            </Hero>
            <div className="container">
                <h1 className="text-black font-bold text-3xl mb-6">
                    Latest
                </h1>
                <div className="grid grid-cols-3 gap-10">
                    {threads.map((thread, index) => (
                        <div key={index} className=" bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 p-6">
                            <Link className="py-1 px-3 text-xs font-semibold bg-gray-800 text-gray-50 rounded-full" href={`/threads?category=${thread.category.slug}`}>
                                {thread.category.name}
                            </Link>
                            <h4 className="font-bold text-xl mt-2 mb-3">
                                <Link href={`/threads/${thread.slug}`}>{thread.title}</Link>
                            </h4>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className='w-5 h-5 rounded-full' src={thread.user.picture} alt={thread.user.name} />
                                    </div>
                                    <div>{thread.user.name}</div>
                                </div>
                                <div className='text-gray-500'>
                                    {thread.created_at}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Home.layout = page => <App children={page} />;

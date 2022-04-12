import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100">
            <Link method="post" href={route('logout')} as="button">
                Log Out
            </Link>
        </nav>
    );
}

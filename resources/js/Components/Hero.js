import React from "react";

export default function Hero({ children }) {
    return (
        <div className="bg-gray-50/50 shadow py-4 sm:py-10 lg:py-20">
            {children}
        </div>
    );
}

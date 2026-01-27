import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-6">
                <h1 className="text-8xl md:text-9xl font-cinzel text-[#d4af37] mb-8 text-shadow-glow">
                    404
                </h1>
                <h2 className="text-2xl md:text-4xl font-cinzel text-white mb-6 tracking-wider">
                    Page Not Found
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    The magical page you're looking for seems to have vanished into the digital realm. 
                    Let's get you back to the main adventure.
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-[#d4af37] text-black px-8 py-4 rounded-lg font-cinzel font-semibold tracking-wider uppercase hover:bg-[#b8941f] transition-colors duration-300 text-shadow-none"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
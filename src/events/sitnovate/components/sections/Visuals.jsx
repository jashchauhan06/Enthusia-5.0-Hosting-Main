import React from 'react';
import ShaderDemo_ATC from '../ui/atc-shader';

const Visuals = () => {
    return (
        <section id="visuals" className="h-screen w-full relative snap-start bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Shader Background */}
            <div className="absolute inset-0 z-0">
                <ShaderDemo_ATC />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-cinzel text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-widest mb-4">
                    MAGICAL REALM
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
                <p className="mt-4 font-serif text-[#d4af37] text-lg opacity-80 italic">
                    Experience the arcane flow of code and magic.
                </p>
            </div>

            {/* Vignette Overlay for better integration */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60 pointer-events-none"></div>
        </section>
    );
};

export default Visuals;

import React, { useState, useRef } from 'react';
import ImageSkeleton from '../ui/ImageSkeleton';



// --- Sponsors Content ---
const Sponsors = () => {
    const sponsors = [
        { name: "All That's Coffee", src: "/assets/images/sponsors/ATC.jpeg" },
        { name: "Insterra", src: "/assets/images/sponsors/Insterra.webp" },
        { name: "MIA", src: "/assets/images/sponsors/MIA.png" },
        { name: "PB Creators", src: "/assets/images/sponsors/PB.png" },
        { name: "Devfolio", src: "/assets/images/sponsors/dev.png" },
        { name: "ETHIndia", src: "/assets/images/sponsors/eth.png" },
        { name: "Pizza Hut", src: "/assets/images/sponsors/pizzahut.png" },
        { name: "Polygon", src: "/assets/images/sponsors/poly.png" },
        { name: "Unstoppable Domains", src: "/assets/images/sponsors/un.png" },
    ];
    // Note: Re-verify image mapping, using user provided filenames.

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="sponsors"
            className="min-h-screen md:h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-visible md:overflow-hidden snap-start pt-32 md:pt-6"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >


            {/* Wand Light Overlay */}
            <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12 md:mb-20 px-4">
                    <div className="flex items-center justify-center gap-4 md:gap-8">
                        <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37] opacity-50"></div>
                        <h2 className="text-2xl md:text-6xl font-cinzel text-[#d4af37] tracking-[0.2em] font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] uppercase">
                            Past Sponsors
                        </h2>
                        <div className="h-px w-8 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37] opacity-50"></div>
                    </div>
                </div>

                {/* Logos Grid */}
                <div className="w-full px-2 md:px-0">
                    {/* First Row - 5 sponsors */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 mb-4 md:mb-8">
                        {sponsors.slice(0, 5).map((sponsor, index) => (
                            <div
                                key={index}
                                className="glass-card aspect-[4/3] md:aspect-[3/2] rounded-xl flex items-center justify-center p-4 md:p-8 transition-all duration-500 hover:-translate-y-2 group cursor-pointer relative overflow-hidden animate-fade-in-up"
                            >
                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <ImageSkeleton
                                    src={sponsor.src}
                                    alt={sponsor.name}
                                    className="w-full h-full object-contain opacity-90 contrast-110 group-hover:opacity-100 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 relative z-10"
                                    skeletonClassName="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Second Row - 4 sponsors centered */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl">
                            {sponsors.slice(5).map((sponsor, index) => (
                                <div
                                    key={index + 5}
                                    className="glass-card aspect-[4/3] md:aspect-[3/2] rounded-xl flex items-center justify-center p-4 md:p-8 transition-all duration-500 hover:-translate-y-2 group cursor-pointer relative overflow-hidden animate-fade-in-up"
                                >
                                    {/* Inner Glow */}
                                    <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <ImageSkeleton
                                        src={sponsor.src}
                                        alt={sponsor.name}
                                        className="w-full h-full object-contain opacity-90 contrast-110 group-hover:opacity-100 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 relative z-10"
                                        skeletonClassName="rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sponsor CTA */}
                <div className="mt-12 md:mt-16 flex flex-col items-center animate-pulse-slow">
                    <p className="text-[#a0a0a0] font-cinzel text-[10px] md:text-base tracking-widest opacity-80 text-center uppercase px-4">Interested in Sponsoring SITNovate 2.0 (2026)?</p>
                    <p className="text-[#d4af37] font-cinzel text-sm md:text-lg tracking-wider mt-4">Contact us for sponsorship opportunities</p>
                </div>

            </div>


        </section>
    );
};

export default Sponsors;

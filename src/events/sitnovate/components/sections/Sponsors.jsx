import React, { useState, useRef } from 'react';
import ImageSkeleton from '../ui/ImageSkeleton';

// --- Sponsors Content ---
const Sponsors = () => {
    // Platform Sponsor
    const platformSponsors = [
        { name: "Unstop", src: "/assets/images/sponsors/unstop.webp" },
    ];

    // In-Kind Sponsors
    const inKindSponsors = [
        { name: "Fueler", src: "/assets/images/sponsors/fueler_logo.webp" },
        { name: "CodeCrafter", src: "/assets/images/sponsors/codecrafter.svg" },
        { name: "Interview Buddy", src: "/assets/images/sponsors/interview_buddy.webp" },
        { name: "FLATLOGIC", src: "/assets/images/sponsors/FLATLOGIC.webp" },
        { name: "Navan", src: "/assets/images/sponsors/navan.webp" },
    ];

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

    const SponsorCard = ({ sponsor, className = "" }) => (
        <div className={`glass-card aspect-[4/3] md:aspect-[3/2] rounded-xl flex items-center justify-center p-4 md:p-8 transition-all duration-500 hover:-translate-y-2 group cursor-pointer relative overflow-hidden animate-fade-in-up ${className}`}>
            <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ImageSkeleton
                src={sponsor.src}
                alt={sponsor.name}
                className="w-full h-full object-contain opacity-90 contrast-110 group-hover:opacity-100 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 relative z-10"
                skeletonClassName="rounded-lg"
            />
        </div>
    );

    const SectionHeader = ({ title }) => (
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6 md:mb-10">
            <div className="h-px w-6 md:w-16 bg-gradient-to-r from-transparent to-[#d4af37] opacity-50"></div>
            <h3 className="text-lg md:text-2xl font-cinzel text-[#d4af37] tracking-[0.15em] font-semibold drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] uppercase">
                {title}
            </h3>
            <div className="h-px w-6 md:w-16 bg-gradient-to-l from-transparent to-[#d4af37] opacity-50"></div>
        </div>
    );

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

                {/* Main Header */}
                <div className="text-center mb-8 md:mb-12 px-4">
                    <div className="flex items-center justify-center gap-4 md:gap-8">
                        <div className="h-px w-8 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37] opacity-50"></div>
                        <h2 className="text-2xl md:text-6xl font-cinzel text-[#d4af37] tracking-[0.2em] font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] uppercase">
                            Our Sponsors
                        </h2>
                        <div className="h-px w-8 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37] opacity-50"></div>
                    </div>
                </div>

                {/* Platform Sponsor Section */}
                <div className="w-full mb-10 md:mb-16">
                    <SectionHeader title="Platform Partner" />
                    <div className="flex justify-center">
                        {platformSponsors.map((sponsor, index) => (
                            <SponsorCard key={index} sponsor={sponsor} className="w-48 md:w-64" />
                        ))}
                    </div>
                </div>

                {/* In-Kind Sponsors Section */}
                <div className="w-full">
                    <SectionHeader title="In-Kind Sponsors" />
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {inKindSponsors.map((sponsor, index) => (
                            <SponsorCard key={index} sponsor={sponsor} className="w-[45%] sm:w-[30%] md:w-[18%]" />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Sponsors;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSkeleton from '../ui/ImageSkeleton';



// --- Ornate Frame SVG Component ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradientHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.1" />
            </linearGradient>
        </defs>

        {/* Frame Border */}
        <path
            d="M 60,60 L 1540,60 L 1540,840 L 60,840 Z"
            fill="none"
            stroke="url(#goldGradientHighlight)"
            strokeWidth="1"
            opacity="0.3"
        />

        {/* Corner Accents */}
        <path d="M 60,160 L 60,60 L 160,60" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 1540,160 L 1540,60 L 1440,60" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 60,740 L 60,840 L 160,840" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 1540,740 L 1540,840 L 1440,840" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
);

const HighlightImage = ({ src, alt }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <ImageSkeleton
                src={src}
                alt={alt}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                skeletonClassName="rounded-lg"
            />
        </div>
    );
};

const EventHighlights = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    const images = [
        { 
            src: "/assets/images/sitnovate/1.JPG", 
            label: "Opening Ceremony", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/2.JPG", 
            label: "Distinguished Guests & Jury", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/3.jpg", 
            label: "Coding Marathon", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/4.jpg", 
            label: "Evaluators", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/5.png", 
            label: "Final Presentations", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/6.png", 
            label: "Award Ceremony", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"/><path d="M12 3V15" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="20" r="2" stroke="currentColor" strokeWidth="2"/></svg>
        },
        { 
            src: "/assets/images/sitnovate/7.jpg", 
            label: "Winners", 
            icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>
        }
    ];

    // Double the images for seamless loop
    const extendedImages = [...images, ...images];

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="event-highlights"
            className="min-h-screen md:h-screen w-full relative flex flex-col items-center justify-center p-6 snap-start overflow-visible md:overflow-hidden bg-[#05050a] pt-32 md:pt-0"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container:hover .marquee-content {
                    animation-play-state: paused;
                }
                .marquee-content {
                    animation: scroll 40s linear infinite;
                }
            `}</style>

            {/* Wand Light Overlay */}
            <div className="wand-light-subtle" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Frame */}
            <OrnateFrame />

            {/* Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-[#d4af37] rounded-full opacity-0"
                        style={{
                            width: Math.random() * 3 + 'px',
                            height: Math.random() * 3 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `twinkle ${4 + Math.random() * 5}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-[100vw] flex flex-col h-full py-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center flex-shrink-0 px-4"
                >
                    <h2 className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-cinzel text-[#e0e0e0] font-medium tracking-[0.1em] drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] animate-fade-in-up">
                        EVENT HIGHLIGHTS
                    </h2>
                    <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 opacity-60"></div>
                </motion.div>

                {/* Marquee Scroll Layout */}
                <div className="flex-grow flex items-center w-full overflow-hidden marquee-container relative py-8">
                    {/* Left Fade Gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05050a] to-transparent z-20 pointer-events-none"></div>

                    <div className="flex gap-8 marquee-content min-w-max px-4">
                        {extendedImages.map((img, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 group rounded-xl overflow-hidden cursor-pointer aspect-video border border-[#d4af37]/20 bg-[#0f0f1a] w-[80vw] md:w-[600px]"
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    borderColor: 'rgba(212, 175, 55, 0.8)',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.2)',
                                    zIndex: 30
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Blurred Background for Fill */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={img.src}
                                        alt="background"
                                        className="w-full h-full object-cover blur-2xl opacity-40 scale-125"
                                    />
                                </div>

                                {/* Main Image with Contain */}
                                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                                    <HighlightImage src={img.src} alt={img.label} />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="flex items-center gap-4 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <div className="text-[#d4af37] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] scale-110">{img.icon}</div>
                                            <div className="h-[2px] flex-grow bg-gradient-to-r from-[#d4af37] to-transparent opacity-70"></div>
                                        </div>
                                        <h3 className="font-cinzel text-2xl md:text-3xl text-[#f0f0f0] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-[#d4af37] transition-colors duration-300">
                                            {img.label}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Fade Gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05050a] to-transparent z-20 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default EventHighlights;

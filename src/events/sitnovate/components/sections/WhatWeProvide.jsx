import { useState, useRef } from 'react';
import React from 'react';

// Custom SVG Icons matching the theme
const Icons = {
    // Infrastructural Excellence
    powerBackup: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    internet: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
    ),
    labs: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M9 3h6v5l4 9a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-9V3z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 3h6" strokeLinecap="round"/>
            <circle cx="10" cy="15" r="1" fill="currentColor"/>
            <circle cx="14" cy="13" r="1" fill="currentColor"/>
        </svg>
    ),
    zones: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9h1M14 9h1M9 13h1M14 13h1" strokeLinecap="round"/>
        </svg>
    ),
    // Incentivized Valorization
    cashPrize: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M14.5 9a2.5 2.5 0 0 0-5 0c0 2 5 2 5 4.5a2.5 2.5 0 0 1-5 0M12 6v2M12 16v2" strokeLinecap="round"/>
        </svg>
    ),
    certificate: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect x="3" y="3" width="18" height="14" rx="1"/>
            <path d="M7 7h10M7 10h6" strokeLinecap="round"/>
            <circle cx="16" cy="17" r="4"/>
            <path d="M14 20l2 2 2-2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    mentors: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="7" r="4"/>
            <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" strokeLinecap="round"/>
            <path d="M12 3l1.5 2h-3L12 3z" fill="currentColor"/>
        </svg>
    ),
    award: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="9" r="6"/>
            <path d="M8.5 15l-1.5 6 5-2 5 2-1.5-6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6v2M10 9h4" strokeLinecap="round"/>
        </svg>
    ),
    swag: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" strokeLinecap="round"/>
            <path d="M12 3l8 6H4l8-6z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9v12M4 9h16" strokeLinecap="round"/>
        </svg>
    ),
    // Professional Growth
    exposure: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h4M18 12h4M12 2v4M12 18v4" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    ),
    mentorship: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
    ),
    leadership: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    projects: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeLinecap="round"/>
            <path d="M9 14h6M9 17h4" strokeLinecap="round"/>
        </svg>
    ),
    networking: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="7" cy="12" r="3"/>
            <circle cx="17" cy="12" r="3"/>
            <path d="M10 12h4" strokeLinecap="round"/>
            <path d="M7 9V6M7 15v3M17 9V6M17 15v3" strokeLinecap="round"/>
        </svg>
    ),
};


// --- Ornate Frame SVG Component ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow2">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path d="M 50,50 L 1550,50 L 1550,850 L 50,850 Z" fill="none" stroke="url(#goldGradient2)" strokeWidth="2" filter="url(#glow2)" opacity="0.6"/>
        <path d="M 50,150 L 50,50 L 150,50" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 1550,150 L 1550,50 L 1450,50" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 50,750 L 50,850 L 150,850" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 1550,750 L 1550,850 L 1450,850" stroke="#d4af37" strokeWidth="4" fill="none" />
        <circle cx="50" cy="50" r="6" fill="#FFD700" />
        <circle cx="1550" cy="50" r="6" fill="#FFD700" />
        <circle cx="50" cy="850" r="6" fill="#FFD700" />
        <circle cx="1550" cy="850" r="6" fill="#FFD700" />
    </svg>
);

const FeatureColumn = ({ title, subtitle, items, delay }) => (
    <div className="w-full md:flex-1 md:min-w-[300px] bg-black/40 backdrop-blur-md border border-[#d4af37]/20 p-5 md:p-6 rounded-lg hover:border-[#d4af37]/50 transition-colors duration-300 group relative h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="mb-4 md:mb-6 border-b border-[#d4af37]/30 pb-3 md:pb-4">
            <h4 className="text-[#d4af37] font-cinzel text-xs tracking-[0.2em] mb-1 opacity-80">{subtitle.toUpperCase()}</h4>
            <h3 className="text-lg md:text-2xl font-cinzel text-[#ffecb3] tracking-wide group-hover:text-white transition-colors">{title}</h3>
        </div>
        <ul className="space-y-3 md:space-y-4">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm md:text-[15px] font-body text-[#c0c0c8] leading-relaxed group-hover:text-[#e0e0e0] transition-colors">
                    <span className="text-[#d4af37] shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                </li>
            ))}
        </ul>
    </div>
);


const WhatWeProvide = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    // Auto-scroll functionality
    React.useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let currentIndex = 1; // Start from middle card (Exclusive Treasures)
        
        // Wait for container to be properly sized
        const initializeScroll = () => {
            const containerWidth = scrollContainer.offsetWidth;
            const cardWidth = containerWidth * 0.85 + 24; // 85vw + gap
            
            // Initially scroll to middle card
            scrollContainer.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'instant' // Use instant for initial positioning
            });
            
            const autoScroll = () => {
                currentIndex = (currentIndex + 1) % 3;
                const targetScroll = currentIndex * cardWidth;
                
                scrollContainer.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            };

            const interval = setInterval(autoScroll, 2500);

            // Pause on hover/touch
            const pauseScroll = () => clearInterval(interval);
            const resumeScroll = () => {
                clearInterval(interval);
                setTimeout(() => {
                    const newInterval = setInterval(autoScroll, 2500);
                    return newInterval;
                }, 2000);
            };

            scrollContainer.addEventListener('mouseenter', pauseScroll);
            scrollContainer.addEventListener('mouseleave', resumeScroll);
            scrollContainer.addEventListener('touchstart', pauseScroll);
            scrollContainer.addEventListener('touchend', resumeScroll);

            return () => {
                clearInterval(interval);
                if (scrollContainer) {
                    scrollContainer.removeEventListener('mouseenter', pauseScroll);
                    scrollContainer.removeEventListener('mouseleave', resumeScroll);
                    scrollContainer.removeEventListener('touchstart', pauseScroll);
                    scrollContainer.removeEventListener('touchend', resumeScroll);
                }
            };
        };

        // Wait a bit for the container to be properly rendered
        const timeoutId = setTimeout(initializeScroll, 100);
        
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const columns = [
        {
            subtitle: "Infrastructural Excellence",
            title: "Advanced Facilities",
            items: [
                { icon: Icons.powerBackup, text: "Power Backup" },
                { icon: Icons.internet, text: "High-Speed Internet" },
                { icon: Icons.labs, text: "Smart Labs" },
                { icon: Icons.zones, text: "Hackathon Zones" }
            ]
        },
        {
            subtitle: "Incentivized Valorization",
            title: "Exclusive Treasures",
            items: [
                { icon: Icons.cashPrize, text: "Cash Prizes" },
                { icon: Icons.certificate, text: "Certificates" },
                { icon: Icons.mentors, text: "Industry Mentors" },
                { icon: Icons.swag, text: "Swag" }
            ]
        }
    ];

    return (
        <section
            id="what-we-provide"
            className="w-full bg-[#050505] relative flex flex-col items-center justify-center px-4 py-20 md:min-h-screen md:h-screen md:overflow-hidden md:snap-start md:py-0 selection:bg-[#3d2b1f] selection:text-[#d4af37]"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            <div className="wand-light-medium" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>
            <OrnateFrame />
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col justify-center px-2 md:px-12 md:h-full md:py-16">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-5xl font-cinzel text-[#d4af37] font-bold tracking-[0.15em] md:tracking-[0.2em] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] animate-fade-in-up">
                        WHAT WE PROVIDE
                    </h2>
                    <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3 md:mt-4 opacity-50"></div>
                </div>
                
                {/* Mobile: Horizontal Scroll, Desktop: Flex Row */}
                <div className="md:flex md:flex-row md:gap-6 md:items-stretch md:justify-center md:w-full">
                    {/* Mobile Horizontal Scroll Container */}
                    <div ref={scrollRef} className="flex md:hidden overflow-x-auto gap-6 pb-4 px-2 scrollbar-hide scroll-smooth">
                        {columns.map((col, idx) => (
                            <div key={idx} className="flex-shrink-0 w-[85vw]">
                                <FeatureColumn title={col.title} subtitle={col.subtitle} items={col.items} delay={0} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden md:flex md:flex-row md:gap-6 md:items-stretch md:justify-center md:w-full">
                        {columns.map((col, idx) => (
                            <FeatureColumn key={idx} title={col.title} subtitle={col.subtitle} items={col.items} delay={idx * 0.2} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeProvide;

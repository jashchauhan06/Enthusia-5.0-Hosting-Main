import React, { useState, useRef } from 'react';



// --- Ornate Frame SVG Component ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.8" />
            </linearGradient>

            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Outer ornate border */}
        <path
            d="M 50,50 L 200,50 L 220,30 L 780,30 L 800,50 L 950,50 L 970,70 L 970,730 L 950,750 L 800,750 L 780,770 L 220,770 L 200,750 L 50,750 L 30,730 L 30,70 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            filter="url(#glow)"
        />



        {/* Corner ornaments - Top Left */}
        <circle cx="50" cy="50" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 50,30 L 50,70 M 30,50 L 70,50" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Top Right */}
        <circle cx="950" cy="50" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 950,30 L 950,70 M 930,50 L 970,50" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Bottom Left */}
        <circle cx="50" cy="750" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 50,730 L 50,770 M 30,750 L 70,750" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Bottom Right */}
        <circle cx="950" cy="750" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 950,730 L 950,770 M 930,750 L 970,750" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Top center ornament */}
        <path d="M 480,30 Q 500,10 520,30" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="500" cy="25" r="5" fill="#FFD700" className="animate-pulse" />

        {/* Bottom center ornament */}
        <path d="M 480,770 Q 500,790 520,770" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="500" cy="775" r="5" fill="#FFD700" className="animate-pulse" />

        {/* Decorative flourishes on sides */}
        <path d="M 30,200 Q 20,250 30,300" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 30,500 Q 20,550 30,600" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 970,200 Q 980,250 970,300" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 970,500 Q 980,550 970,600" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
    </svg>
);

// --- Divider Ornament ---
const DividerOrnament = ({ className }) => (
    <svg viewBox="0 0 300 20" fill="currentColor" className={className}>
        <path d="M 150,10 L 280,12 L 295,10 L 280,8 L 150,10 M 150,10 L 20,12 L 5,10 L 20,8 L 150,10" />
        <circle cx="150" cy="10" r="5" className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
        <circle cx="80" cy="10" r="2" className="text-[#FFD700] opacity-60" />
        <circle cx="220" cy="10" r="2" className="text-[#FFD700] opacity-60" />
    </svg>
);

// --- Main About Component ---
export default function About() {
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
            id="about"
            className="min-h-screen md:h-screen w-full bg-gradient-to-br from-[#0a0a0f] via-[#050505] to-[#0f0a05] text-[#d4cfc3] selection:bg-[#3d2b1f] selection:text-[#d4af37] flex items-center justify-center overflow-hidden snap-start relative pt-32 pb-20 md:py-0"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >


            {/* Wand Light Overlay */}
            <div className="wand-light-large" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Content Container (Improved Mobile Dimensions) */}
            <div className="relative z-10 w-[92vw] md:w-full max-w-5xl h-[80vh] overflow-y-auto p-6 md:p-16 my-12 md:my-0 rounded-xl md:rounded-none bg-black/60 md:bg-transparent shadow-2xl md:shadow-none scrollbar-custom">
                <div className="w-full float-animation">

                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-6xl font-serif tracking-[0.15em] md:tracking-[0.2em] text-center font-bold text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-fade-in-up uppercase leading-tight whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            ABOUT SIT<span className="normal-case">novate</span> 2.0
                        </h2>
                        <DividerOrnament className="w-64 md:w-80 h-6 text-[#d4af37]" />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6 md:space-y-8 text-[#c0c0c8] text-sm md:text-lg leading-relaxed font-sans text-center px-2 md:px-12">
                        <p className="text-center md:text-justify break-words">
                            <strong className="text-[#d4af37] font-cinzel tracking-wide font-normal uppercase text-[10px] md:text-sm mr-2 border-b border-[#d4af37]/50 pb-1">SITNovate</strong>
                            <span>is the flagship 24-hour hackathon organized by </span>
                            <span className="text-[#e5e5e5] italic hover:text-[#ffecb3] transition-colors cursor-pointer border-b border-dashed border-[#666] hover:border-[#d4af37]">Symbiosis Institute of Technology, Nagpur</span>. This premier innovation event brings together the brightest minds in technology to collaborate, compete, and create groundbreaking solutions that address real-world challenges.
                        </p>

                        <div className="space-y-6 text-left md:text-justify">
                            {/* Round 1 */}
                            <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4 md:p-6 break-words">
                                <h3 className="text-[#d4af37] font-cinzel text-base md:text-xl mb-3 tracking-wide break-words">Round 1: Online Screening</h3>
                                <p className="text-sm md:text-base mb-2 break-words"><span className="text-[#ffecb3]">Platform:</span> Unstop (Online)</p>
                                <p className="text-sm md:text-base mb-2 break-words"><span className="text-[#ffecb3]">Submissions:</span> Solution PPT + 5-min video covering problem understanding, proposed solution, system architecture, and innovation</p>
                                <p className="text-sm md:text-base break-words"><span className="text-[#ffecb3]">Outcome:</span> Top 60 teams advance to the final on-campus round</p>
                            </div>

                            {/* Final Round */}
                            <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4 md:p-6 break-words">
                                <h3 className="text-[#d4af37] font-cinzel text-base md:text-xl mb-3 tracking-wide break-words">Final Round: 24-Hour On-Campus Hackathon</h3>
                                <p className="text-sm md:text-base mb-2 break-words"><span className="text-[#ffecb3]">Venue:</span> SIT Nagpur | <span className="text-[#ffecb3]">Duration:</span> 24 hours | <span className="text-[#ffecb3]">Fee:</span> ₹590/team</p>
                                <p className="text-sm md:text-base mb-2 break-words"><span className="text-[#ffecb3]">Presentation:</span> 10-min demo + 5-min Q&A</p>
                                <p className="text-sm md:text-base mb-2 break-words"><span className="text-[#ffecb3]">Prizes:</span> ₹70,000+ (1st: ₹40,000 | 2nd: ₹20,000 | 3rd: ₹10,000)</p>
                                <p className="text-sm md:text-base break-words"><span className="text-[#ffecb3]">Teams:</span> Exactly 3 members (UG students, inter-college allowed)</p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-8 md:mt-16 pt-8 md:pt-12 border-t border-[#d4af37]/20 flex flex-wrap justify-center gap-x-12 md:gap-x-24 gap-y-8 md:gap-y-12 font-cinzel tracking-widest text-[10px] md:text-xs uppercase">

                            <div className="flex flex-col items-center gap-2 md:gap-3 stat-glow cursor-default group">
                                <span className="text-3xl md:text-5xl text-[#d4af37] group-hover:scale-110 transition-transform duration-300 font-bold">700+</span>
                                <span className="opacity-70 group-hover:opacity-100 text-[#c0c0c8] tracking-[0.15em] md:tracking-[0.3em]">PAST NO. PARTICIPANTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

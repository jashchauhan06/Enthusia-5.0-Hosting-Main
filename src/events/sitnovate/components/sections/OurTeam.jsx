import React, { useState, useRef } from 'react';
import TeamCarousel from '../ui/TeamCarousel';

const teamMembers = [
    {
        text: "Sunidhi Haware\nPresident (SRC)",
        image: "/assets/images/Team/Sunidhi.webp",
        linkedin: "https://www.linkedin.com/in/sunidhi-haware-797a97323/"
    },
    {
        text: "Prathmesh Raipurkar\nVice President (SRC)",
        image: "/assets/images/Team/Prathmesh.webp",
        linkedin: "https://www.linkedin.com/in/prathmesh-raipurkar-2073a0294/"
    },
    {
        text: "Jash Chauhan\nWeb Development Team Lead",
        image: "/assets/images/Team/Jash.jpg",
        linkedin: "https://www.linkedin.com/in/jashchauhan06/"
    },
    {
        text: "Parth Choudhari\nEvent Coordinator",
        image: "/assets/images/Team/ParthChoudhari.webp",
        linkedin: "https://www.linkedin.com/in/parth-choudhari-2073a0294/"
    },
    {
        text: "Parthiv Abhani\nEvent Coordinator",
        image: "/assets/images/Team/Parthiv Abhani.webp",
        linkedin: "https://www.linkedin.com/in/parthiv-abhani-b47055231/"
    },
    {
        text: "Aarya Bhende\nEvent Coordinator",
        image: "/assets/images/Team/Aarya Bhende.webp",
        linkedin: "https://www.linkedin.com/in/aarya-bhende-2a29a4284/"
    },
    {
        text: "Sukhada Bhoyar\nEvent Coordinator",
        image: "/assets/images/Team/Sukhada Bhoyar.webp",
        linkedin: "https://www.linkedin.com/in/sukhada-bhoyar-9b3a00284/"
    },
    {
        text: "Aarya Jawanjal\nEvent Coordinator",
        image: "/assets/images/Team/Aarya Jawanjal.webp",
        linkedin: "https://www.linkedin.com/in/aarya-jawanjal/"
    },
    {
        text: "Harsh Kumar\nSponsorship",
        image: "/assets/images/Team/harsh.webp",
        linkedin: "https://www.linkedin.com/in/harsh-2227-kumar/"
    },
];

const OurTeam = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleTeamMemberClick = (linkedin) => {
        if (linkedin) {
            window.open(linkedin, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section
            id="our-team"
            className="min-h-screen md:h-screen w-full relative overflow-visible md:overflow-hidden bg-[#050505] flex flex-col items-center justify-center snap-start selection:bg-[#3d2b1f] selection:text-[#d4af37] pt-20 md:pt-0"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >


            {/* Wand Light Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>
            </div>

            <div className="max-w-7xl w-full relative z-10 flex flex-col items-center justify-center h-full">

                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-4 mb-4">
                    <h2 className="text-3xl md:text-5xl font-cinzel text-[#d4af37] tracking-[0.2em] uppercase border-b border-[#d4af37]/30 pb-4 text-shadow-glow">
                        Our Team
                    </h2>
                </div>

                {/* Team Carousel */}
                <div className="w-full h-[500px] md:h-[600px] relative">
                    <TeamCarousel
                        items={teamMembers}
                        onItemClick={handleTeamMemberClick}
                    />
                </div>
            </div>
        </section>
    );
};

export default OurTeam;

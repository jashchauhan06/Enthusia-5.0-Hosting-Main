import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageSkeleton from '../ui/ImageSkeleton';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        // Set target date to 3 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Registration Open!');
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        
        return () => clearInterval(interval);
    }, []);
    return (
        <section id="hero" className="w-full h-screen relative flex items-center justify-center snap-start">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Slight overlay for contrast */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/assets/video/1v.webm" type="video/webm" />
                </video>
            </div>

            {/* Hero Content - Logo */}
            <div className="z-20 w-full max-w-4xl px-6 flex flex-col items-center -mt-32 md:-mt-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full flex justify-center relative"
                >
                    <ImageSkeleton
                        src="/assets/images/logo/logo-gold.png"
                        alt="SITNovate Logo"
                        className="w-full max-w-xs md:max-w-xl object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] pointer-events-none select-none"
                        skeletonClassName="rounded-lg"
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                    />
                    {/* Transparent canvas overlay to prevent dragging */}
                    <div className="absolute inset-0 z-10 cursor-default" onDragStart={(e) => e.preventDefault()} />
                </motion.div>

                {/* Timer and Locked Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="mt-0 md:mt-2 relative z-50 flex flex-col items-center"
                >
                    {/* Register Now Button */}
                    <a
                        href="https://unstop.com/o/wKj1oqk?lb=i9smS0vw&utm_medium=Share&utm_source=harshkum8980&utm_campaign=Online_coding_challenge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 md:px-10 py-3 md:py-4 overflow-hidden bg-[#d4af37] hover:bg-[#c49d2f] border-2 border-[#d4af37] text-black font-cinzel tracking-[0.2em] font-bold uppercase text-sm md:text-base inline-block transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105"
                    >
                        <span>Register Now</span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-20 flex flex-col items-center text-hp-gold cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="font-cinzel tracking-[0.2em] text-xs md:text-sm mb-2 uppercase opacity-80 writing-vertical-lr hidden">Scroll</span>
                <span className="font-cinzel tracking-[0.2em] text-xs md:text-sm mb-2 uppercase opacity-80">Scroll for More</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
                    </svg>
                </motion.div>
            </motion.div>

        </section>
    );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ currentSection, onNavigate, audioTriggerRef }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = React.useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleAudio = () => {
        const nextState = !isMuted;
        setIsMuted(nextState);
        if (audioRef.current) {
            if (!nextState) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            
            // Force play immediately
            const playAudio = () => {
                if (audioRef.current && !isMuted) {
                    audioRef.current.play().catch(e => {
                        console.log("Audio autoplay failed:", e);
                        // Retry on any user interaction
                        const retryPlay = () => {
                            if (audioRef.current && !isMuted) {
                                audioRef.current.play().catch(err => console.log("Retry failed:", err));
                            }
                            document.removeEventListener('click', retryPlay);
                            document.removeEventListener('keydown', retryPlay);
                            document.removeEventListener('touchstart', retryPlay);
                        };
                        document.addEventListener('click', retryPlay, { once: true });
                        document.addEventListener('keydown', retryPlay, { once: true });
                        document.addEventListener('touchstart', retryPlay, { once: true });
                    });
                }
            };
            
            // Try multiple times
            playAudio();
            setTimeout(playAudio, 100);
            setTimeout(playAudio, 500);
            setTimeout(playAudio, 1000);
        }
        
        // Set up the trigger function
        if (audioTriggerRef) {
            audioTriggerRef.current = () => {
                if (audioRef.current && !isMuted) {
                    audioRef.current.play().catch(e => console.log("Audio trigger failed:", e));
                }
            };
        }
    }, [audioTriggerRef, isMuted]);

    // Navigation Handler (uses index)
    const handleNavClick = (index) => {
        setIsMenuOpen(false);
        // Small delay to allow menu to start closing before slide moves (optional)
        setTimeout(() => {
            onNavigate(index);
        }, 300);
    };

    const menuItems = [
        { index: 0, label: 'Home' },
        { index: 1, label: 'About' },
        { index: 2, label: 'What We Provide' },
        { index: 3, label: 'Highlights' },
        { index: 4, label: 'Sponsors' },
        { index: 5, label: 'Team' },
        { index: 6, label: 'Contact' }
    ];

    return (
        <>
            {/* Top Header Bar */}
            <header className="fixed top-0 left-0 w-full z-[100] flex justify-end items-center px-3 py-2 md:px-4 md:py-3 pointer-events-none gap-2">
                <button
                    onClick={toggleAudio}
                    className="pointer-events-auto group relative flex items-center justify-center w-8 h-8 border border-hp-gold/40 rounded bg-black/30 backdrop-blur-sm hover:bg-hp-gold/10 hover:border-hp-gold/70 transition-all duration-300 z-50"
                    aria-label="Toggle Audio"
                >
                    <div className="flex items-center justify-center gap-[2px]">
                        <div className={`w-0.5 h-2 bg-hp-gold rounded-full ${!isMuted ? 'animate-[bounce_1s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-3 bg-hp-gold rounded-full ${!isMuted ? 'animate-[bounce_0.8s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-2 bg-hp-gold rounded-full ${!isMuted ? 'animate-[bounce_1.2s_infinite]' : ''}`}></div>
                    </div>
                    {isMuted && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[1.5px] h-full bg-red-500/60 rotate-45"></div>
                        </div>
                    )}
                </button>

                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto text-hp-gold uppercase font-cinzel font-bold tracking-[0.15em] text-xs hover:text-white hover:bg-hp-gold/10 transition-all duration-300 z-[100] bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded border border-hp-gold/40 hover:border-hp-gold/70"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? 'CLOSE' : 'MENU'}
                </button>

                <audio ref={audioRef} loop autoPlay muted={false} src="/assets/audio/ambience.webm" />
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-hp-dark/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <nav className="flex flex-col space-y-6 text-center">
                            {menuItems.map((item, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    onClick={() => handleNavClick(item.index)}
                                    className={`text-2xl md:text-4xl font-cinzel transition-colors tracking-wider ${currentSection === item.index ? 'text-hp-gold' : 'text-gray-300 hover:text-hp-gold'}`}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 text-sm text-gray-500 font-cinzel"
                        >
                            <p>© 2026 SITNovate. All rights reserved.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

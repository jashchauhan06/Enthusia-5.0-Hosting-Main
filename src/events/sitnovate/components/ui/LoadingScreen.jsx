import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // List all images that need to be preloaded
    const imagesToPreload = [
        '/assets/images/logo/logo-gold.png',
        '/assets/images/sitnovate/1.JPG',
        '/assets/images/sitnovate/2.JPG',
        '/assets/images/sitnovate/3.jpg',
        '/assets/images/sitnovate/4.jpg',
        '/assets/images/sitnovate/5.png',
        '/assets/images/sitnovate/6.png',
        '/assets/images/sitnovate/7.jpg',
        '/assets/images/Team/SunidhiHaware.jpg',
        '/assets/images/Team/HarshKumar.jpg',
        '/assets/images/Team/ParthChoudhari.jpeg',
        '/assets/images/Team/PrathmeshRaipurkar.jpeg',
        '/assets/images/Team/Jash.jpg',
        '/assets/images/sponsors/ATC.jpeg',
        '/assets/images/sponsors/Insterra.webp',
        '/assets/images/sponsors/MIA.png'
    ];

    useEffect(() => {
        const preloadImages = async () => {
            let loadedCount = 0;
            
            const imagePromises = imagesToPreload.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = img.onerror = () => {
                        loadedCount++;
                        const newProgress = Math.round((loadedCount / imagesToPreload.length) * 100);
                        setProgress(newProgress);
                        resolve();
                    };
                    img.src = src;
                });
            });

            await Promise.all(imagePromises);
            
            // Show 100% briefly
            setTimeout(() => {
                setIsComplete(true);
                setTimeout(() => {
                    onLoadComplete();
                }, 600);
            }, 300);
        };

        preloadImages();
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center"
            >
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
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

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-12"
                    >
                        <img
                            src="/assets/images/logo/logo-gold.png"
                            alt="SITNovate Logo"
                            className="w-64 md:w-80 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        />
                    </motion.div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <p className="text-[#d4af37] font-cinzel text-lg md:text-xl tracking-[0.3em] font-light">
                            LOADING EXPERIENCE
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="w-[300px] h-[2px] bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>
                        
                        {/* Progress Text */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <span className="text-white/60 font-mono text-sm tracking-wider">
                                {progress}%
                            </span>
                        </div>
                    </motion.div>

                    {/* Completion Message */}
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-20 text-center"
                            >
                                <p className="text-[#d4af37] font-cinzel tracking-[0.2em] text-lg">
                                    READY TO INNOVATE
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subtle particles */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-40"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;
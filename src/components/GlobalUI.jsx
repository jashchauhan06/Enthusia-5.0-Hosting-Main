import React, { useEffect, useRef } from 'react';

// Suppress AudioContext autoplay warnings
const originalWarn = console.warn;
console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    if (message.includes('AudioContext') || message.includes('autoplay')) {
        return; // Suppress AudioContext warnings
    }
    originalWarn.apply(console, args);
};

const GlobalUI = ({ audioInstance }) => {
    const leftCanvasRef = useRef(null);
    const rightCanvasRef = useRef(null);
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        // Use provided audio or create new
        const audio = audioInstance || new Audio('/bg.opus');
        if (!audioInstance) {
            audio.loop = true;
            audio.volume = 0.5;
            audio.crossOrigin = 'anonymous';
        }
        audioRef.current = audio;

        const initAudio = () => {
            // Only init context if not already done
            if (audioContextRef.current) {
                if (audioContextRef.current.state === 'suspended') {
                    audioContextRef.current.resume().catch(() => {});
                }
                return true;
            }

            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                // Create AudioContext - this MUST be called from a user gesture
                audioContextRef.current = new AudioContext();
                
                // Resume immediately if suspended (some browsers suspend on creation)
                if (audioContextRef.current.state === 'suspended') {
                    audioContextRef.current.resume().catch(() => {});
                }
                
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;

                // Create source from the EXISTING audio element
                try {
                    const source = audioContextRef.current.createMediaElementSource(audio);
                    source.connect(analyserRef.current);
                    analyserRef.current.connect(audioContextRef.current.destination);
                } catch (err) {
                    // Audio element already connected to another context - ignore
                }
                return true;
            } catch (e) {
                // Silently fail - AudioContext creation blocked
                return false;
            }
        };

        const renderVisualizer = () => {
            animationFrameRef.current = requestAnimationFrame(renderVisualizer);
            
            // Only render if analyser is ready
            if (!analyserRef.current) {
                // Draw flat line when no audio context
                [leftCanvasRef.current, rightCanvasRef.current].forEach(cvs => {
                    if (!cvs) return;
                    const ctx = cvs.getContext('2d');
                    if (cvs.width !== cvs.offsetWidth || cvs.height !== cvs.offsetHeight) {
                        cvs.width = cvs.offsetWidth;
                        cvs.height = cvs.offsetHeight;
                    }
                    ctx.clearRect(0, 0, cvs.width, cvs.height);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#ffffff';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#ffffff';
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(0, cvs.height / 2);
                    ctx.lineTo(cvs.width, cvs.height / 2);
                    ctx.stroke();
                });
                return;
            }

            const bufferLength = analyserRef.current.fftSize;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteTimeDomainData(dataArray);

            [leftCanvasRef.current, rightCanvasRef.current].forEach(cvs => {
                if (!cvs) return;
                const ctx = cvs.getContext('2d');
                if (cvs.width !== cvs.offsetWidth || cvs.height !== cvs.offsetHeight) {
                    cvs.width = cvs.offsetWidth;
                    cvs.height = cvs.offsetHeight;
                }

                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#ffffff';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ffffff';
                ctx.globalAlpha = 0.8;
                ctx.beginPath();

                const sliceWidth = cvs.width / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = (v * cvs.height) / 2;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                    x += sliceWidth;
                }
                ctx.lineTo(cvs.width, cvs.height / 2);
                ctx.stroke();
            });
        };

        // Start visualizer loop
        renderVisualizer();

        const unlock = () => {
            // Prevent multiple unlock attempts
            if (isInitializedRef.current) return;
            
            // Initialize audio context ONLY on user gesture - returns true if successful
            const initialized = initAudio();
            if (!initialized) return; // Failed to init, try again on next gesture

            // Try to play
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isInitializedRef.current = true;
                    // Remove all listeners once successfully playing
                    events.forEach(e => window.removeEventListener(e, genericUnlock));
                }).catch(() => {
                    // Silently wait for next user interaction
                });
            }
        };

        // If audioInstance is provided, it might be ready to play already,
        // BUT browsers block programmed playback without gesture.
        // So we still need the generic unlock listeners.

        // Attach global listeners for first interaction
        const events = ['click', 'keydown', 'touchstart'];
        const genericUnlock = () => {
            unlock();
        };
        events.forEach(e => window.addEventListener(e, genericUnlock, { once: false }));

        // Allow toggleAudio to access unlock
        audioRef.current.unlock = unlock;

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            events.forEach(e => window.removeEventListener(e, genericUnlock));
            // Don't pause/destroy audio if it came from props (it belongs to App)
            if (!audioInstance) {
                audio.pause();
                audio.src = '';
                if (audioContextRef.current) audioContextRef.current.close();
            }
        };
    }, [audioInstance]); // Depend on audioInstance

    const toggleAudio = (e) => {
        // Direct interaction handling
        if (!audioContextRef.current) {
            // Try to unlock immediately since this IS a user gesture (click)
            if (audioRef.current && audioRef.current.unlock) {
                audioRef.current.unlock();
            }
            return;
        }

        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().catch(() => {});
        }

        if (audioRef.current.paused) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <>
            <nav className="header-nav" style={{ opacity: 1 }}>
                <a href="https://sitnagpur.edu.in/" target="_blank" rel="noopener noreferrer" className="sit-badge-container" style={{ textDecoration: 'none' }}>
                    <span className="sit-badge">SIT NAGPUR</span>
                </a>
            </nav>

            <div className="global-header-visuals hidden-on-hero" id="global-header-container" style={{ cursor: 'pointer' }} onClick={toggleAudio}>
                <canvas id="techfest-vis-left" className="techfest-vis-canvas" ref={leftCanvasRef}></canvas>
                <div className="techfest-badge-container">
                    <span className="techfest-badge">ENTHUSIA 5.0</span>
                </div>
                <canvas id="techfest-vis-right" className="techfest-vis-canvas" ref={rightCanvasRef}></canvas>
            </div>

            <div className="hero-footer-text fade-in">
                ENTER THE PARALLEL FEST UNIVERSE 26 - 28 FEBRUARY 2026 • SIT NAGPUR
            </div>
        </>
    );
}

export default GlobalUI;

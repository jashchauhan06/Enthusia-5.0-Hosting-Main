import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const canvasRef = useRef(null);
    const loaderRef = useRef(null);
    const loaderBarRef = useRef(null);
    const loaderPercentRef = useRef(null);
    const csiTextRef = useRef(null);
    const scrollHintRef = useRef(null);
    const heroSectionRef = useRef(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0);
    const ctxRef = useRef(null);

    // Configuration
    const frameCount = 68;
    const startFrame = 5;
    const framePrefix = `${import.meta.env.BASE_URL}intro_mp4_000/intro_mp4_`;
    const frameExtension = '.webp';

    const getFramePath = (index) => {
        const paddedIndex = String(index).padStart(3, '0');
        return `${framePrefix}${paddedIndex}${frameExtension}`;
    };

    const renderFrame = (index) => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        if (!ctx || !canvas || !img) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, drawX, drawY;

        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: contain logic - fit entire image without cropping
            if (canvasRatio > imgRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            }
        } else {
            // Desktop: cover logic - fill canvas, may crop image
            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            }
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        ctxRef.current = canvas.getContext('2d');

        // Setup canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (isLoaded && imagesRef.current[currentFrameRef.current]) {
                renderFrame(currentFrameRef.current);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        // Preload images
        let loadedCount = 0;
        const images = [];

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = getFramePath(i);

            img.onload = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / frameCount) * 100);

                if (loaderBarRef.current) {
                    loaderBarRef.current.style.width = progress + '%';
                }
                if (loaderPercentRef.current) {
                    loaderPercentRef.current.textContent = progress + '%';
                }

                if (loadedCount === frameCount) {
                    onLoadComplete();
                }
            };

            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    onLoadComplete();
                }
            };

            images.push(img);
        }

        imagesRef.current = images;

        const onLoadComplete = () => {
            setIsLoaded(true);

            // Render first visible frame immediately
            currentFrameRef.current = startFrame;
            renderFrame(startFrame);

            // Force immediate render with requestAnimationFrame to ensure canvas is painted
            requestAnimationFrame(() => {
                renderFrame(startFrame);
            });

            // Hide loader
            setTimeout(() => {
                if (loaderRef.current) {
                    loaderRef.current.classList.add('hidden');
                }

                if (scrollHintRef.current) {
                    scrollHintRef.current.classList.add('visible');
                }

                setupScrollAnimation();

                // Re-render the frame after ScrollTrigger is set up to ensure visibility
                requestAnimationFrame(() => {
                    renderFrame(currentFrameRef.current);
                    ScrollTrigger.refresh();
                });
            }, 500);
        };

        const setupScrollAnimation = () => {
            const frameObj = { frame: startFrame };

            gsap.to(frameObj, {
                frame: frameCount - 1,
                ease: 'none',
                immediateRender: true,
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                    onRefresh: () => {
                        // Ensure initial frame is rendered when ScrollTrigger refreshes
                        renderFrame(currentFrameRef.current);
                    },
                    onEnter: () => {
                        // Ensure frame is rendered when entering the section
                        renderFrame(currentFrameRef.current);
                        // Show canvas and overlay
                        if (canvasRef.current) canvasRef.current.style.opacity = '1';
                        const overlay = document.querySelector('.sequence-overlay');
                        if (overlay) overlay.style.opacity = '1';
                    },
                    onUpdate: (scrollTrigger) => {
                        const progress = scrollTrigger.progress;
                        const frameRange = frameCount - 1 - startFrame;
                        const frameIndex = Math.round(startFrame + (progress * frameRange));

                        if (frameIndex !== currentFrameRef.current) {
                            currentFrameRef.current = frameIndex;
                            renderFrame(frameIndex);
                        }

                        updateOverlays(progress);
                    },
                    onLeave: () => {
                        renderFrame(frameCount - 1);
                        // Hide canvas and overlay when scrolling past hero section
                        if (canvasRef.current) canvasRef.current.style.opacity = '0';
                        const overlay = document.querySelector('.sequence-overlay');
                        if (overlay) overlay.style.opacity = '0';
                    },
                    onEnterBack: () => {
                        // Show canvas and overlay when scrolling back into hero section
                        if (canvasRef.current) canvasRef.current.style.opacity = '1';
                        const overlay = document.querySelector('.sequence-overlay');
                        if (overlay) overlay.style.opacity = '1';
                    }
                }
            });

            // NOTE: Canvas and overlay are already position: fixed in CSS
            // No need to pin them with ScrollTrigger - that was causing positioning issues
        };

        const updateOverlays = (progress) => {
            const csiText = csiTextRef.current;
            const scrollHint = scrollHintRef.current;

            if (csiText) {
                if (progress < 0.30) {
                    csiText.classList.add('visible');
                    if (progress < 0.20) {
                        csiText.style.opacity = 1;
                    } else {
                        const fadeProgress = (progress - 0.20) / 0.10;
                        csiText.style.opacity = 1 - fadeProgress;
                    }
                } else {
                    csiText.classList.remove('visible');
                    csiText.style.opacity = 0;
                }
            }

            if (scrollHint) {
                if (progress > 0.05) {
                    scrollHint.classList.remove('visible');
                } else if (isLoaded) {
                    scrollHint.classList.add('visible');
                }
            }
        };

        // Failsafe: Force hide loader after 15 seconds
        const failsafeTimeout = setTimeout(() => {
            if (loaderRef.current && !loaderRef.current.classList.contains('hidden')) {
                console.warn('Loader timeout - forcing completion');
                onLoadComplete();
            }
        }, 15000);

        return () => {
            window.removeEventListener('resize', resize);
            clearTimeout(failsafeTimeout);
        };
    }, []);

    return (
        <section className="hero-sequence" id="home" ref={heroSectionRef}>
            {/* Loading Screen */}
            <div className="sequence-loader" id="sequenceLoader" ref={loaderRef}>
                <div className="loader-corner loader-corner-tl">[HAWKINS_LAB]</div>
                <div className="loader-corner loader-corner-tr">[CLASSIFIED]</div>
                <div className="loader-corner loader-corner-bl">[PROJECT_011]</div>
                <div className="loader-corner loader-corner-br">[UPSIDE_DOWN]</div>

                <div className="loader-content">
                    <div className="loader-logo">
                        <img src={`${import.meta.env.BASE_URL}Stranger Tech logo.webp`} alt="Stranger Tech Logo" />
                    </div>

                    <div className="loader-title-simple">
                        <span className="loader-stranger">STRANGER</span>
                        <span className="loader-tech">TECH</span>
                    </div>

                    <div className="loader-init-text">INITIALIZING UPSIDE DOWN PROTOCOL...</div>

                    <div className="loader-progress">
                        <div className="loader-bar-container">
                            <div className="loader-bar-fill" id="loaderBarFill" ref={loaderBarRef}></div>
                        </div>
                        <div className="loader-status">
                            <span className="loader-label">LOADING</span>
                            <span className="loader-percent" id="loaderPercent" ref={loaderPercentRef}>0%</span>
                        </div>
                    </div>

                    <div className="loader-access">
                        <span className="loader-dots">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </span>
                        <span className="loader-access-text">ACCESSING THE VOID</span>
                    </div>
                </div>
            </div>

            {/* Canvas for Image Sequence */}
            <canvas className="sequence-canvas" id="sequenceCanvas" ref={canvasRef}></canvas>

            {/* Overlay Content */}
            <div className="sequence-overlay">
                <div className="csi-presents-text visible" id="csiPresentsText" ref={csiTextRef}>CSI PRESENTS</div>
            </div>

            {/* Scroll Indicator */}
            <div className="sequence-scroll-hint" id="sequenceScrollHint" ref={scrollHintRef}>
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to enter</span>
            </div>
        </section>
    );
};

export default Hero;

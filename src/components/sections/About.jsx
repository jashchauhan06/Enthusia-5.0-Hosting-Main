import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import MagicBento from '../MagicBento';

const About = forwardRef((props, ref) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Mobile-optimized scroll step (smaller for smoother scrolling)
    const SCROLL_STEP_DESKTOP = 150;
    const SCROLL_STEP_MOBILE = 100;
    const SCROLL_STEP = isMobile ? SCROLL_STEP_MOBILE : SCROLL_STEP_DESKTOP;

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 900);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Sync native scroll on mobile
    useEffect(() => {
        if (isMobile && scrollWrapperRef.current) {
            const wrapper = scrollWrapperRef.current;
            const handleNativeScroll = () => {
                setScrollTop(wrapper.scrollTop);
            };
            wrapper.addEventListener('scroll', handleNativeScroll, { passive: true });
            return () => wrapper.removeEventListener('scroll', handleNativeScroll);
        }
    }, [isMobile]);

    useImperativeHandle(ref, () => ({
        next: () => {
            if (isMobile && scrollWrapperRef.current) {
                // For mobile, check native scroll position
                const wrapper = scrollWrapperRef.current;
                const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
                if (wrapper.scrollTop < maxScroll - 10) {
                    wrapper.scrollBy({ top: SCROLL_STEP, behavior: 'smooth' });
                    return true;
                }
                return false;
            }

            if (containerRef.current && sectionRef.current) {
                const viewportHeight = sectionRef.current.clientHeight;
                const contentHeight = containerRef.current.scrollHeight;
                const maxScroll = Math.max(0, contentHeight - viewportHeight + 120);
                if (scrollTop < maxScroll) {
                    setScrollTop(prev => Math.min(prev + SCROLL_STEP, maxScroll));
                    return true;
                }
            }
            return false;
        },
        prev: () => {
            if (isMobile && scrollWrapperRef.current) {
                const wrapper = scrollWrapperRef.current;
                if (wrapper.scrollTop > 10) {
                    wrapper.scrollBy({ top: -SCROLL_STEP, behavior: 'smooth' });
                    return true;
                }
                return false;
            }

            if (scrollTop > 0) {
                setScrollTop(prev => Math.max(prev - SCROLL_STEP, 0));
                return true;
            }
            return false;
        },
        isFinished: () => {
            if (isMobile && scrollWrapperRef.current) {
                const wrapper = scrollWrapperRef.current;
                const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
                return wrapper.scrollTop >= maxScroll - 10;
            }

            if (!containerRef.current || !sectionRef.current) return true;
            const viewportHeight = sectionRef.current.clientHeight;
            const contentHeight = containerRef.current.scrollHeight;
            const maxScroll = Math.max(0, contentHeight - viewportHeight + 120);
            return scrollTop >= maxScroll;
        },
        isAtStart: () => {
            if (isMobile && scrollWrapperRef.current) {
                return scrollWrapperRef.current.scrollTop <= 10;
            }
            return scrollTop <= 0;
        },
        reset: (fromStart) => {
            if (isMobile && scrollWrapperRef.current) {
                scrollWrapperRef.current.scrollTo({ top: fromStart ? 0 : scrollWrapperRef.current.scrollHeight, behavior: 'instant' });
                return;
            }

            if (fromStart) {
                setScrollTop(0);
            } else {
                const viewportHeight = sectionRef.current?.clientHeight || 0;
                const contentHeight = containerRef.current?.scrollHeight || 0;
                const maxScroll = Math.max(0, contentHeight - viewportHeight + 120);
                setScrollTop(maxScroll);
            }
        },
        type: 'ABOUT',
        el: sectionRef.current
    }));

    return (
        <section className="section about-section" id="about" ref={sectionRef}>
            <style>{`
                .about-section {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 80px 30px 40px 200px;
                    box-sizing: border-box;
                    overflow: hidden;
                }

                .about-scroll-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                /* Mobile-optimized: use native scroll with momentum */
                @media (max-width: 900px) {
                    .about-scroll-wrapper {
                        overflow-y: auto !important;
                        overflow-x: hidden !important;
                        -webkit-overflow-scrolling: touch;
                        scroll-behavior: smooth;
                        transition: none;
                        padding-bottom: 60px;
                    }
                    
                    .about-scroll-wrapper::-webkit-scrollbar {
                        width: 4px;
                    }
                    
                    .about-scroll-wrapper::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                    }
                    
                    .about-scroll-wrapper::-webkit-scrollbar-thumb {
                        background: rgba(139, 92, 246, 0.4);
                        border-radius: 2px;
                    }
                }

                .about-container {
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .about-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    width: 100%;
                }

                .about-title {
                    font-family: var(--font-heading);
                    font-size: clamp(1.8rem, 3vw, 2.5rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    margin: 0;
                    text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
                }

                .about-title-underline {
                    width: 120px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
                    margin: 0.75rem auto 0;
                }

                @media (max-width: 1200px) {
                    .about-section {
                        padding-left: 160px;
                    }
                }

                @media (max-width: 900px) {
                    .about-section {
                        padding: 100px 15px 40px 15px;
                    }
                    .about-header {
                        padding: 0 60px 0 20px;
                        margin-bottom: 2rem;
                        box-sizing: border-box;
                    }
                    .about-title {
                        font-size: 1.8rem;
                        line-height: 1.1;
                        letter-spacing: 0.1em;
                        text-align: left;
                    }
                    .about-title span {
                        display: block;
                        font-size: 1.2rem;
                        margin-top: 0.5rem;
                        color: #8b5cf6;
                    }
                }
            `}</style>

            <div
                className="about-scroll-wrapper"
                ref={scrollWrapperRef}
                style={!isMobile ? { transform: `translateY(${-scrollTop}px)` } : undefined}
            >
                <div className="about-container" ref={containerRef}>
                    <div className="about-header">
                        <h2 className="about-title">About <span>Enthusia 5.0</span></h2>
                        <div className="about-title-underline"></div>
                    </div>
                    <MagicBento
                        spotlightRadius={520}
                        enableTilt={true}
                        enableMagnetism={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableStars={true}
                        clickEffect={true}
                        glowColor="139, 92, 246"
                    />
                </div>
            </div>
        </section>
    );
});

export default About;

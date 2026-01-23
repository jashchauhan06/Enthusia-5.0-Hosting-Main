import React, { forwardRef, useState, useImperativeHandle, useRef, useEffect } from 'react';
import { Drama, Guitar, Mic, Star, Headphones, Film } from 'lucide-react';
import ElectricBorder from '../ElectricBorder';

const CulturalEvents = forwardRef((props, ref) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const [viewState, setViewState] = useState(1);
    const [cardsVisible, setCardsVisible] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
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
                const maxScroll = Math.max(0, contentHeight - viewportHeight + 180);
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
            const maxScroll = Math.max(0, contentHeight - viewportHeight + 180);
            return scrollTop >= maxScroll;
        },
        isAtStart: () => {
            if (isMobile && scrollWrapperRef.current) {
                return scrollWrapperRef.current.scrollTop <= 10;
            }
            return scrollTop <= 0;
        },
        reset: (toStart) => {
            setViewState(1);
            setCardsVisible(true);
            
            if (isMobile && scrollWrapperRef.current) {
                scrollWrapperRef.current.scrollTo({ top: toStart ? 0 : scrollWrapperRef.current.scrollHeight, behavior: 'instant' });
                return;
            }

            if (toStart) {
                setScrollTop(0);
            } else {
                const viewportHeight = sectionRef.current?.clientHeight || 0;
                const contentHeight = containerRef.current?.scrollHeight || 0;
                const maxScroll = Math.max(0, contentHeight - viewportHeight + 180);
                setScrollTop(maxScroll);
            }
        },
        el: sectionRef.current
    }));

    useEffect(() => {
        if (viewState === 1) setCardsVisible(true);
        else setCardsVisible(false);
    }, [viewState]);

    const events = [
        {
            id: 1,
            title: "CULTURAL",
            subtitle: "PERFORMANCES",
            icon: <Drama />,
            desc: "DIVERSE SHOWCASE",
            borderColor: "#ec4899",
            iconColor: "#ec4899"
        },
        {
            id: 2,
            title: "JAMMING",
            subtitle: "NIGHT",
            icon: <Guitar />,
            desc: "OPEN MIC SESSIONS",
            borderColor: "#3b82f6",
            iconColor: "#3b82f6"
        },
        {
            id: 3,
            title: "MOVIE",
            subtitle: "NIGHT",
            icon: <Film />,
            desc: "CINEMATIC EXPERIENCE",
            borderColor: "#facc15",
            iconColor: "#facc15"
        },
        {
            id: 4,
            title: "CELEBRITY",
            subtitle: "NIGHT",
            icon: <Star />,
            desc: "STAR APPEARANCE",
            borderColor: "#4ade80",
            iconColor: "#4ade80"
        },
        {
            id: 5,
            title: "DJ NIGHT",
            subtitle: "",
            icon: <Headphones />,
            desc: "DANCE & MUSIC",
            borderColor: "#22d3ee",
            iconColor: "#22d3ee"
        }
    ];

    return (
        <section className="section" id="cultural-events" ref={sectionRef}>
            <style>{`
                /* ==========================================
                   CULTURAL EVENTS - NEON CARD DESIGN (REFIT)
                ========================================== */
                
                .cultural-events-section {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 80px 40px 60px 220px;
                    box-sizing: border-box;
                    perspective: 1000px;
                    overflow: hidden;
                }

                .cultural-events-scroll-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                /* Mobile-optimized: use native scroll with momentum */
                @media (max-width: 900px) {
                    .cultural-events-scroll-wrapper {
                        overflow-y: auto !important;
                        overflow-x: hidden !important;
                        -webkit-overflow-scrolling: touch;
                        scroll-behavior: smooth;
                        transition: none;
                        padding-bottom: 60px;
                    }
                    
                    .cultural-events-scroll-wrapper::-webkit-scrollbar {
                        width: 4px;
                    }
                    
                    .cultural-events-scroll-wrapper::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                    }
                    
                    .cultural-events-scroll-wrapper::-webkit-scrollbar-thumb {
                        background: rgba(236, 72, 153, 0.5);
                        border-radius: 2px;
                    }
                }

                .cultural-events-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .cultural-events-title {
                    font-family: var(--font-heading);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin: 0;
                    text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
                }

                .cultural-events-container {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: center;
                    gap: 1.5rem;
                    max-width: 100%;
                    width: 100%;
                }

                /* ==========================================
                   SCI-FI CARD STYLES
                ========================================== */
                
                .scifi-card {
                    position: relative;
                    flex: 1; /* Allow cards to share space equally */
                    max-width: 210px; /* Scaled down 20% */
                    height: 320px;    /* Scaled down 20% */
                    background: rgba(5, 5, 16, 0.5); /* Transparent bg 0.5 */
                    backdrop-filter: blur(5px);
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0.8rem;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    /* Main Border Color handled via var */
                    border: 1px solid var(--card-border-color);
                    box-shadow: 0 0 15px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8);
                    
                    /* Sci-Fi Shape Config */
                    --notch-size: 12px;
                    clip-path: polygon(
                        0% var(--notch-size), 
                        var(--notch-size) 0%, 
                        calc(100% - var(--notch-size)) 0%, 
                        100% var(--notch-size), 
                        100% calc(100% - var(--notch-size)), 
                        calc(100% - var(--notch-size)) 100%, 
                        var(--notch-size) 100%, 
                        0% calc(100% - var(--notch-size))
                    );
                }

                /* Circuit Pattern */
                .scifi-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 16px 16px;
                    opacity: 0.5;
                    pointer-events: none;
                }

                /* Inner Glowing Border (Pseudo) */
                .scifi-card::after {
                    content: '';
                    position: absolute;
                    inset: 3px;
                    border: 1px solid var(--card-border-color);
                    border-radius: 2px;
                    opacity: 0.5;
                    pointer-events: none;
                    clip-path: polygon(
                        0% var(--notch-size), 
                        var(--notch-size) 0%, 
                        calc(100% - var(--notch-size)) 0%, 
                        100% var(--notch-size), 
                        100% calc(100% - var(--notch-size)), 
                        calc(100% - var(--notch-size)) 100%, 
                        var(--notch-size) 100%, 
                        0% calc(100% - var(--notch-size))
                    );
                }

                .scifi-card:hover {
                    box-shadow: 0 0 30px var(--card-border-color), inset 0 0 20px var(--card-border-color);
                    transform: translateY(-8px);
                    z-index: 10;
                }

                .scifi-card:hover::after {
                    opacity: 1;
                    box-shadow: 0 0 10px var(--card-border-color);
                }

                /* Content z-index adjustment */
                .scifi-card > * {
                    position: relative;
                    z-index: 2;
                }

                /* ICON */
                .scifi-icon {
                    margin-top: 0.8rem;
                    color: var(--card-icon-color);
                    filter: drop-shadow(0 0 5px var(--card-icon-color));
                    transition: transform 0.3s ease;
                }
                
                .scifi-card:hover .scifi-icon {
                    transform: scale(1.1);
                    filter: drop-shadow(0 0 15px var(--card-icon-color));
                }

                /* HEADER GROUP */
                .scifi-header {
                    text-align: center;
                    margin: 0.8rem 0;
                }

                .scifi-title {
                    font-family: var(--font-heading);
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin: 0;
                    line-height: 1.1;
                }

                .scifi-subtitle {
                    display: block;
                    font-family: var(--font-heading);
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-top: 0.2rem;
                    opacity: 0.9;
                }

                /* DESC */
                .scifi-desc {
                    font-family: monospace;
                    font-size: 0.65rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-align: center;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: auto;
                    padding: 0 0.5rem;
                    margin-top: 0.5rem;
                }

                /* BUTTON */
                .scifi-btn {
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                    padding: 0.6rem 2rem;
                    background: transparent;
                    border: 1px solid var(--card-border-color);
                    color: #fff;
                    font-family: var(--font-heading);
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    text-decoration: none;
                    position: relative;
                    transition: all 0.3s ease;
                    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
                }

                .scifi-btn::before {
                    content: '';
                    position: absolute;
                    top: 2px; left: 2px; right: 2px; bottom: 2px;
                    border: 1px solid var(--card-border-color);
                    opacity: 0.3;
                    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
                    pointer-events: none;
                }
                
                .scifi-btn:hover {
                    background: var(--card-border-color);
                    color: #000;
                    box-shadow: 0 0 20px var(--card-border-color);
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .cultural-events-section { padding-left: 180px; }
                }
                @media (max-width: 900px) {
                    .cultural-events-section { padding: 80px 20px 60px 20px; }
                    .cultural-events-header { 
                        margin-bottom: 1.2rem !important;
                        padding-right: 60px !important;
                        text-align: left !important;
                    }
                    .cultural-events-title { font-size: 2.2rem !important; }
                    .cultural-events-container { flex-wrap: wrap; gap: 1rem; }
                    .scifi-card { width: 45%; max-width: none; height: 280px; }
                }
                @media (max-width: 600px) {
                    .cultural-events-section {
                        padding: 80px 20px 40px 20px !important;
                        height: 100vh !important;
                        overflow: hidden !important;
                    }
                    .cultural-events-scroll-wrapper {
                        height: calc(100vh - 120px) !important;
                        overflow-y: auto !important;
                        overflow-x: hidden !important;
                        padding-bottom: 4rem !important;
                        -webkit-overflow-scrolling: touch;
                    }
                    .cultural-events-scroll-wrapper::-webkit-scrollbar {
                        width: 4px;
                    }
                    .cultural-events-scroll-wrapper::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                    }
                    .cultural-events-scroll-wrapper::-webkit-scrollbar-thumb {
                        background: rgba(236, 72, 153, 0.5);
                        border-radius: 2px;
                    }
                    .cultural-events-container {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 1rem !important;
                        padding: 0 1rem 4rem 1rem !important;
                    }
                    .scifi-card { 
                        width: 100% !important;
                        max-width: 320px !important;
                        height: 280px !important;
                        padding: 1.2rem 1rem !important;
                    }
                    .scifi-icon svg { 
                        width: 36px !important; 
                        height: 36px !important; 
                    }
                    .scifi-title { 
                        font-size: 1rem !important; 
                    }
                    .scifi-subtitle { 
                        font-size: 0.85rem !important; 
                    }
                    .scifi-desc { 
                        font-size: 0.7rem !important;
                        margin-top: 1rem !important;
                    }
                }
            `}</style>

            <div className="cultural-events-section">
                <div 
                    className="cultural-events-scroll-wrapper" 
                    ref={scrollWrapperRef}
                    style={!isMobile ? { transform: `translateY(${-scrollTop}px)` } : undefined}
                >
                    <div className="cultural-events-container-wrapper" ref={containerRef}>
                        <div className={`cultural-events-header ${cardsVisible ? 'visible' : ''}`}>
                            <h2 className="cultural-events-title">Cultural Events</h2>
                        </div>

                        <div className="cultural-events-container">
                            {events.map((event, index) => (
                                <div
                                    key={event.id}
                                    className={`scifi-card ${cardsVisible ? 'visible' : ''}`}
                                    style={{
                                        '--card-border-color': event.borderColor,
                                        '--card-icon-color': event.iconColor,
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                >
                                    <div className="scifi-icon">
                                        {React.cloneElement(event.icon, { size: 40, strokeWidth: 1.5 })}
                                    </div>

                                    <div className="scifi-header">
                                        <h3 className="scifi-title">{event.title}</h3>
                                        {event.subtitle && <span className="scifi-subtitle">{event.subtitle}</span>}
                                    </div>

                                    <p className="scifi-desc">{event.desc}</p>

                                    <div className="scifi-btn" style={{ opacity: 0, pointerEvents: 'none' }}>Access</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default CulturalEvents;

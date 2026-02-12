import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Comparison = () => {
    useEffect(() => {
        // 3D Tilt Effect for Prize Cards
        const tiltCards = document.querySelectorAll('.prize-card-mini');

        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 500,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = (e) => {
            const card = e.currentTarget;
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            tiltCards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <section className="comparison-section" id="prizes">
            <div className="section-header">
                <span className="section-tag">SEC. 005</span>
                <h2 className="section-title">HAWKINS LAB PROVISIONS</h2>
                <p className="section-subtitle">What we provide vs What you must bring to survive</p>
            </div>

            {/* Prize Pool Subsection */}
            <div className="prize-pool-subsection">
                <div className="prize-header">
                    <h3 className="prize-main-title">PRIZE POOL</h3>
                </div>

                <div className="prize-cards-row">
                    {/* 2nd Place */}
                    <div className="prize-card-mini prize-2nd">
                        <div className="prize-rank">2ND</div>
                        <div className="prize-amount">₹7,000</div>
                        <div className="prize-label">RUNNER UP</div>
                    </div>

                    {/* 1st Place */}
                    <div className="prize-card-mini prize-1st">
                        <div className="prize-rank">1ST</div>
                        <div className="prize-amount">₹10,000</div>
                        <div className="prize-label">CHAMPION</div>
                    </div>

                    {/* 3rd Place */}
                    <div className="prize-card-mini prize-3rd">
                        <div className="prize-rank">3RD</div>
                        <div className="prize-amount">₹5,000</div>
                        <div className="prize-label">2ND RUNNER UP</div>
                    </div>
                </div>
            </div>

            <div className="comparison-container">
                {/* Left Side - What We Provide */}
                <div className="comparison-column provide-column">
                    <div className="column-header">
                        <div className="header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                            </svg>
                        </div>
                        <h3 className="column-title">WE PROVIDE</h3>
                        <div className="header-glow"></div>
                    </div>

                    <div className="comparison-items">
                        <div className="comparison-item" data-index="1">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>High-Speed WiFi</h4>
                                <p>Stable internet connection throughout the event</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="2">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Venue & Space</h4>
                                <p>Comfortable workspace for all teams</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="3">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Refreshments</h4>
                                <p>Snacks and beverages for all participants</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>



                        <div className="comparison-item" data-index="5">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="6" />
                                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Certificates</h4>
                                <p>Participation certificates for all teams</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="6">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 8 7 8 7h8s1-3 3.5-3a2.5 2.5 0 0 1 0 5H18" />
                                    <path d="M5 21V10h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                                    <path d="M12 10v13" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Prizes & Goodies</h4>
                                <p>Cash prizes and exclusive merchandise for winners</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>
                    </div>
                </div>

                {/* Center Divider */}
                <div className="comparison-divider">
                    <div className="divider-line-vertical"></div>
                    <div className="divider-portal">

                        <div className="portal-center">VS</div>
                    </div>
                    <div className="divider-line-vertical"></div>
                </div>

                {/* Right Side - What You Bring */}
                <div className="comparison-column bring-column">
                    <div className="column-header">
                        <div className="header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 20V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                                <line x1="12" y1="12" x2="12" y2="16" />
                            </svg>
                        </div>
                        <h3 className="column-title">YOU BRING</h3>
                        <div className="header-glow"></div>
                    </div>

                    <div className="comparison-items">
                        <div className="comparison-item" data-index="1">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z" />
                                    <path d="M8 10c-2.21 0-4 1.79-4 4s1.79 4 4 4" />
                                    <path d="M16 10c2.21 0 4 1.79 4 4s-1.79 4-4 4" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Your Skills</h4>
                                <p>Problem-solving abilities and logical thinking</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="2">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Your Team</h4>
                                <p>3 members ready to face the challenges</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="3">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Energy & Enthusiasm</h4>
                                <p>Positive attitude and determination to win</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="4">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="2" y1="20" x2="22" y2="20" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Laptop (Mandatory)</h4>
                                <p>Each team must bring their own laptop - no workstations provided, also bring extension cord</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="5">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v10" />
                                    <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Extension Cords</h4>
                                <p>Bring your own extension cords for power - not provided</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>

                        <div className="comparison-item" data-index="6">
                            <div className="item-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                    <line x1="2" y1="10" x2="22" y2="10" />
                                    <circle cx="8" cy="15" r="2" />
                                    <path d="M14 13h4" />
                                    <path d="M14 17h4" />
                                </svg>
                            </div>
                            <div className="item-content">
                                <h4>Valid ID</h4>
                                <p>College ID and government-issued identification</p>
                            </div>
                            <div className="item-glow"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="comparison-particles">
                <span className="comp-particle"></span>
                <span className="comp-particle"></span>
                <span className="comp-particle"></span>
                <span className="comp-particle"></span>
                <span className="comp-particle"></span>
            </div>
        </section>
    );
};

export default Comparison;

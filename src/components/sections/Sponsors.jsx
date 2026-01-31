import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// --- Sponsor Data by Tier ---
const sponsorCategories = {
    title: [
        { id: '00', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600" },
    ],
    coTitle: [
        { id: '01', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600" },
        { id: '02', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600" },
    ],
    diamond: [
        { id: '03', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600" },
        { id: '04', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600" },
        { id: '05', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=600" },
    ],
    platinum: [
        { id: '06', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
        { id: '07', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
        { id: '08', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
        { id: '09', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
        { id: '10', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
    ],
    gold: [
        { id: '11', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=600" },
        { id: '12', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600" },
        { id: '13', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600" },
        { id: '14', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=600" },
        { id: '15', title: "To be revealed soon", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600" },
    ]
};

// --- Helper: Horizontal Row Position Logic ---
const getGridPosition = (index, total, cardSize = 160, tier = null) => {
    // All cards in a single horizontal row
    const gap = 30;
    const totalWidth = total * cardSize + (total - 1) * gap;
    const startX = -totalWidth / 2 + cardSize / 2;

    // Calculate x position for each card - centered in the container
    // Add 40px offset to the right for platinum and gold tiers
    const tierOffset = (tier === 'platinum' || tier === 'gold') ? 40 : 0;
    const xOffset = startX + index * (cardSize + gap) + tierOffset;

    return { x: xOffset, y: 0 };
};

// --- Cyberpunk Card Component ---
const CyberCard = React.forwardRef(({ item, tier }, ref) => {
    const tierConfig = {
        title: { colorClass: 'title', label: 'TITLE SPONSOR', subtext: 'CLASS_SS' },
        coTitle: { colorClass: 'co-title', label: 'CO-TITLE', subtext: 'CLASS_S+' },
        diamond: { colorClass: 'cyan', label: 'DIAMOND', subtext: 'CLASS_S' },
        platinum: { colorClass: 'fuchsia', label: 'PLATINUM', subtext: 'CLASS_A' },
        gold: { colorClass: 'gold', label: 'GOLD', subtext: 'CLASS_B' }
    };

    const config = tierConfig[tier];

    return (
        <div
            ref={ref}
            className={`cyber-card cyber-${tier}`}
        >
            <div className="cyber-card-content">
                <div className="cyber-card-inner">
                    <div className="cyber-card-image-wrapper">
                        <img src={item.image} alt={item.title} className="cyber-card-image" />
                    </div>
                    <div className="hud-line hud-line-top" />
                    <div className="hud-line hud-line-bottom" />
                    <div className={`cyber-label ${config.colorClass}`}>
                        {config.label}
                    </div>
                    <div className="cyber-card-footer">
                        <div className="cyber-card-text">
                            <span className="cyber-subtext">{config.subtext} // {item.id}</span>
                            <h3 className="cyber-title">{item.title}</h3>
                        </div>
                        <div className="cyber-dots">
                            <div className={`cyber-dot ${config.colorClass} pulse`} />
                            <div className={`cyber-dot ${config.colorClass} dim`} />
                            <div className={`cyber-dot ${config.colorClass} dimmer`} />
                        </div>
                    </div>
                </div>
                <div className="cyber-scanlines" />
                <div className="cyber-hover-highlight" />
            </div>
            <div className="corner-border corner-tl" />
            <div className="corner-border corner-tr" />
            <div className="corner-border corner-bl" />
            <div className="corner-edge corner-br-v" />
            <div className="corner-edge corner-br-h" />
        </div>
    );
});



// --- Main Sponsors Component ---
const Sponsors = forwardRef((props, ref) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef({ title: [], coTitle: [], diamond: [], platinum: [], gold: [] });
    const scrollContainerRef = useRef(null);
    const [currentPhase, setCurrentPhase] = useState(0); // 0=title, 1=coTitle, 2=diamond, 3=platinum, 4=gold
    const phaseRef = useRef(0);
    const animatingRef = useRef(false);
    const scrolledToEndRef = useRef(false);
    const isMobile = window.innerWidth <= 991; // Detect mobile

    // Check if current tier needs scrolling (platinum or gold)
    const needsScrolling = (phase) => {
        return isMobile && (phase === 3 || phase === 4); // platinum or gold
    };

    // Check if scrolled to end (vertical)
    const checkScrollEnd = () => {
        if (!scrollContainerRef.current) return true;
        const container = scrollContainerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const isAtEnd = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
        scrolledToEndRef.current = isAtEnd;
        return isAtEnd;
    };

    // Expose API to ScrollController
    useImperativeHandle(ref, () => ({
        next: () => {
            // Always block if animating
            if (animatingRef.current) return true;

            // On mobile, if current phase needs scrolling and not scrolled to end, block
            if (needsScrolling(phaseRef.current) && !checkScrollEnd()) {
                return true; // Block navigation until scrolled to end
            }

            // If we can advance, do it
            if (phaseRef.current < 4) {
                scrolledToEndRef.current = false; // Reset for next phase
                animateToPhase(phaseRef.current + 1);
                return true; // Consumed
            }

            // We're at the end, let section transition happen
            return false;
        },
        prev: () => {
            // Always block if animating
            if (animatingRef.current) return true;

            // If we can go back, do it
            if (phaseRef.current > 0) {
                scrolledToEndRef.current = false; // Reset for previous phase
                animateToPhase(phaseRef.current - 1);
                return true; // Consumed
            }

            // We're at the start, let section transition happen
            return false;
        },
        isFinished: () => {
            // Only finished if at last phase AND not animating AND scrolled to end (if needed)
            if (phaseRef.current >= 4) {
                return !needsScrolling(phaseRef.current) || checkScrollEnd();
            }
            return false;
        },
        isAtStart: () => {
            // Only at start if at first phase AND not animating
            return phaseRef.current <= 0;
        },
        reset: (fromTop) => {
            // Kill any ongoing animations
            gsap.killTweensOf(Object.values(cardsRef.current).flat());
            animatingRef.current = false;
            scrolledToEndRef.current = false;

            phaseRef.current = fromTop ? 0 : 4;
            setCurrentPhase(phaseRef.current);
            resetCards(phaseRef.current);
        },
        type: 'SPONSORS',
        el: sectionRef.current
    }));

    const resetCards = (phase) => {
        const tiers = ['title', 'coTitle', 'diamond', 'platinum', 'gold'];

        // On mobile, just set visibility without GSAP transforms
        if (isMobile) {
            tiers.forEach((tier, tierIdx) => {
                const cards = (cardsRef.current[tier] || []).filter(c => c);
                cards.forEach((card) => {
                    if (!card) return;
                    if (tierIdx === phase) {
                        gsap.set(card, {
                            opacity: 1,
                            visibility: 'visible',
                            display: 'block'
                        });
                    } else {
                        gsap.set(card, {
                            opacity: 0,
                            visibility: 'hidden',
                            display: 'none'
                        });
                    }
                });
            });
            return;
        }

        // Desktop: Original animation logic
        tiers.forEach((tier, tierIdx) => {
            // Filter out nulls to get only active cards
            const cards = (cardsRef.current[tier] || []).filter(c => c);

            if (tierIdx === phase) {
                // Show this tier's cards in grid
                cards.forEach((card, i) => {
                    if (!card) return;
                    const isTitle = tierIdx === 0;
                    const isCoTitle = tierIdx === 1;
                    const isDiamond = tierIdx === 2;
                    const cardSize = isTitle ? 400 : isCoTitle ? 240 : isDiamond ? 190 : 160;
                    const pos = getGridPosition(i, cards.length, cardSize, tier);

                    gsap.set(card, {
                        opacity: 1,
                        scale: 1,
                        x: pos.x,
                        y: pos.y,
                        xPercent: -50,
                        yPercent: -50,
                        rotation: 0,
                        zIndex: 10
                    });
                });
            } else {
                // Hide other tiers
                cards.forEach((card) => {
                    if (!card) return;
                    gsap.set(card, {
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                        xPercent: -50,
                        yPercent: -50,
                        zIndex: 1
                    });
                });
            }
        });
    };

    const animateToPhase = (newPhase) => {
        // Prevent double calls
        if (animatingRef.current) {
            return;
        }
        if (newPhase === phaseRef.current) {
            return;
        }
        if (newPhase < 0 || newPhase > 4) {
            return;
        }

        animatingRef.current = true;

        const oldPhase = phaseRef.current;
        const tiers = ['title', 'coTitle', 'diamond', 'platinum', 'gold'];
        const oldTier = tiers[oldPhase];
        const newTier = tiers[newPhase];

        const oldCards = (cardsRef.current[oldTier] || []).filter(c => c);
        const newCards = (cardsRef.current[newTier] || []).filter(c => c);

        // On mobile, use simple fade transition
        if (isMobile) {
            const tl = gsap.timeline({
                onComplete: () => {
                    phaseRef.current = newPhase;
                    setCurrentPhase(newPhase);
                    setTimeout(() => {
                        animatingRef.current = false;
                    }, 100);
                }
            });

            // Fade out old cards
            oldCards.forEach((card) => {
                if (!card) return;
                tl.to(card, {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.inOut'
                }, 0);
            });

            // Fade in new cards
            newCards.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, {
                    opacity: 0,
                    visibility: 'visible',
                    display: 'block'
                });

                tl.to(card, {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.inOut'
                }, 0.15 + i * 0.03);
            });

            return;
        }

        // Desktop: Faster animation
        const tl = gsap.timeline({
            onComplete: () => {
                phaseRef.current = newPhase;
                setCurrentPhase(newPhase);
                setTimeout(() => {
                    animatingRef.current = false;
                }, 200);
            }
        });

        // Animate out old cards
        oldCards.forEach((card, i) => {
            if (!card) return;
            const direction = newPhase > oldPhase ? -1 : 1;
            tl.to(card, {
                opacity: 0,
                scale: newPhase > oldPhase ? 1.5 : 0.5,
                y: direction * 200,
                rotation: (i % 2 === 0 ? 1 : -1) * 30,
                duration: 0.35,
                ease: 'power2.in'
            }, 0);
        });

        // Animate in new cards
        newCards.forEach((card, i) => {
            if (!card) return;
            const isTitle = newPhase === 0;
            const isCoTitle = newPhase === 1;
            const isDiamond = newPhase === 2;
            const cardSize = isTitle ? 400 : isCoTitle ? 240 : isDiamond ? 190 : 160;
            const pos = getGridPosition(i, newCards.length, cardSize, newTier);
            const direction = newPhase > oldPhase ? 1 : -1;

            gsap.set(card, {
                opacity: 0,
                scale: 0.5,
                x: pos.x,
                y: direction * 200,
                xPercent: -50,
                yPercent: -50,
                rotation: (i % 2 === 0 ? -1 : 1) * 45,
                zIndex: 10
            });

            tl.to(card, {
                opacity: 1,
                scale: 1,
                y: pos.y,
                rotation: 0,
                duration: 0.45,
                ease: 'back.out(1.2)'
            }, 0.25 + i * 0.04);
        });
    };

    // Initialize cards on mount
    useEffect(() => {
        resetCards(0);
    }, []);

    return (
        <section className="sponsors-section section" id="sponsors" ref={sectionRef}>
            <div className="sponsors-container">
                <div className="sponsors-header">
                    <h2 className="section-title purple fade-in">SPONSORS</h2>
                </div>

                {/* Tier Heading - Outside stack area */}
                {currentPhase === 0 && (
                    <div className="tier-heading-wrapper fade-in">
                        <h3 className="tier-heading title-tier">TITLE SPONSOR</h3>
                    </div>
                )}
                {currentPhase === 1 && (
                    <div className="tier-heading-wrapper fade-in">
                        <h3 className="tier-heading co-title-tier">CO-TITLE SPONSOR</h3>
                    </div>
                )}
                {currentPhase === 2 && (
                    <div className="tier-heading-wrapper fade-in">
                        <h3 className="tier-heading diamond-tier">DIAMOND SPONSOR</h3>
                    </div>
                )}
                {currentPhase === 3 && (
                    <div className="tier-heading-wrapper fade-in">
                        <h3 className="tier-heading platinum-tier">PLATINUM SPONSOR</h3>
                    </div>
                )}
                {currentPhase === 4 && (
                    <div className="tier-heading-wrapper fade-in">
                        <h3 className="tier-heading gold-tier">GOLD SPONSOR</h3>
                    </div>
                )}

                <div className="cyber-stack-area">
                    <div className="cyber-grid-bg" />

                    {/* Title Sponsor Section */}
                    <div style={{ display: currentPhase === 0 ? 'contents' : 'none' }}>
                        {sponsorCategories.title.map((item, i) => (
                            <CyberCard
                                key={`title-${item.id}`}
                                ref={el => cardsRef.current.title[i] = el}
                                item={item}
                                tier="title"
                            />
                        ))}
                    </div>

                    {/* Co-Title Sponsor Section */}
                    <div style={{ display: currentPhase === 1 ? 'contents' : 'none' }}>
                        {sponsorCategories.coTitle.map((item, i) => (
                            <CyberCard
                                key={`coTitle-${item.id}`}
                                ref={el => cardsRef.current.coTitle[i] = el}
                                item={item}
                                tier="coTitle"
                            />
                        ))}
                    </div>

                    {/* Diamond Sponsor Section */}
                    <div style={{ display: currentPhase === 2 ? 'contents' : 'none' }}>
                        {sponsorCategories.diamond.map((item, i) => (
                            <CyberCard
                                key={`diamond-${item.id}`}
                                ref={el => cardsRef.current.diamond[i] = el}
                                item={item}
                                tier="diamond"
                            />
                        ))}
                    </div>

                    {/* Platinum Sponsor Section */}
                    <div style={{ display: currentPhase === 3 ? 'contents' : 'none' }}>
                        {isMobile ? (
                            <div className="sponsor-scroll-container" ref={scrollContainerRef}>
                                {sponsorCategories.platinum.map((item, i) => (
                                    <div key={`platinum-wrapper-${item.id}`}>
                                        <CyberCard
                                            ref={el => cardsRef.current.platinum[i] = el}
                                            item={item}
                                            tier="platinum"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {sponsorCategories.platinum.map((item, i) => (
                                    <CyberCard
                                        key={`platinum-${item.id}`}
                                        ref={el => cardsRef.current.platinum[i] = el}
                                        item={item}
                                        tier="platinum"
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    {/* Gold Sponsor Section */}
                    <div style={{ display: currentPhase === 4 ? 'contents' : 'none' }}>
                        {isMobile ? (
                            <div className="sponsor-scroll-container" ref={scrollContainerRef}>
                                {sponsorCategories.gold.map((item, i) => (
                                    <div key={`gold-wrapper-${item.id}`}>
                                        <CyberCard
                                            ref={el => cardsRef.current.gold[i] = el}
                                            item={item}
                                            tier="gold"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {sponsorCategories.gold.map((item, i) => (
                                    <CyberCard
                                        key={`gold-${item.id}`}
                                        ref={el => cardsRef.current.gold[i] = el}
                                        item={item}
                                        tier="gold"
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* HUD Progress */}

            </div>
        </section>
    );
});

export default Sponsors;

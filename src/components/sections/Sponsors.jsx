import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// --- Sponsor Data by Tier ---
const sponsorCategories = {
    diamond: [
        { id: '01', title: "Neural Link", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600" },
        { id: '02', title: "Cyber Arm", image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=600" },
        { id: '03', title: "Neon City", image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=600" },
    ],
    platinum: [
        { id: '06', title: "Bio Hack", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=600" },
        { id: '07', title: "Tech Wear", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600" },
        { id: '08', title: "Night Raid", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600" },
        { id: '09', title: "Droid", image: "https://images.unsplash.com/photo-1535378437327-b7107b7706ab?q=80&w=600" },
        { id: '10', title: "Mainframe", image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=600" },
    ],
    gold: [
        { id: '11', title: "Waste Land", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=600" },
        { id: '12', title: "Scavenger", image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600" },
        { id: '13', title: "Old Tech", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600" },
        { id: '14', title: "Wires", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=600" },
        { id: '15', title: "Glitch", image: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=600" },
    ]
};

// --- Helper: Horizontal Row Position Logic ---
const getGridPosition = (index, total, cardSize = 160) => {
    // All cards in a single horizontal row
    const gap = 30; // Increased gap slightly
    const totalWidth = total * cardSize + (total - 1) * gap;
    const startX = -totalWidth / 2 + cardSize / 2;
    // Offset by half of navbar width (~80px) to center in visible area
    const navbarOffset = 40;
    const xOffset = startX + index * (cardSize + gap) + navbarOffset;

    return { x: xOffset, y: -30 }; // -30 to move up slightly
};

// --- Cyberpunk Card Component ---
const CyberCard = React.forwardRef(({ item, tier }, ref) => {
    const tierConfig = {
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

// --- Phase Indicator ---
const PhaseIndicator = ({ label, color, active, progress }) => (
    <div className="phase-indicator" style={{ opacity: active ? 1 : 0.3 }}>
        <div className="phase-marker" />
        <div className="phase-content">
            <span className="phase-label">{label}</span>
            <div className="phase-bar">
                <div className={`phase-fill ${color}`} style={{ width: `${progress}%` }} />
            </div>
        </div>
    </div>
);

// --- Main Sponsors Component ---
const Sponsors = forwardRef((props, ref) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef({ diamond: [], platinum: [], gold: [] });
    const [currentPhase, setCurrentPhase] = useState(0); // 0=diamond, 1=platinum, 2=gold
    const phaseRef = useRef(0);
    const animatingRef = useRef(false);

    // Expose API to ScrollController
    useImperativeHandle(ref, () => ({
        next: () => {
            if (animatingRef.current) return true;
            if (phaseRef.current < 2) {
                animateToPhase(phaseRef.current + 1);
                return true; // Consumed
            }
            return false; // Let dolly zoom handle section change
        },
        prev: () => {
            if (animatingRef.current) return true;
            if (phaseRef.current > 0) {
                animateToPhase(phaseRef.current - 1);
                return true; // Consumed
            }
            return false; // Let dolly zoom handle section change
        },
        isFinished: () => phaseRef.current >= 2,
        isAtStart: () => phaseRef.current <= 0,
        reset: (fromTop) => {
            phaseRef.current = fromTop ? 0 : 2;
            setCurrentPhase(phaseRef.current);
            resetCards(phaseRef.current);
        },
        type: 'SPONSORS',
        el: sectionRef.current
    }));

    const resetCards = (phase) => {
        const tiers = ['diamond', 'platinum', 'gold'];

        tiers.forEach((tier, tierIdx) => {
            // Filter out nulls to get only active cards
            const cards = (cardsRef.current[tier] || []).filter(c => c);
            cards.forEach((card, i) => {
                if (!card) return;
                const isDiamond = tierIdx === 0;
                const cardSize = isDiamond ? 240 : 160;
                const pos = getGridPosition(i, cards.length, cardSize);

                if (tierIdx === phase) {
                    // Show this tier's cards in grid
                    gsap.set(card, {
                        opacity: 1,
                        scale: 1,
                        x: pos.x,
                        y: pos.y,
                        rotation: 0,
                        zIndex: 10
                    });
                } else {
                    // Hide other tiers
                    gsap.set(card, {
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                        zIndex: 1
                    });
                }
            });
        });
    };

    const animateToPhase = (newPhase) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const oldPhase = phaseRef.current;
        const tiers = ['diamond', 'platinum', 'gold'];
        const oldTier = tiers[oldPhase];
        const newTier = tiers[newPhase];

        const oldCards = (cardsRef.current[oldTier] || []).filter(c => c);
        const newCards = (cardsRef.current[newTier] || []).filter(c => c);

        const tl = gsap.timeline({
            onComplete: () => {
                animatingRef.current = false;
                phaseRef.current = newPhase;
                setCurrentPhase(newPhase);
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
                duration: 0.4,
                ease: 'power2.in'
            }, 0);
        });

        // Animate in new cards
        newCards.forEach((card, i) => {
            if (!card) return;
            const isDiamond = newPhase === 0;
            const cardSize = isDiamond ? 240 : 160;
            const pos = getGridPosition(i, newCards.length, cardSize);
            const direction = newPhase > oldPhase ? 1 : -1;

            gsap.set(card, {
                opacity: 0,
                scale: 0.5,
                x: pos.x,
                y: direction * 200,
                rotation: (i % 2 === 0 ? -1 : 1) * 45,
                zIndex: 10
            });

            tl.to(card, {
                opacity: 1,
                scale: 1,
                y: pos.y,
                rotation: 0,
                duration: 0.5,
                ease: 'back.out(1.2)'
            }, 0.3 + i * 0.05);
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

                <div className="cyber-stack-area">
                    <div className="cyber-grid-bg" />

                    {/* Diamond Cards */}
                    {sponsorCategories.diamond.map((item, i) => (
                        <CyberCard
                            key={`diamond-${item.id}`}
                            ref={el => cardsRef.current.diamond[i] = el}
                            item={item}
                            tier="diamond"
                        />
                    ))}

                    {/* Platinum Cards */}
                    {sponsorCategories.platinum.map((item, i) => (
                        <CyberCard
                            key={`platinum-${item.id}`}
                            ref={el => cardsRef.current.platinum[i] = el}
                            item={item}
                            tier="platinum"
                        />
                    ))}

                    {/* Gold Cards */}
                    {sponsorCategories.gold.map((item, i) => (
                        <CyberCard
                            key={`gold-${item.id}`}
                            ref={el => cardsRef.current.gold[i] = el}
                            item={item}
                            tier="gold"
                        />
                    ))}
                </div>

                {/* HUD Progress */}
                <div className="hud-progress">
                    <PhaseIndicator
                        label="SECTOR: DIAMOND"
                        color="cyan"
                        active={currentPhase === 0}
                        progress={currentPhase >= 0 ? 100 : 0}
                    />
                    <PhaseIndicator
                        label="SECTOR: PLATINUM"
                        color="fuchsia"
                        active={currentPhase === 1}
                        progress={currentPhase >= 1 ? 100 : 0}
                    />
                    <PhaseIndicator
                        label="SECTOR: GOLD"
                        color="gold"
                        active={currentPhase === 2}
                        progress={currentPhase >= 2 ? 100 : 0}
                    />
                </div>
            </div>
        </section>
    );
});

export default Sponsors;

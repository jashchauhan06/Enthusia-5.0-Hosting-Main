import { useEffect, useRef } from 'react';

const About = () => {
    const revealRef = useRef(null);

    // Define "random" offsets for the burn blobs to create an irregular shape
    const blobs = [
        { dx: 0, dy: 0, r: 200, scale: 1 },         // Main center
        { dx: -40, dy: -30, r: 160, scale: 0.9 },   // Top left lump
        { dx: 30, dy: -50, r: 170, scale: 0.95 },   // Top right lump
        { dx: -50, dy: 40, r: 150, scale: 0.85 },   // Bottom left lump
        { dx: 40, dy: 30, r: 180, scale: 0.92 }     // Bottom right lump
    ];

    useEffect(() => {
        const revealEl = revealRef.current;
        if (!revealEl) return;

        const handleMouseMove = (e) => {
            const rect = revealEl.getBoundingClientRect();
            const startX = e.clientX - rect.left;
            const startY = e.clientY - rect.top;

            // Construct Mask (Hole) - Irregular Blob Shape
            // Black = Visible (Will), Transparent = Hidden (Background)
            const maskGradients = blobs.map(blob => {
                const x = startX + blob.dx;
                const y = startY + blob.dy;
                const r = blob.r;
                // Soft edge for organic feel
                return `radial-gradient(circle ${r}px at ${x}px ${y}px, black 40%, transparent 65%)`;
            }).join(', ');

            revealEl.style.maskImage = maskGradients;
            revealEl.style.WebkitMaskImage = maskGradients;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="about-hero" id="about" style={{ position: 'relative', isolation: 'isolate' }}>
            {/* Bottom Layer (v1.webp) - Background */}
            <div
                className="about-bg-base"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    backgroundImage: `url(${import.meta.env.BASE_URL}v1.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)'
                }}
            ></div>

            {/* Top Layer (will1.webp) - Revealed by Flashlight/Burn */}
            <div
                className="reveal-overlay"
                ref={revealRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    backgroundImage: `url(${import.meta.env.BASE_URL}will1.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.1) brightness(1.1)',
                    mixBlendMode: 'normal',
                    /* Initial hidden state */
                    maskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%, transparent 100%)',
                    willChange: 'mask-image',
                    touchAction: 'none'
                }}
            ></div>

            {/* Content */}
            <div className="about-hero-content" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                <div className="about-left">
                    <h1 className="st-title">
                        STRANGER<br />TECH
                    </h1>
                    <p className="st-desc" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        Hawkins is Calling. Will You Answer? The Gate has been opened. The Mind Flayer is in the network.
                        And Vecna is watching. We're assembling the ultimate "Party" of tech-wizards to decode the signals,
                        hack the Russian base, and close the rift before Hawkins—and our servers—are consumed forever.
                    </p>
                </div>

                <div className="about-right">
                    <h1 className="st-title-right">A Technical Saga</h1>
                    <p className="st-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        This isn't just a coding competition; it's a battle for survival. 5 Seasons. 5 Rounds. One ultimate
                        Party to close the gate. Presented by CSI Student Chapter, SIT Nagpur.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;


import React, { forwardRef } from 'react';

const Hero = forwardRef((props, ref) => {
    return (
        <section className="hero-section section" id="hero" ref={ref}>
            <div className="hero-content">
                <h1 className="hero-title fade-in">ENTHUSIA 5.0</h1>
            </div>

            <div className="scroll-indicator">
                <span>Scroll</span>
                <div className="line"></div>
            </div>
        </section>
    );
});

export default Hero;

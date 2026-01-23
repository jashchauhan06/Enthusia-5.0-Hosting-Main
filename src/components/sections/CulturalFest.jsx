
import React, { forwardRef } from 'react';

const CulturalFest = forwardRef((props, ref) => {
    return (
        <section className="cultural-section section" id="cultural" ref={ref}>
            <div className="city-skyline"></div>
            <h2 className="section-title pink fade-in">CULTURAL FEST</h2>
            <p className="section-description fade-in">
                Express. Perform. Celebrate.<br />
                When the sun sets, the fest transforms.
            </p>
            <div className="event-info fade-in">
                <div className="event-info-item">
                    <div className="event-info-label">Date</div>
                    <div className="event-info-value">February 26th - 28th, 2026</div>
                </div>
                <div className="event-info-item">
                    <div className="event-info-label">Venue</div>
                    <div className="event-info-value">Open Air Theatre</div>
                </div>
                <div className="event-info-item">
                    <div className="event-info-label">Events</div>
                    <div className="event-info-value">5+ Performances</div>
                </div>
            </div>
        </section>
    );
});

export default CulturalFest;

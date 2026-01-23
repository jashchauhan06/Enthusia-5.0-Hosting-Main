import React, { forwardRef } from 'react';
import { MapPin } from 'lucide-react';

const TechFestIntro = forwardRef((props, ref) => {
    return (
        <section className="techfest-section section techfest-star-section" id="techfest" ref={ref}>
            <div className="city-skyline"></div>
            <h2 className="section-title purple fade-in">TECHFEST</h2>
            <p className="section-description fade-in">
                Innovate. Create. Compete.<br />
                Where technology meets imagination.
            </p>
            <div className="event-info fade-in">
                <div className="event-info-item">
                    <div className="event-info-label">Date</div>
                    <div className="event-info-value">February 26th - 28th, 2026</div>
                </div>
                <div className="event-info-item">
                    <div className="event-info-label">Venue</div>
                    <a
                        href="https://maps.app.goo.gl/g3XdmfGPfmLLG2BS7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-button"
                    >
                        <MapPin size={18} />
                        <span>SIT Nagpur Campus</span>
                    </a>
                </div>
                <div className="event-info-item">
                    <div className="event-info-label">Events</div>
                    <div className="event-info-value">7+ Competitions</div>
                </div>
            </div>
        </section>
    );
});

export default TechFestIntro;

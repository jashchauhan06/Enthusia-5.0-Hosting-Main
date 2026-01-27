import React from 'react';
import Navbar from './Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import WhatWeProvide from '../sections/WhatWeProvide';
import EventHighlights from '../sections/EventHighlights';
import Sponsors from '../sections/Sponsors';
import OurTeam from '../sections/OurTeam';
import GetInTouch from '../sections/GetInTouch';

const MobileView = () => {
    // Map navbar indices to section IDs
    const sectionIds = [
        'hero',
        'about',
        'what-we-provide',
        'event-highlights',
        'sponsors',
        'our-team',
        'get-in-touch'
    ];

    const scrollToSection = (index) => {
        const id = sectionIds[index];
        if (id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div id="mobile-view-container" className="fixed inset-0 w-full h-full bg-[#050505] overflow-y-auto overflow-x-hidden z-[999]">
            <Navbar currentSection={-1} onNavigate={scrollToSection} />

            <div className="flex flex-col w-full">
                <Hero />
                <About />
                <WhatWeProvide />
                <EventHighlights />
                <Sponsors />
                <OurTeam />
                <GetInTouch />
            </div>
        </div>
    );
};

export default MobileView;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Team = () => {
    const teamRef = useRef(null);

    useEffect(() => {
        const teamSection = teamRef.current;
        if (!teamSection) return;

        // Stagger animation for team members
        const teamMembers = teamSection.querySelectorAll('.gsap-team');

        ScrollTrigger.create({
            trigger: teamSection,
            start: 'top 60%',
            onEnter: () => {
                gsap.fromTo(teamMembers,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out'
                    }
                );
            },
            once: true
        });
    }, []);

    const teamMembers = [
        { name: 'Sunidhi Haware', role: 'President (SRC)', image: `${import.meta.env.BASE_URL}Team/Sunidhi.webp` },
        { name: 'Prathmesh Raipurkar', role: 'Vice-President (SRC)', image: `${import.meta.env.BASE_URL}Team/Prathmesh.webp` },
        { name: 'Mahek Patel', role: 'Event Lead', image: `${import.meta.env.BASE_URL}Team/Mahek.webp` },
        { name: 'Jash Chauhan', role: 'Web Development Team Lead', image: `${import.meta.env.BASE_URL}Team/Jash.webp` },
        { name: 'Aswin Binu', role: 'Web Developer', image: `${import.meta.env.BASE_URL}Team/Aswin.webp` },
        { name: 'Sahil Mahure', role: 'Web Developer', image: `${import.meta.env.BASE_URL}Team/Sahil.webp` },
        { name: 'Pradum Meshram', role: 'Web Developer', image: `${import.meta.env.BASE_URL}Team/Pradum.webp` },
        { name: 'Anish', role: 'Team Member', image: `${import.meta.env.BASE_URL}Team/Anish.webp` },
        { name: 'Om Rai', role: 'Web Developer', image: `${import.meta.env.BASE_URL}Team/OmRai.webp` },
        { name: 'Saksham Wadhankar', role: 'Web Developer', image: `${import.meta.env.BASE_URL}Team/SakshamWadhankar.webp` }
    ];

    return (
        <section className="team-section" id="team" ref={teamRef}>
            <div className="section-header">
                <span className="section-tag">SEC. 006</span>
                <h2 className="section-title gsap-title">Our Team</h2>
                <p className="section-subtitle gsap-fade">The people behind the Upside Down Challenge</p>
            </div>

            <div className="team-container">
                <div className="team-grid team-grid-5">
                    {teamMembers.map((member, index) => (
                        <div className="team-member gsap-team" data-index={index + 1} key={index}>
                            <div className="member-card">
                                <div className="member-image">
                                    <img src={member.image} alt={member.name} className="member-photo" loading="lazy" />
                                    <div className="member-glow"></div>
                                </div>
                                <div className="member-info">
                                    <h3 className="member-name">{member.name}</h3>
                                    <span className="member-role">{member.role}</span>
                                </div>
                                <div className="member-lights">
                                    <span className="m-light"></span>
                                    <span className="m-light"></span>
                                    <span className="m-light"></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upside Down vines decoration */}
            <div className="team-vines">
                <div className="t-vine t-vine-1"></div>
                <div className="t-vine t-vine-2"></div>
                <div className="t-vine t-vine-3"></div>
            </div>
        </section>
    );
};

export default Team;

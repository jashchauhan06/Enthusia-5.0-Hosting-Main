import React, { useEffect, useRef } from 'react';
import './TeamCarousel.css';

const TeamCarousel = ({ items, onItemClick }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Adjust speed as needed

        const animate = () => {
            scrollPosition += scrollSpeed;
            
            // Reset position when we've scrolled past all items
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            if (scrollPosition >= maxScroll) {
                scrollPosition = 0;
            }
            
            scrollContainer.scrollLeft = scrollPosition;
            animationId = requestAnimationFrame(animate);
        };

        // Start animation
        animationId = requestAnimationFrame(animate);

        // Pause on hover
        const handleMouseEnter = () => {
            cancelAnimationFrame(animationId);
        };

        const handleMouseLeave = () => {
            animationId = requestAnimationFrame(animate);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const handleCardClick = (item) => {
        console.log('Card clicked:', item);
        if (item.linkedin && onItemClick) {
            onItemClick(item.linkedin);
        } else if (item.linkedin) {
            window.open(item.linkedin, '_blank', 'noopener,noreferrer');
        }
    };

    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    return (
        <div className="team-carousel">
            <div className="scroll-container" ref={scrollRef}>
                <div className="team-row">
                    {duplicatedItems.map((item, index) => (
                        <div
                            key={`${index}-${item.text}`}
                            className="team-card"
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="card-image">
                                <img 
                                    src={item.image} 
                                    alt={item.text.split('\n')[0]}
                                    onError={(e) => {
                                        e.target.src = '/assets/images/Team/default-avatar.jpg';
                                    }}
                                />
                            </div>
                            <div className="card-text">
                                {item.text.split('\n').map((line, lineIdx) => (
                                    <div key={lineIdx} className={lineIdx === 0 ? 'name' : 'role'}>
                                        {line}
                                    </div>
                                ))}
                            </div>
                            <div className="click-indicator">
                                Click to view LinkedIn
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamCarousel;
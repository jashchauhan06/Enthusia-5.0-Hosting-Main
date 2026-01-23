import React, { useState } from 'react';
import { Linkedin, Github, Instagram, X } from 'lucide-react';

/**
 * TeamCard Component
 * A reusable card component for displaying team member information
 * Supports click-to-open modal with detailed information
 */
const TeamCard = ({ member, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    return (
        <div
            className={`team-card ${member.isHighlighted ? 'team-card--highlighted' : ''}`}
            onClick={() => onClick(member)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(member)}
            aria-label={`View details for ${member.name}`}
        >
            {/* Image Container */}
            <div className="team-card__image-container">
                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="team-card__skeleton" />
                )}
                
                {/* Lazy loaded image */}
                <img
                    src={imageError ? '/team/member_placeholder.png' : member.image}
                    alt={member.name}
                    className={`team-card__image ${imageLoaded ? 'loaded' : ''}`}
                    loading="lazy"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                
                {/* Gradient overlay */}
                <div className="team-card__overlay" />
                
                {/* Highlight badge for core members */}
                {member.isHighlighted && (
                    <div className="team-card__badge">CORE</div>
                )}
            </div>

            {/* Info Section */}
            <div className="team-card__info">
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
            </div>

            {/* Hover glow effect */}
            <div className="team-card__glow" />
        </div>
    );
};

/**
 * TeamModal Component
 * Modal overlay displaying detailed team member information
 */
export const TeamModal = ({ member, isOpen, onClose }) => {
    if (!isOpen || !member) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div
            className="team-modal__backdrop"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="team-modal">
                {/* Close button */}
                <button
                    className="team-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {/* Modal content */}
                <div className="team-modal__content">
                    {/* Image */}
                    <div className="team-modal__image-container">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="team-modal__image"
                            onError={(e) => {
                                e.target.src = '/team/member_placeholder.png';
                            }}
                        />
                        {member.isHighlighted && (
                            <div className="team-modal__badge">CORE COMMITTEE</div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="team-modal__details">
                        <h2 id="modal-title" className="team-modal__name">
                            {member.name}
                        </h2>
                        <span className="team-modal__role">{member.role}</span>
                        
                        {member.description && (
                            <p className="team-modal__description">
                                {member.description}
                            </p>
                        )}

                        {/* Social Links */}
                        {member.socials && Object.keys(member.socials).length > 0 && (
                            <div className="team-modal__socials">
                                {member.socials.linkedin && (
                                    <a
                                        href={member.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-modal__social-link"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {member.socials.github && (
                                    <a
                                        href={member.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-modal__social-link"
                                        aria-label="GitHub"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                {member.socials.instagram && (
                                    <a
                                        href={member.socials.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="team-modal__social-link"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;

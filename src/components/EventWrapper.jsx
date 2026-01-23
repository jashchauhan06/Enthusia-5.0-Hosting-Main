import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function EventWrapper({ src, title, bgColor = '#050505' }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Set document title
        const originalTitle = document.title;
        if (title) {
            document.title = title;
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Cleanup
        return () => {
            document.title = originalTitle;
        };
    }, [title]);

    const handleBack = () => {
        // Navigate back to home with the hash for the events section
        // usage of replace: false allows user to use browser back button to return to the event
        // The ScrollController in the main App will detect the hash and set the active section accordingly
        window.location.href = '/#techfest-events';
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: bgColor,
            zIndex: 9999
        }}>
            {/* Back Button */}
            <button
                onClick={handleBack}
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '20px',
                    zIndex: 10000,
                    padding: '10px 20px',
                    paddingLeft: '15px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(5px)',
                    fontFamily: 'var(--font-heading, sans-serif)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.8rem',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <ArrowLeft size={16} />
                <span>Back to Events</span>
            </button>

            {/* Iframe */}
            <iframe
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: bgColor
                }}
                title={title || 'Event'}
            />
        </div>
    );
}

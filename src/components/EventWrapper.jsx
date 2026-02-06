import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function EventWrapper({ src, title, bgColor = '#050505', allowScroll = false, buttonPosition = 'default', buttonTheme = 'default' }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set document title
        const originalTitle = document.title;
        if (title) {
            document.title = title;
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Hide body scrollbars only if scroll is not allowed
        if (!allowScroll) {
            document.body.style.overflow = 'hidden';
        }

        // Cleanup
        return () => {
            document.title = originalTitle;
            document.body.style.overflow = '';
        };
    }, [title, allowScroll]);

    const handleBack = () => {
        // Navigate back to home with the hash for the events section
        // usage of replace: false allows user to use browser back button to return to the event
        // The ScrollController in the main App will detect the hash and set the active section accordingly
        window.location.href = '/#techfest-events';
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    // Theme configurations
    const themes = {
        default: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(139, 92, 246, 0.5)',
            hoverBg: 'rgba(139, 92, 246, 0.2)',
            hoverBorder: 'rgba(139, 92, 246, 0.8)',
            shadow: 'rgba(139, 92, 246, 0.3)'
        },
        golden: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(212, 175, 55, 0.5)',
            hoverBg: 'rgba(212, 175, 55, 0.2)',
            hoverBorder: 'rgba(212, 175, 55, 0.8)',
            shadow: 'rgba(212, 175, 55, 0.3)'
        },
        red: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(229, 9, 20, 0.5)',
            hoverBg: 'rgba(229, 9, 20, 0.2)',
            hoverBorder: 'rgba(229, 9, 20, 0.8)',
            shadow: 'rgba(229, 9, 20, 0.3)'
        },
        redish: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(220, 38, 127, 0.5)',
            hoverBg: 'rgba(220, 38, 127, 0.2)',
            hoverBorder: 'rgba(220, 38, 127, 0.8)',
            shadow: 'rgba(220, 38, 127, 0.3)'
        },
        beige: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(194, 154, 108, 0.5)',
            hoverBg: 'rgba(194, 154, 108, 0.2)',
            hoverBorder: 'rgba(194, 154, 108, 0.8)',
            shadow: 'rgba(194, 154, 108, 0.3)'
        },
        blue: {
            bg: 'rgba(0, 0, 0, 0.6)',
            border: 'rgba(59, 130, 246, 0.5)',
            hoverBg: 'rgba(59, 130, 246, 0.2)',
            hoverBorder: 'rgba(59, 130, 246, 0.8)',
            shadow: 'rgba(59, 130, 246, 0.3)'
        }
    };

    const currentTheme = themes[buttonTheme] || themes.default;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: bgColor,
            zIndex: 9999,
            overflow: 'hidden',
        }}>
            {/* Hide scrollbar for webkit browsers */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    .event-wrapper::-webkit-scrollbar {
                        display: none;
                    }
                    
                    @keyframes skeleton-pulse {
                        0%, 100% {
                            opacity: 0.6;
                        }
                        50% {
                            opacity: 1;
                        }
                    }
                    
                    .skeleton-loader {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(139, 92, 246, 0.1) 100%);
                        background-size: 200% 100%;
                        animation: skeleton-pulse 2s infinite;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        z-index: 10001;
                    }
                    
                    .skeleton-item {
                        background: rgba(139, 92, 246, 0.2);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        border-radius: 4px;
                        animation: skeleton-pulse 2s infinite;
                    }
                    
                    .skeleton-header {
                        width: 300px;
                        height: 40px;
                    }
                    
                    .skeleton-content {
                        width: 80%;
                        height: 400px;
                    }
                `
            }} />

            {/* Skeleton Loader */}
            {isLoading && (
                <div className="skeleton-loader">
                    <div className="skeleton-item skeleton-header"></div>
                    <div className="skeleton-item skeleton-content"></div>
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={handleBack}
                style={{
                    position: 'absolute',
                    top: buttonPosition === 'lower' ? '100px' : buttonPosition === 'original' ? '20px' : '60px',
                    left: '20px',
                    zIndex: 10000,
                    padding: '10px 20px',
                    paddingLeft: '15px',
                    backgroundColor: currentTheme.bg,
                    border: `1px solid ${currentTheme.border}`,
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
                    e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
                    e.currentTarget.style.borderColor = currentTheme.hoverBorder;
                    e.currentTarget.style.boxShadow = `0 0 15px ${currentTheme.shadow}`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = currentTheme.bg;
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <ArrowLeft size={16} />
                <span>Back to Events</span>
            </button>

            {/* Iframe */}
            <iframe
                src={src}
                className="event-wrapper"
                onLoad={handleIframeLoad}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: bgColor,
                    overflow: allowScroll ? 'auto' : 'hidden',
                    // Hide scrollbar but allow scrolling
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}
                scrolling={allowScroll ? "yes" : "no"}
                seamless="seamless"
                title={title || 'Event'}
            />
        </div>
    );
}

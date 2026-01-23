import React, { useState, useEffect, useCallback } from 'react';
import './GalleryViewer.css';

const GalleryViewer = ({ isOpen, onClose, images, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);

    // Update index when initialIndex changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsLoading(true);
        }
    }, [initialIndex, isOpen]);

    // Handle image loading state
    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Preload adjacent images
    useEffect(() => {
        if (!isOpen || !images || images.length === 0) return;

        const preloadImage = (index) => {
            const img = new Image();
            img.src = images[index];
        };

        const nextIndex = (currentIndex + 1) % images.length;
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        preloadImage(nextIndex);
        preloadImage(prevIndex);

        // Also pre-fetch the one after next to be safe
        preloadImage((nextIndex + 1) % images.length);
    }, [currentIndex, images, isOpen]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        setIsLoading(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images]);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        setIsLoading(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images]);

    // Keyboard support
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handleNext, handlePrev]);

    if (!isOpen || !images || images.length === 0) return null;

    return (
        <div className="gallery-viewer-overlay" onClick={onClose}>
            <button className="gallery-close-btn" onClick={onClose} aria-label="Close gallery">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <button className="gallery-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <button className="gallery-nav-btn next" onClick={handleNext} aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <div className="gallery-viewer-content" onClick={(e) => e.stopPropagation()}>
                <div className="gallery-main-image-container">
                    {isLoading && <div className="gallery-loader"></div>}
                    <img
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        className="gallery-main-image"
                        onLoad={handleImageLoad}
                        style={{ opacity: isLoading ? 0 : 1 }}
                    />
                </div>

                <div className="gallery-counter">
                    {currentIndex + 1} / {images.length}
                </div>

                <div className="gallery-thumbnails">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className={`gallery-thumbnail ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setIsLoading(true);
                                setCurrentIndex(idx);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryViewer;

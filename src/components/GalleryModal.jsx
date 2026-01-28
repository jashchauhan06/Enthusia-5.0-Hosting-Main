import { useState, useCallback, useEffect, memo, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './GalleryModal.css';

// Optimized Image component with preloading
const OptimizedImage = memo(({ src, alt, className, onLoad, onError, style }) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    const handleLoad = useCallback(() => {
        setLoaded(true);
        onLoad?.();
    }, [onLoad]);

    const handleError = useCallback((e) => {
        setLoaded(true);
        onError?.(e);
    }, [onError]);

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`${className} ${loaded ? 'loaded' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            style={style}
            draggable={false}
        />
    );
});

// Thumbnail component - only renders image when in view
const Thumbnail = memo(({ photo, index, isActive, isVisible, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(index);
    }, [index, onClick]);

    return (
        <button
            className={`gallery-modal-v2__thumbnail ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            aria-label={`View photo ${index + 1}`}
            type="button"
        >
            {isVisible ? (
                <img
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <div className="gallery-modal-v2__thumb-placeholder" />
            )}
        </button>
    );
});

// Main Gallery Modal Component - Highly Optimized
const GalleryModal = memo(({ item, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const thumbnailsRef = useRef(null);
    const modalRef = useRef(null);

    const photos = item?.photos || [];
    const totalPhotos = photos.length;

    // Reset state when modal opens with new item
    useEffect(() => {
        if (isOpen && item) {
            setCurrentIndex(0);
            setIsLoading(true);
            setPreloadedImages(new Set());
        }
    }, [isOpen, item?.id]);

    // Preload adjacent images for smoother navigation
    useEffect(() => {
        if (!isOpen || !photos.length) return;

        const toPreload = [
            currentIndex,
            (currentIndex + 1) % totalPhotos,
            (currentIndex - 1 + totalPhotos) % totalPhotos
        ];

        toPreload.forEach((idx) => {
            if (!preloadedImages.has(idx)) {
                const img = new Image();
                img.src = photos[idx];
                img.onload = () => {
                    setPreloadedImages(prev => new Set([...prev, idx]));
                };
            }
        });
    }, [currentIndex, isOpen, photos, totalPhotos, preloadedImages]);

    // Auto-scroll thumbnails to keep current visible
    useEffect(() => {
        if (thumbnailsRef.current && isOpen) {
            const container = thumbnailsRef.current;
            const activeThumb = container.children[currentIndex];
            if (activeThumb) {
                const containerRect = container.getBoundingClientRect();
                const thumbRect = activeThumb.getBoundingClientRect();
                const scrollLeft = thumbRect.left - containerRect.left + container.scrollLeft - (containerRect.width / 2) + (thumbRect.width / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentIndex, isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const goToNext = useCallback(() => {
        setIsLoading(true);
        setCurrentIndex(prev => (prev + 1) % totalPhotos);
    }, [totalPhotos]);

    const goToPrev = useCallback(() => {
        setIsLoading(true);
        setCurrentIndex(prev => (prev - 1 + totalPhotos) % totalPhotos);
    }, [totalPhotos]);

    const handleThumbnailClick = useCallback((index) => {
        if (index !== currentIndex) {
            setIsLoading(true);
            setCurrentIndex(index);
        }
    }, [currentIndex]);

    // Touch gestures for swipe
    const handleTouchStart = useCallback((e) => {
        setTouchStart(e.touches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback((e) => {
        if (touchStart === null) return;

        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        setTouchStart(null);
    }, [touchStart, goToNext, goToPrev]);

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleImageError = useCallback((e) => {
        e.target.src = `https://placehold.co/1200x800/1a1a2e/8b5cf6?text=Photo+${currentIndex + 1}`;
        setIsLoading(false);
    }, [currentIndex]);

    // Calculate visible thumbnail range for virtualization
    const visibleRange = useMemo(() => {
        const buffer = 5;
        return {
            start: Math.max(0, currentIndex - buffer),
            end: Math.min(totalPhotos, currentIndex + buffer + 1)
        };
    }, [currentIndex, totalPhotos]);

    if (!isOpen || !item) return null;

    const modalContent = (
        <div
            className="gallery-modal-v2__backdrop"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} gallery`}
        >
            <div
                ref={modalRef}
                className="gallery-modal-v2"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="gallery-modal-v2__header">
                    <h2 className="gallery-modal-v2__title">{item.title}</h2>
                    <div className="gallery-modal-v2__header-right">
                        <span className="gallery-modal-v2__counter">
                            {currentIndex + 1} / {totalPhotos}
                        </span>
                        <button
                            className="gallery-modal-v2__close"
                            onClick={onClose}
                            aria-label="Close gallery"
                            type="button"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Image Area */}
                <div
                    className="gallery-modal-v2__content"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Navigation Buttons */}
                    <button
                        className="gallery-modal-v2__nav gallery-modal-v2__nav--prev"
                        onClick={goToPrev}
                        aria-label="Previous photo"
                        type="button"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div className="gallery-modal-v2__image-wrapper">
                        {isLoading && (
                            <div className="gallery-modal-v2__loader">
                                <div className="gallery-modal-v2__spinner" />
                            </div>
                        )}
                        <OptimizedImage
                            key={`${item.id}-${currentIndex}`}
                            src={photos[currentIndex]}
                            alt={`${item.title} - Photo ${currentIndex + 1}`}
                            className="gallery-modal-v2__image"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ opacity: isLoading ? 0 : 1 }}
                        />
                    </div>

                    <button
                        className="gallery-modal-v2__nav gallery-modal-v2__nav--next"
                        onClick={goToNext}
                        aria-label="Next photo"
                        type="button"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

                {/* Thumbnails - Virtualized */}
                <div
                    ref={thumbnailsRef}
                    className="gallery-modal-v2__thumbnails"
                >
                    {photos.map((photo, index) => (
                        <Thumbnail
                            key={index}
                            photo={photo}
                            index={index}
                            isActive={index === currentIndex}
                            isVisible={index >= visibleRange.start && index < visibleRange.end}
                            onClick={handleThumbnailClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    // Use portal to render at document root for better z-index handling
    return createPortal(modalContent, document.body);
});

GalleryModal.displayName = 'GalleryModal';

export default GalleryModal;

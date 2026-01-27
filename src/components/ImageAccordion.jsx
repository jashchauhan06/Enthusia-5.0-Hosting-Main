import { useState, useCallback, useEffect, memo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageAccordion.css';

// Gallery data with Enthusia events and their photos
const galleryItems = [
    {
        id: 1,
        title: 'CELEBRITY & DJ NIGHT',
        imageUrl: '/images/dj_images/_MG_0364.webp',
        desc: 'Star-studded performances',
        photos: [
            '/images/dj_images/_MG_0364.webp',
            '/images/dj_images/_MG_0398.webp',
            '/images/dj_images/_MG_0400.webp',
            '/images/dj_images/_MG_0406.webp',
            '/images/dj_images/_MG_0411.webp',
            '/images/dj_images/_MG_0439.webp',
            '/images/dj_images/_MG_0451.webp',
            '/images/dj_images/_MG_0502.webp',
        ]
    },
    {
        id: 2,
        title: 'CULTURAL FEST',
        imageUrl: '/images/cultural_fest/IMG_2878.webp',
        desc: 'Celebrating diversity',
        photos: [
            '/images/cultural_fest/IMG_2775.webp',
            '/images/cultural_fest/IMG_2826.webp',
            '/images/cultural_fest/IMG_2839.webp',
            '/images/cultural_fest/IMG_2849.webp',
            '/images/cultural_fest/IMG_2856.webp',
            '/images/cultural_fest/IMG_2878.webp',
            '/images/cultural_fest/IMG_2911.webp',
        ]
    },
    {
        id: 3,
        title: 'TECHFEST',
        imageUrl: '/images/tech_events/77.png',
        desc: 'Innovation unleashed',
        photos: [
            '/images/tech_events/1.JPG',
            '/images/tech_events/2.JPG',
            '/images/tech_events/3.JPG',
            '/images/tech_events/4.JPG',
            '/images/tech_events/5.JPG',
            '/images/tech_events/11.JPG',
            '/images/tech_events/22.JPG',
            '/images/tech_events/33.jpg',
            '/images/tech_events/55.jpg',
            '/images/tech_events/66.png',
            '/images/tech_events/77.png',
            '/images/tech_events/88.jpg',
            '/images/tech_events/999.webp',
            '/images/tech_events/9991.webp',
            '/images/tech_events/9992.webp',
            '/images/tech_events/9993.webp',
            '/images/tech_events/99994.webp',
        ]
    }
];

// Optimized Gallery Modal Component with lazy loading
const GalleryModal = memo(({ item, isOpen, onClose }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set([0])); // Preload first image

    // Reset when modal opens with new item
    useEffect(() => {
        if (isOpen && item) {
            setCurrentPhotoIndex(0);
            setLoadedImages(new Set([0]));
        }
    }, [isOpen, item]);

    const handleNext = useCallback(() => {
        setCurrentPhotoIndex((prev) => {
            const next = (prev + 1) % item.photos.length;
            // Preload next image
            setLoadedImages(loaded => new Set([...loaded, next, (next + 1) % item.photos.length]));
            return next;
        });
    }, [item]);

    const handlePrev = useCallback(() => {
        setCurrentPhotoIndex((prev) => {
            const next = (prev - 1 + item.photos.length) % item.photos.length;
            // Preload previous image
            setLoadedImages(loaded => new Set([...loaded, next, (next - 1 + item.photos.length) % item.photos.length]));
            return next;
        });
    }, [item]);

    const handleThumbnailClick = useCallback((index) => {
        setCurrentPhotoIndex(index);
        // Preload adjacent images
        setLoadedImages(loaded => new Set([
            ...loaded, 
            index, 
            (index + 1) % item.photos.length,
            (index - 1 + item.photos.length) % item.photos.length
        ]));
    }, [item]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'Escape') onClose();
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev, onClose]);

    if (!isOpen || !item) return null;

    return (
        <div className="gallery-modal-backdrop" onClick={onClose}>
            <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="gallery-modal__close" onClick={onClose} aria-label="Close gallery">
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="gallery-modal__header">
                    <h2 className="gallery-modal__title">{item.title}</h2>
                </div>

                {/* Main Image Display */}
                <div className="gallery-modal__main">
                    <button 
                        className="gallery-modal__nav gallery-modal__nav--prev" 
                        onClick={handlePrev}
                        aria-label="Previous photo"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <div className="gallery-modal__image-container">
                        <img
                            key={currentPhotoIndex}
                            src={item.photos[currentPhotoIndex]}
                            alt={`${item.title} - Photo ${currentPhotoIndex + 1}`}
                            className="gallery-modal__image"
                            loading="eager"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/1200x800/1a1a2e/8b5cf6?text=Photo+${currentPhotoIndex + 1}`;
                            }}
                        />
                    </div>

                    <button 
                        className="gallery-modal__nav gallery-modal__nav--next" 
                        onClick={handleNext}
                        aria-label="Next photo"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Thumbnail Strip - Only render visible thumbnails */}
                <div className="gallery-modal__thumbnails">
                    {item.photos.map((photo, index) => (
                        <div
                            key={index}
                            className={`gallery-modal__thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            {loadedImages.has(index) || Math.abs(index - currentPhotoIndex) <= 2 ? (
                                <img
                                    src={photo}
                                    alt={`Thumbnail ${index + 1}`}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/150x100/1a1a2e/8b5cf6?text=${index + 1}`;
                                    }}
                                />
                            ) : (
                                <div className="gallery-modal__thumbnail-placeholder" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

// Optimized Accordion Item Component
const AccordionItem = memo(({ item, isActive, onMouseEnter, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className={`accordion-item ${isActive ? 'active' : ''}`}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            {/* Skeleton Loader */}
            {!imageLoaded && (
                <div className="accordion-skeleton"></div>
            )}

            {/* Background Image */}
            <img
                src={item.imageUrl}
                alt={item.title}
                className={`accordion-image ${imageLoaded ? 'loaded' : ''}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x450/1a1a2e/8b5cf6?text=' + item.title.replace(/ /g, '+');
                    setImageLoaded(true);
                }}
            />
            {/* Dark overlay */}
            <div className="accordion-overlay"></div>

            {/* Caption Text */}
            <div className={`accordion-caption ${isActive ? 'active' : ''}`}>
                <h3 className="accordion-title">{item.title}</h3>
                {isActive && (
                    <>
                        <p className="accordion-desc">{item.desc}</p>
                        <p className="accordion-click-hint">Click to view gallery</p>
                    </>
                )}
            </div>
        </div>
    );
});

// Main Image Accordion Component
const ImageAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(2); // Default to TECHFEST (index 2)
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleItemHover = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const handleItemClick = useCallback((item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedItem(null), 300);
    }, []);

    return (
        <>
            <div className="image-accordion-container">
                <div className="image-accordion">
                    {galleryItems.map((item, index) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            isActive={index === activeIndex}
                            onMouseEnter={() => handleItemHover(index)}
                            onClick={() => handleItemClick(item)}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <GalleryModal
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ImageAccordion;

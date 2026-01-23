import { useState, useCallback, memo } from 'react';
import GalleryViewer from './GalleryViewer';
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
            '/images/tech_events/4.JPG',
            '/images/tech_events/11.JPG',
            '/images/tech_events/22.JPG',
            '/images/tech_events/33.jpg',
            '/images/tech_events/55.jpg',
            '/images/tech_events/66.png',
            '/images/tech_events/77.png',
            '/images/tech_events/88.jpg',
            '/images/tech_events/9991.webp',
            '/images/tech_events/9992.webp',
        ]
    }
];

// Optimized Accordion Item Component
const AccordionItem = memo(({ item, isActive, onMouseEnter, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className={`accordion-item ${isActive ? 'active' : ''}`}
            onMouseEnter={onMouseEnter}
            onClick={() => onClick(item)}
            style={{ cursor: 'pointer' }}
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
                    <p className="accordion-desc">{item.desc}</p>
                )}
            </div>
        </div>
    );
});

// Main Image Accordion Component
const ImageAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(2); // Default to TECHFEST (index 2)
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);

    const handleItemHover = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const handleItemClick = useCallback((item) => {
        setCurrentImages(item.photos);
        setViewerOpen(true);
    }, []);

    return (
        <div className="image-accordion-container">
            <div className="image-accordion">
                {galleryItems.map((item, index) => (
                    <AccordionItem
                        key={item.id}
                        item={item}
                        isActive={index === activeIndex}
                        onMouseEnter={() => handleItemHover(index)}
                        onClick={handleItemClick}
                    />
                ))}
            </div>

            <GalleryViewer
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                images={currentImages}
            />
        </div>
    );
};

export default ImageAccordion;

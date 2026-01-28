import { useState, useCallback, memo } from 'react';
import './ImageAccordion.css';
import GalleryModal from './GalleryModal';

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
        imageUrl: '/images/tech_events/2.webp',
        desc: 'Innovation unleashed',
        photos: [
            '/images/tech_events/1.webp',
            '/images/tech_events/2.webp',
            '/images/tech_events/3.webp',
            '/images/tech_events/4.webp',
            '/images/tech_events/5.webp',
            '/images/tech_events/11.webp',
            '/images/tech_events/22.webp',
            '/images/tech_events/33.webp',
            '/images/tech_events/55.webp',
            '/images/tech_events/66.webp',
            '/images/tech_events/88.webp',
            '/images/tech_events/999.webp',
            '/images/tech_events/9991.webp',
            '/images/tech_events/9992.webp',
            '/images/tech_events/99994.webp',
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

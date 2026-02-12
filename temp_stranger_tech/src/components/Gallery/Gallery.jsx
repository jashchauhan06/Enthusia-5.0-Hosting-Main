const galleryImages = [
    `${import.meta.env.BASE_URL}gallery/IMG-20250919-WA0115.webp`,
    `${import.meta.env.BASE_URL}gallery/IMG-20250919-WA0116.webp`,
    `${import.meta.env.BASE_URL}gallery/IMG-20250919-WA0117.webp`,
    `${import.meta.env.BASE_URL}gallery/IMG-20250919-WA0123.webp`,
    `${import.meta.env.BASE_URL}gallery/WhatsApp Image 2026-01-12 at 13.21.16.webp`,
    `${import.meta.env.BASE_URL}gallery/WhatsApp Image 2026-01-12 at 13.21.18.webp`
];

const Gallery = () => {
    return (
        <section className="gallery-section" id="gallery">
            <div className="section-header">
                <span className="section-tag">SEC. 004</span>
                <h2 className="section-title">MEMORIES OF HAWKINS</h2>
                <p className="section-subtitle">Glimpses from previous expeditions into the Upside Down</p>
            </div>

            <div className="gallery-scroll-wrapper">
                <div className="gallery-scroll-track">
                    {/* First set of images */}
                    {galleryImages.map((image, index) => (
                        <div className="gallery-scroll-item" key={`first-${index}`}>
                            <img src={image} alt="Event" loading="lazy" />
                        </div>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {galleryImages.map((image, index) => (
                        <div className="gallery-scroll-item" key={`second-${index}`}>
                            <img src={image} alt="Event" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;


import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import ImageAccordion from '../ImageAccordion';

const Gallery = forwardRef((props, ref) => {
    const sectionRef = useRef(null);

    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false,
        isFinished: () => true,
        isAtStart: () => true,
        reset: () => { },
        type: 'GALLERY',
        el: sectionRef.current
    }));

    return (
        <section className="gallery-section section" id="history" ref={sectionRef}>
            <style>{`
                .gallery-section {
                    width: 100%;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 120px 40px 60px 40px;
                    padding-left: 220px;
                    box-sizing: border-box;
                }

                .gallery-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    width: 100%;
                    margin-left: -90px;
                }

                .gallery-title {
                    font-family: var(--font-heading);
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin: 0;
                    text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
                }

                .gallery-subtitle {
                    font-family: var(--font-body);
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 0.5rem;
                }

                .gallery-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    width: 100%;
                    max-width: 1200px;
                }

                @media (max-width: 1200px) {
                    .gallery-section {
                        padding-left: 180px;
                    }
                }

                @media (max-width: 900px) {
                    .gallery-section {
                        padding: 80px 20px 60px 20px;
                    }
                    .gallery-header { 
                        margin-bottom: 1rem;
                        padding-right: 60px;
                        text-align: left;
                        width: 100%;
                    }
                    .gallery-title { font-size: 2rem; }
                }
            `}</style>

            <div className="gallery-header">
                <h2 className="gallery-title">GALLERY</h2>
                <p className="gallery-subtitle">Memories through the years</p>
            </div>

            <div className="gallery-content">
                <ImageAccordion />
            </div>
        </section>
    );
});

export default Gallery;

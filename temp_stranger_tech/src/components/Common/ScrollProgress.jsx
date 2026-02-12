import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
    const progressRef = useRef(null);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            if (progressRef.current) {
                progressRef.current.style.width = scrollPercent + '%';
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return <div className="scroll-progress" id="scrollProgress" ref={progressRef}></div>;
};

export default ScrollProgress;

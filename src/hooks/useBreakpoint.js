import { useState, useEffect } from 'react';

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState('desktop');

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setBreakpoint('mobile');
            } else if (width < 1024) {
                setBreakpoint('tablet');
            } else {
                setBreakpoint('desktop');
            }
        };

        // Set initial breakpoint
        updateBreakpoint();

        // Add resize listener
        window.addEventListener('resize', updateBreakpoint);

        return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return {
        breakpoint,
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop',
    };
}

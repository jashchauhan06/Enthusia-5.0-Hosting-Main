import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });

            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        };

        const handleMouseEnter = () => cursor.classList.add('hover');
        const handleMouseLeave = () => cursor.classList.remove('hover');
        const handleMouseDown = () => cursor.classList.add('click');
        const handleMouseUp = () => cursor.classList.remove('click');

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Add hover class on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .magnetic');
        interactiveElements.forEach(elem => {
            elem.addEventListener('mouseenter', handleMouseEnter);
            elem.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            interactiveElements.forEach(elem => {
                elem.removeEventListener('mouseenter', handleMouseEnter);
                elem.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor" id="cursor" ref={cursorRef}></div>
            <div className="cursor-dot" id="cursorDot" ref={cursorDotRef}></div>
        </>
    );
};

export default CustomCursor;

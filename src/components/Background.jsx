
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Background = ({ images, isLoaded }) => {
    const canvasRef = useRef(null);
    const frameIndexRef = useRef(0);
    const animationFrameRef = useRef(null);

    // Configuration - updated for smoother animation
    const frameCount = Math.ceil(481 / 5); // ~96 frames for smoother motion
    const normalSpeed = 0.2; // Adjusted speed for more frames

    // We might need to expose a way to affect speed via scroll, 
    // but for now let's implement the base loop.
    // In original: frameIndex += normalSpeed + activeScrollSpeed;
    // We'll stick to normalSpeed for now, can add scroll connection later via context or ref.

    const activeScrollSpeedRef = useRef(0);
    const scrollSensitivity = 3; // Balanced sensitivity
    const friction = 0.96; // Balanced friction

    useEffect(() => {
        const handleWheel = (e) => {
            // Allow background to react immediately to inputs for "fast" feel
            activeScrollSpeedRef.current += e.deltaY * 0.005 * scrollSensitivity; // Balanced multiplier

            // Balanced clamp for smooth visual movement
            if (activeScrollSpeedRef.current > 8) activeScrollSpeedRef.current = 8;
            if (activeScrollSpeedRef.current < -8) activeScrollSpeedRef.current = -8;
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    useEffect(() => {
        if (!isLoaded || !images.length) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const renderLoop = () => {
            // Physics logic
            activeScrollSpeedRef.current *= friction;
            if (Math.abs(activeScrollSpeedRef.current) < 0.001) activeScrollSpeedRef.current = 0;

            const step = normalSpeed + activeScrollSpeedRef.current;
            frameIndexRef.current += step;

            // Wrap logic
            if (frameIndexRef.current >= frameCount) frameIndexRef.current = 0;
            else if (frameIndexRef.current < 0) frameIndexRef.current = frameCount - 1;

            // Display
            // frameIndexRef is 0-based index for images array directly?
            // In App.jsx: loadList[i-1] = img. (Count 1 to 481).
            // So images[0] is frame 1.
            let imgIndex = Math.floor(frameIndexRef.current);

            // Safety wrap for array access
            if (imgIndex >= images.length) imgIndex = 0;
            if (imgIndex < 0) imgIndex = images.length - 1;

            const img = images[imgIndex];

            if (img && img.complete && canvas) {
                const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }

            animationFrameRef.current = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isLoaded, images]);

    return (
        <>
            <canvas
                ref={canvasRef}
                id="hero-canvas"
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="film-grain"></div>
            <div className="scanlines"></div>
            <div className="vignette"></div>
        </>
    );
};

export default Background;

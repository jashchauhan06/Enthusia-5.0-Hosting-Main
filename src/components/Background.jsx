import React, { useEffect, useRef } from 'react';

const Background = ({ images, isLoaded }) => {
    const canvasRef = useRef(null);
    const frameIndexRef = useRef(0);
    const animationFrameRef = useRef(null);

    // Configuration - optimized with fewer images
    const frameCount = 48; // Using every 10th frame (480/10)
    const normalSpeed = 0.15; // Adjusted speed for fewer frames

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
        const context = canvas.getContext('2d', { alpha: false }); // Optimization: disable alpha channel for canvas itself

        const resizeCanvas = () => {
            if (!canvas) return;
            // Limit pixel ratio to 1.5 max for performance on high-DPI screens
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            context.scale(dpr, dpr);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const renderLoop = () => {
            // Physics logic
            activeScrollSpeedRef.current *= friction;
            if (Math.abs(activeScrollSpeedRef.current) < 0.001) activeScrollSpeedRef.current = 0;

            const step = normalSpeed + activeScrollSpeedRef.current;
            frameIndexRef.current += step;

            // Wrap logic for infinite loop
            if (frameIndexRef.current >= frameCount) frameIndexRef.current %= frameCount;
            if (frameIndexRef.current < 0) frameIndexRef.current = (frameIndexRef.current % frameCount) + frameCount;

            // DISPLAY LOGIC: Cross-fade Interpolation
            // 1. Calculate indices for the two frames to blend
            const currentFrameFloat = frameIndexRef.current;
            let frameIndex1 = Math.floor(currentFrameFloat);
            let frameIndex2 = (frameIndex1 + 1) % frameCount;
            const blendFactor = currentFrameFloat - frameIndex1; // 0.0 to 1.0

            // Safety check for array bounds
            if (frameIndex1 >= images.length) frameIndex1 = 0;
            if (frameIndex2 >= images.length) frameIndex2 = 0;

            const img1 = images[frameIndex1];
            const img2 = images[frameIndex2];

            if (canvas && img1 && img1.complete && img2 && img2.complete) {
                // Calculate cover dimensions (centered) based on logical size (innerWidth/Height)
                // We draw relative to logical coordinates; context.scale handles the DPR resolution
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                // Use img1 aspect ratio (assuming all images same size)
                const imgRatio = img1.width / img1.height;
                const canvasRatio = canvasWidth / canvasHeight;

                let drawWidth, drawHeight;
                if (canvasRatio > imgRatio) {
                    drawWidth = canvasWidth;
                    drawHeight = canvasWidth / imgRatio;
                } else {
                    drawHeight = canvasHeight;
                    drawWidth = canvasHeight * imgRatio;
                }

                const drawX = (canvasWidth - drawWidth) / 2;
                const drawY = (canvasHeight - drawHeight) / 2;

                // Draw Frame 1 (Base)
                context.globalAlpha = 1;
                context.drawImage(img1, drawX, drawY, drawWidth, drawHeight);

                // Draw Frame 2 (Overlay with opacity)
                if (blendFactor > 0.01) { // Only draw if perceptible
                    context.globalAlpha = blendFactor;
                    context.drawImage(img2, drawX, drawY, drawWidth, drawHeight);
                }
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
                style={{ width: '100%', height: '100%' }}
            />
            <div className="film-grain"></div>
            <div className="scanlines"></div>
            <div className="vignette"></div>
        </>
    );
};

export default Background;

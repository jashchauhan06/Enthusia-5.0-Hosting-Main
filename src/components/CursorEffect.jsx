import React, { useEffect, useRef } from 'react';

const CursorEffect = () => {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const maxPoints = 10; // Reduced from 25 for a shorter, tighter trail

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            // Add new point
            points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
            // remove old points if too many
            if (points.current.length > maxPoints) {
                points.current.shift();
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Filter points
            // Increase age
            points.current.forEach(p => p.age++);
            // Remove too old
            points.current = points.current.filter(p => p.age < maxPoints);

            if (points.current.length < 2) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Draw Trail
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            // Draw shadow/glow first (INTENSE GLOW)
            ctx.beginPath();
            for (let i = 0; i < points.current.length - 1; i++) {
                const p1 = points.current[i];
                const p2 = points.current[i + 1];

                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            // Glow Style
            ctx.shadowBlur = 30; // Increased glow
            ctx.shadowColor = '#06b6d4'; // Cyan glow
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)'; // More opaque for visibility
            ctx.lineWidth = 4; // Thinner trail
            ctx.stroke();

            // Draw core line (Bright White Core)
            ctx.shadowBlur = 0;
            ctx.beginPath();
            for (let i = 0; i < points.current.length - 1; i++) {
                const p1 = points.current[i];
                const p2 = points.current[i + 1];

                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            animationFrameId = requestAnimationFrame(render);
        };

        // Init
        window.addEventListener('resize', updateSize);
        window.addEventListener('mousemove', handleMouseMove);
        updateSize();
        render();

        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999, // Just below the system cursor
                opacity: 0.9
            }}
        />
    );
};

export default CursorEffect;

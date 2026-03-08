import React, { useEffect, useRef } from 'react';
import './InteractiveBackground.css';

export default function InteractiveBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: -100, y: -100 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.8;
                this.baseSize = this.size;
                this.alpha = Math.random() * 0.5 + 0.2;
                this.glowColor = Math.random() > 0.6 ? 'rgba(123, 44, 191,' : (Math.random() > 0.5 ? 'rgba(61, 90, 254,' : 'rgba(240, 171, 252,');
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    this.vx -= dx * force * 0.008;
                    this.vy -= dy * force * 0.008;
                    this.size = this.baseSize * (1 + force * 1.5);
                    this.alpha = Math.min(0.8, this.alpha + force * 0.2);
                } else {
                    this.size = this.baseSize;
                }

                this.vx *= 0.98;
                this.vy *= 0.98;
            }

            draw() {
                // Draw glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = this.glowColor + (this.alpha * 0.3) + ')';
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 200; i++) {
            particles.push(new Particle());
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="ib-container">
            <div className="ib-bg-image" />
            <div className="nebula-layer layer-1" />
            <div className="nebula-layer layer-2" />
            <div className="nebula-layer layer-3" />
            <div className="aurora-layer" />
            <canvas ref={canvasRef} className="ib-canvas" />
        </div>
    );
}

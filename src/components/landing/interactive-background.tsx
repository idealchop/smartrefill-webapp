
'use client';

import { useRef, useEffect } from 'react';

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    const particleCount = 50;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;

      constructor(color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 2.5 + 0.8;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.y -= this.speedY;
        if (this.y < -this.size) {
          this.y = height + this.size;
          this.x = Math.random() * width;
        }
      }
    }

    function init() {
      particles = [];
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      const particleColor = `hsla(${primaryColor.split(' ').join(',')}, 0.7)`;

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleColor));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    
    // Adding a small delay to ensure CSS variables are loaded before the script runs.
    const timer = setTimeout(() => {
        init();
        animate();
    }, 100);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer); // Clean up the timer
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="interactive-background"
      className="absolute top-0 left-0 w-full h-full z-0 opacity-20"
    />
  );
}

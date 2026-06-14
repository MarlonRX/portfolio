"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  orbitAngle: number;
  orbitSpeed: number;
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 35;
    const CONNECTION_DISTANCE = 110;
    const MOUSE_INFLUENCE = 160;
    const ATTRACTION_FORCE = 0.005;
    const ORBITAL_FORCE = 0.004;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function createParticles() {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 1.5 + 1.2,
        alpha: Math.random() * 0.4 + 0.3,
        baseAlpha: Math.random() * 0.4 + 0.3,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.0005,
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // 1. Draw grid / lines background (Subtle 8-bit circuit grid)
      ctx.strokeStyle = "rgba(34, 197, 94, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Update and draw particles (Twinkling squares)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse orbital attraction
        if (mouse.x >= 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE && dist > 0) {
            const force = (1 - dist / MOUSE_INFLUENCE) * ATTRACTION_FORCE;
            p.orbitAngle += p.orbitSpeed + force * 0.5;
            const tangentX = -Math.sin(p.orbitAngle);
            const tangentY = Math.cos(p.orbitAngle);

            const radialX = (dx / dist) * force;
            const radialY = (dy / dist) * force;

            p.vx += radialX + tangentX * ORBITAL_FORCE * force * 20;
            p.vy += radialY + tangentY * ORBITAL_FORCE * force * 20;
          }
        }

        // Float movement
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.992;
        p.vy *= 0.992;

        // Opacity oscillation (twinkle)
        p.alpha = p.baseAlpha + Math.sin(Date.now() * 0.001 + i) * 0.15;

        // Boundary wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw pixelated square
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, p.alpha)})`;
        const size = Math.ceil(p.size);
        ctx.fillRect(Math.round(p.x - size), Math.round(p.y - size), size * 2, size * 2);
      }

      // 3. Draw connections (Retro circuit traces)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.07;
            ctx.beginPath();
            ctx.moveTo(Math.round(p1.x), Math.round(p1.y));
            // Orthogonal retro 90-degree lines
            ctx.lineTo(Math.round(p2.x), Math.round(p1.y));
            ctx.lineTo(Math.round(p2.x), Math.round(p2.y));
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

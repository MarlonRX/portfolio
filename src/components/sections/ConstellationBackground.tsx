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
  const guideRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 40;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INFLUENCE = 180;
    const ATTRACTION_FORCE = 0.02;
    const ORBITAL_FORCE = 0.015;
    const GUIDE_LERP = 0.06;

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
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1 + 1,
        alpha: Math.random() * 0.3 + 0.3,
        baseAlpha: Math.random() * 0.3 + 0.3,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.002,
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const guide = guideRef.current;

      // Update guide star (lerp towards mouse)
      if (mouse.x >= 0) {
        guide.x += (mouse.x - guide.x) * GUIDE_LERP;
        guide.y += (mouse.y - guide.y) * GUIDE_LERP;
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse orbital attraction
        if (mouse.x >= 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE && dist > 0) {
            const force = (1 - dist / MOUSE_INFLUENCE) * ATTRACTION_FORCE;

            // Tangential component for orbital effect
            p.orbitAngle += p.orbitSpeed + force * 0.5;
            const tangentX = -Math.sin(p.orbitAngle);
            const tangentY = Math.cos(p.orbitAngle);

            // Radial attraction towards mouse
            const radialX = (dx / dist) * force;
            const radialY = (dy / dist) * force;

            p.vx += radialX + tangentX * ORBITAL_FORCE * force * 20;
            p.vy += radialY + tangentY * ORBITAL_FORCE * force * 20;
          }
        }

        // Gentle floating (base movement)
        p.x += p.vx;
        p.y += p.vy;

        // Soft damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Subtle alpha breathing
        p.alpha = p.baseAlpha + Math.sin(Date.now() * 0.001 + i) * 0.1;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, p.alpha)})`;
        ctx.fill();
      }

      // Draw connections (ultra subtle)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw guide star
      if (guide.x >= 0) {
        // Outer glow
        ctx.beginPath();
        ctx.arc(guide.x, guide.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(guide.x, guide.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(guide.x, guide.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, 1)";
        ctx.fill();

        // Star spike (vertical)
        ctx.beginPath();
        ctx.moveTo(guide.x, guide.y - 10);
        ctx.lineTo(guide.x, guide.y + 10);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Star spike (horizontal)
        ctx.beginPath();
        ctx.moveTo(guide.x - 10, guide.y);
        ctx.lineTo(guide.x + 10, guide.y);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (guideRef.current.x < 0) {
        guideRef.current = { x: e.clientX, y: e.clientY };
      }
    }

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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

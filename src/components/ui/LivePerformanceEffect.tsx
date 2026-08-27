'use client';

import { useEffect, useRef } from 'react';

export default function StageParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    let centerGrad: CanvasGradient | null = null;
    let cachedW = 0;
    let cachedH = 0;

    // --- Spotlight beams ---
    interface Spotlight {
      angle: number;
      speed: number;
      width: number;
      opacity: number;
      x: number;
      beamGrad?: CanvasGradient;
      sourceGrad?: CanvasGradient;
    }

    const spotlights: Spotlight[] = [
      { angle: -0.3, speed: 0.08, width: 0.15, opacity: 0.06, x: 0.3 },
      { angle: 0.2, speed: -0.06, width: 0.12, opacity: 0.04, x: 0.7 },
      { angle: 0.0, speed: 0.04, width: 0.2, opacity: 0.05, x: 0.5 },
    ];

    // --- Flowing lines (light trails) ---
    interface FlowLine {
      points: { x: number; y: number }[];
      speed: number;
      offset: number;
      amplitude: number;
      wavelength: number;
      opacity: number;
      width: number;
    }

    const flowLines: FlowLine[] = Array.from({ length: isMobile ? 3 : 5 }, (_, i) => ({
      points: [],
      speed: 0.2 + i * 0.15,
      offset: (i / 5) * Math.PI * 2,
      amplitude: 30 + i * 15,
      wavelength: 200 + i * 60,
      opacity: 0.03 + Math.random() * 0.04,
      width: 1 + Math.random() * 2,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      cachedW = canvas.width / dpr;
      cachedH = canvas.height / dpr;
      
      // Pre-calculate gradients that depend on dimensions
      spotlights.forEach(s => {
        const grad = ctx.createLinearGradient(0, 0, 0, cachedH * 1.2);
        grad.addColorStop(0, `hsla(40, 90%, 65%, ${s.opacity})`);
        grad.addColorStop(0.5, `hsla(40, 80%, 50%, ${s.opacity * 0.3})`);
        grad.addColorStop(1, 'transparent');
        s.beamGrad = grad;
        
        const glowRadius = Math.max(cachedW * 0.1, 80); 
        const sourceGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        sourceGrad.addColorStop(0, `hsla(40, 100%, 100%, ${Math.min(s.opacity * 15, 1)})`); 
        sourceGrad.addColorStop(0.05, `hsla(40, 100%, 90%, ${Math.min(s.opacity * 8, 1)})`);
        sourceGrad.addColorStop(0.2, `hsla(40, 90%, 60%, ${s.opacity * 3})`);
        sourceGrad.addColorStop(0.5, `hsla(40, 80%, 40%, ${s.opacity})`);
        sourceGrad.addColorStop(1, 'transparent');
        s.sourceGrad = sourceGrad;
      });
      
      centerGrad = ctx.createRadialGradient(cachedW * 0.5, cachedH * 0.4, 0, cachedW * 0.5, cachedH * 0.4, cachedW * 0.5);
      centerGrad.addColorStop(0, `hsla(40, 90%, 60%, 1)`);
      centerGrad.addColorStop(0.5, `hsla(35, 80%, 50%, 0.3)`);
      centerGrad.addColorStop(1, 'transparent');
    };

    resize();
    window.addEventListener('resize', resize);

    const W = () => cachedW;
    const H = () => cachedH;

    // Visibility tracking — pause render loop when off-screen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    // --- Particle System ---
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number; // 30-50 range for golden amber
      drift: number;
    }

    const particles: Particle[] = [];
    const MAX_PARTICLES = isMobile ? 50 : 120;

    function spawnParticle() {
      if (particles.length >= MAX_PARTICLES) return;
      const w = W();
      const h = H();
      particles.push({
        x: Math.random() * w,
        y: h + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.3 + Math.random() * 0.8),
        life: 0,
        maxLife: 300 + Math.random() * 500,
        size: 1.5 + Math.random() * 3,
        hue: 30 + Math.random() * 20,
        drift: (Math.random() - 0.5) * 0.005,
      });
    }

    // Pre-render particle glow sprite to avoid creating radial gradients every frame
    const particleGlowCanvas = document.createElement('canvas');
    particleGlowCanvas.width = 64;
    particleGlowCanvas.height = 64;
    const pCtx = particleGlowCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, `hsla(40, 90%, 70%, 1)`);
    pGrad.addColorStop(0.4, `hsla(40, 85%, 55%, 0.4)`);
    pGrad.addColorStop(1, `hsla(40, 80%, 40%, 0)`);
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);



    let time = 0;
    let frameId: number;

    function draw() {
      frameId = requestAnimationFrame(draw);

      // Skip rendering when off-screen
      if (!isVisible) return;

      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);

      time += 0.016;

      // --- Draw subtle spotlight beams ---
      spotlights.forEach(s => {
        s.angle += s.speed * 0.016;
        const swing = Math.sin(s.angle) * 0.4;

        ctx.save();
        // Shift origin slightly above the top edge so it originates naturally
        ctx.translate(s.x * w, -10);
        ctx.rotate(swing);

        // 1. Draw the beam
        if (s.beamGrad) {
          ctx.fillStyle = s.beamGrad;
          ctx.beginPath();
          const beamW = w * s.width;
          ctx.moveTo(-beamW * 0.05, 0); // slightly narrower top
          ctx.lineTo(-beamW, h * 1.2);
          ctx.lineTo(beamW, h * 1.2);
          ctx.lineTo(beamW * 0.05, 0);
          ctx.closePath();
          ctx.fill();
        }
        
        // 2. Draw the light source glow (bulb/flare effect)
        if (s.sourceGrad) {
          const glowRadius = Math.max(w * 0.1, 80); 
          ctx.fillStyle = s.sourceGrad;
          ctx.beginPath();
          ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // --- Draw flowing sine-wave light trails ---
      flowLines.forEach(line => {
        ctx.beginPath();
        const segments = 80;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = t * w;
          const y = h * 0.5 +
            Math.sin((t * w) / line.wavelength + time * line.speed + line.offset) * line.amplitude +
            Math.sin((t * w) / (line.wavelength * 0.6) + time * line.speed * 1.3) * line.amplitude * 0.5;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(40, 85%, 60%, ${line.opacity})`;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });

      // --- Spawn & update particles ---
      if (Math.random() < 0.3) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.vy;
        p.vx += p.drift;

        const progress = p.life / p.maxLife;
        // Fade in quickly, linger, fade out
        let alpha: number;
        if (progress < 0.1) alpha = progress / 0.1;
        else if (progress > 0.7) alpha = 1 - ((progress - 0.7) / 0.3);
        else alpha = 1;

        alpha *= 0.6;

        if (p.life >= p.maxLife || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        // Glowing particle using offscreen canvas sprite
        const glowSize = p.size * 4;
        ctx.globalAlpha = alpha;
        ctx.drawImage(particleGlowCanvas, p.x - glowSize, p.y - glowSize, glowSize * 2, glowSize * 2);

        // Core dot
        ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1; // restore alpha
      }

      // --- Central warm glow ---
      if (centerGrad) {
        const pulse = 0.03 + Math.sin(time * 0.5) * 0.01;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1; // restore
      }
    }

    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}

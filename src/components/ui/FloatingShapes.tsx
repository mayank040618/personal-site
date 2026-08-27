'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface FloatingShapesProps {
  className?: string;
  count?: number;
  colors?: string[];
  mouseReactive?: boolean;
}

const DEFAULT_COLORS = [
  'rgba(200, 230, 208, 0.3)',
  'rgba(143, 174, 139, 0.2)',
  'rgba(13, 79, 79, 0.08)',
  'rgba(27, 122, 90, 0.1)',
  'rgba(232, 230, 226, 0.4)',
];

export default function FloatingShapes({
  className = '',
  count = 5,
  colors = DEFAULT_COLORS,
  mouseReactive = true,
}: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const rafPending = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = shapesRef.current.filter(Boolean);

    // Initial floating animations
    shapes.forEach((shape) => {
      const duration = 6 + Math.random() * 4;
      const delay = Math.random() * 2;

      gsap.to(shape, {
        y: `+=${15 + Math.random() * 20}`,
        x: `+=${8 + Math.random() * 15}`,
        rotation: Math.random() * 20 - 10,
        duration,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // Mouse reactive movement — desktop only, RAF-throttled
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (mouseReactive && !isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        if (rafPending.current) return;
        rafPending.current = true;

        requestAnimationFrame(() => {
          rafPending.current = false;
          const mx = (e.clientX / window.innerWidth - 0.5) * 2;
          const my = (e.clientY / window.innerHeight - 0.5) * 2;

          shapes.forEach((shape, i) => {
            const factor = (i + 1) * 6;
            gsap.to(shape, {
              x: `+=${mx * factor}`,
              y: `+=${my * factor}`,
              duration: 1.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseReactive, count]);

  const [shapeDefs, setShapeDefs] = useState<Array<{id: number, size: number, x: number, y: number, color: string, borderRadius: string, blur: number}>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const mobileCount = isMobile ? Math.min(count, 2) : count;
    setShapeDefs(
      Array.from({ length: mobileCount }, (_, i) => ({
        id: i,
        size: 60 + Math.random() * 150,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[i % colors.length],
        borderRadius: Math.random() > 0.5 ? '50%' : `${30 + Math.random() * 20}%`,
        blur: 30 + Math.random() * 20, // Capped at 50px max (was up to 80px)
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]); // Removed colors from dependencies to prevent infinite loop if passed inline

  if (shapeDefs.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {shapeDefs.map((shape) => (
        <div
          key={shape.id}
          ref={(el) => {
            if (el) shapesRef.current[shape.id] = el;
          }}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.color,
            borderRadius: shape.borderRadius,
            filter: `blur(${shape.blur}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

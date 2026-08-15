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
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = shapesRef.current.filter(Boolean);

    // Initial floating animations
    shapes.forEach((shape) => {
      const duration = 6 + Math.random() * 4;
      const delay = Math.random() * 2;

      gsap.to(shape, {
        y: `+=${20 + Math.random() * 30}`,
        x: `+=${10 + Math.random() * 20}`,
        rotation: Math.random() * 30 - 15,
        duration,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // Mouse reactive movement
    if (mouseReactive) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };

        shapes.forEach((shape, i) => {
          const factor = (i + 1) * 8;
          gsap.to(shape, {
            x: `+=${mouseRef.current.x * factor}`,
            y: `+=${mouseRef.current.y * factor}`,
            duration: 1.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseReactive, count]);

  const [shapeDefs, setShapeDefs] = useState<Array<{id: number, size: number, x: number, y: number, color: string, borderRadius: string, blur: number}>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShapeDefs(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 80 + Math.random() * 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[i % colors.length],
        borderRadius: Math.random() > 0.5 ? '50%' : `${30 + Math.random() * 20}%`,
        blur: 40 + Math.random() * 40,
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
          className="absolute will-change-transform"
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

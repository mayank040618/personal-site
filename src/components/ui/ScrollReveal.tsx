'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 0.9,
  stagger = false,
  staggerDelay = 0.1,
  threshold = 0.85,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const targets = stagger ? el.children : [el];

    const animations = getVariantAnimation(variant);

    gsap.set(targets, animations.from);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${threshold * 100}%`,
        toggleActions: 'play none none none',
      },
      delay,
    });

    tl.to(targets, {
      ...animations.to,
      duration,
      ease: 'power3.out',
      stagger: stagger ? staggerDelay : 0,
    });

    return () => {
      tl.kill();
    };
  }, [variant, delay, duration, stagger, staggerDelay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function getVariantAnimation(variant: string) {
  switch (variant) {
    case 'fade-up':
      return {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      };
    case 'fade-in':
      return {
        from: { opacity: 0 },
        to: { opacity: 1 },
      };
    case 'slide-left':
      return {
        from: { opacity: 0, x: 80 },
        to: { opacity: 1, x: 0 },
      };
    case 'slide-right':
      return {
        from: { opacity: 0, x: -80 },
        to: { opacity: 1, x: 0 },
      };
    case 'scale':
      return {
        from: { opacity: 0, scale: 0.85 },
        to: { opacity: 1, scale: 1 },
      };
    case 'blur':
      return {
        from: { opacity: 0, filter: 'blur(12px)', y: 30 },
        to: { opacity: 1, filter: 'blur(0px)', y: 0 },
      };
    default:
      return {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      };
  }
}

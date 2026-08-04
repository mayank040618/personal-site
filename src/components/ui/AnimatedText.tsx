'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'slide-up' | 'fade-in' | 'char-reveal' | 'word-reveal';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'words' | 'chars';
  triggerOnScroll?: boolean;
}

export default function AnimatedText({
  text,
  className = '',
  variant = 'slide-up',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  splitBy = 'words',
  triggerOnScroll = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const el = containerRef.current;
    const elements = el.querySelectorAll('.animated-unit');

    const animationProps = getAnimationProps(variant);

    const tl = gsap.timeline({
      scrollTrigger: triggerOnScroll
        ? {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          }
        : undefined,
      delay,
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    tl.fromTo(elements, animationProps.from, {
      ...animationProps.to,
      stagger,
      duration: animationProps.duration || 0.8,
      ease: animationProps.ease || 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [text, variant, delay, stagger, triggerOnScroll]);

  const units = splitBy === 'chars' ? text.split('') : text.split(' ');

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`${className}`}>
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="animated-unit inline-block overflow-hidden"
          style={{ display: 'inline-block' }}
        >
          <span className="inline-block" style={{ display: 'inline-block' }}>
            {unit}
            {splitBy === 'words' && i < units.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function getAnimationProps(variant: string) {
  switch (variant) {
    case 'slide-up':
      return {
        from: { y: '110%', opacity: 0, rotationX: -15 },
        to: { y: '0%', opacity: 1, rotationX: 0 },
        duration: 1,
        ease: 'power3.out',
      };
    case 'fade-in':
      return {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        duration: 0.8,
        ease: 'power2.out',
      };
    case 'char-reveal':
      return {
        from: { opacity: 0, y: '100%', rotationZ: 5 },
        to: { opacity: 1, y: '0%', rotationZ: 0 },
        duration: 0.6,
        ease: 'back.out(1.7)',
      };
    case 'word-reveal':
      return {
        from: { opacity: 0, y: 40, filter: 'blur(8px)' },
        to: { opacity: 1, y: 0, filter: 'blur(0px)' },
        duration: 0.9,
        ease: 'power3.out',
      };
    default:
      return {
        from: { opacity: 0, y: '110%' },
        to: { opacity: 1, y: '0%' },
        duration: 0.8,
        ease: 'power3.out',
      };
  }
}

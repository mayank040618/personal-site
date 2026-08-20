'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  reveal?: boolean;
  overlay?: boolean;
  overlayText?: string;
  rounded?: boolean;
  aspectRatio?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  parallaxSpeed = 0.2,
  reveal = true,
  overlay = false,
  overlayText,
  rounded = true,
  aspectRatio = '4/3',
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Parallax effect
    gsap.to(imageRef.current, {
      yPercent: parallaxSpeed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Reveal animation
    if (reveal) {
      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    const currContainerRef = containerRef.current;
    const currImageRef = imageRef.current;

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === currContainerRef ||
          st.trigger === currImageRef
        ) {
          st.kill();
        }
      });
    };
  }, [parallaxSpeed, reveal]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${rounded ? 'rounded-2xl' : ''} ${className}`}
      style={{ aspectRatio }}
    >
      <div ref={imageRef} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/20 to-transparent flex items-end p-8">
          {overlayText && (
            <p className="text-white text-body-lg font-medium">{overlayText}</p>
          )}
        </div>
      )}
    </div>
  );
}

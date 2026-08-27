'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label?: string;
  decimals?: number;
  compact?: boolean;
}

export default function Counter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  label,
  decimals = 0,
  compact = false,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(obj.val);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl lg:text-6xl font-display gradient-text font-bold leading-none">
        {prefix}
        {compact
          ? Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: decimals }).format(Math.floor(count))
          : decimals > 0
          ? count.toFixed(decimals)
          : Math.floor(count).toLocaleString()}
        {suffix}
      </div>
      {label && (
        <div className="text-caption text-graphite mt-3">{label}</div>
      )}
    </div>
  );
}

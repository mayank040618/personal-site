'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  magneticStrength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  magneticStrength = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafPending = useRef(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isTouchDevice.current) return;
    if (rafPending.current) return;
    rafPending.current = true;

    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * magneticStrength;
      const y = (e.clientY - rect.top - rect.height / 2) * magneticStrength;
      setPosition({ x, y });
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const variantStyles: Record<string, string> = {
    primary:
      'bg-forest text-white hover:bg-charcoal border-transparent shadow-md hover:shadow-[0_8px_20px_rgba(26,60,52,0.3)] transition-all duration-300',
    secondary:
      'bg-soft-mint text-deep-teal hover:bg-sage border-transparent transition-all duration-300',
    ghost:
      'bg-transparent text-deep-teal hover:bg-soft-mint/30 border-transparent transition-all duration-300',
    outline:
      'bg-transparent text-charcoal border-[0.5px] border-charcoal/20 hover:border-emerald hover:bg-emerald/5 hover:text-emerald font-normal transition-all duration-300',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4.5 text-lg',
  };

  const baseStyles = `
    group relative inline-flex items-center justify-center gap-2
    rounded-full border font-medium
    cursor-pointer select-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: isHovered ? position.y - 3 : position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MotionComponent>
  );
}

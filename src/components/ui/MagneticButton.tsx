'use client';

import { useRef, useState } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * magneticStrength;
    const y = (e.clientY - rect.top - rect.height / 2) * magneticStrength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles: Record<string, string> = {
    primary:
      'bg-forest text-white hover:bg-deep-teal border-transparent shadow-md hover:shadow-[0_0_20px_rgba(42,92,86,0.4)]',
    secondary:
      'bg-soft-mint text-deep-teal hover:bg-sage border-transparent',
    ghost:
      'bg-transparent text-deep-teal hover:bg-soft-mint/30 border-transparent',
    outline:
      'bg-transparent text-charcoal/80 border-[0.5px] border-charcoal/20 hover:border-charcoal/50 hover:bg-charcoal/5 font-normal',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4.5 text-lg',
  };

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    rounded-full border font-medium
    transition-colors duration-300
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
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
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
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 bg-emerald"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </MotionComponent>
  );
}

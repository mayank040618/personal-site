'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined' | 'elevated';
  hover3D?: boolean;
  href?: string;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover3D = true,
  href,
  onClick,
  padding = 'md',
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hover3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const variantStyles: Record<string, string> = {
    default: 'bg-white border border-mist shadow-md hover:shadow-xl',
    glass: 'glass',
    outlined: 'bg-transparent border border-mist hover:border-sage',
    elevated: 'bg-white shadow-lg hover:shadow-xl border-0',
  };

  const paddingStyles: Record<string, string> = {
    sm: 'p-5',
    md: 'p-7',
    lg: 'p-10',
  };

  const Component = href ? 'a' : 'div';

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden
        transition-shadow duration-500
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${onClick || href ? 'cursor-pointer' : ''}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: hover3D ? rotateX : 0,
        rotateY: hover3D ? rotateY : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      {children}
      {hover3D && variant !== 'glass' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(200, 230, 208, 0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

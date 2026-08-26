'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypingTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;       // ms before animation starts
  speed?: number;       // ms delay between each character
  showCursor?: boolean; // Kept for compatibility, though a smooth fade doesn't typically use a block cursor
}

export default function TypingText({
  text,
  className = '',
  tag: Tag = 'h1',
  delay = 0,
  speed = 40,
  showCursor = false, 
}: TypingTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });

  // Use framer-motion's dynamic component creation
  const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: speed / 1000, // Convert ms to seconds for stagger
        delayChildren: delay / 1000 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
      filter: "blur(4px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      ref={containerRef as any}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split('\n').map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block">
          {line.split(' ').map((word, wordIndex) => (
            <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split('').map((char, charIndex) => (
                <motion.span variants={child} key={`char-${charIndex}`} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;       // ms before typing starts
  speed?: number;       // ms per character
  showCursor?: boolean;
}

export default function TypingText({
  text,
  className = '',
  tag: Tag = 'h1',
  delay = 0,
  speed = 70,
  showCursor = true,
}: TypingTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Wait for initial delay, then start typing
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  // Type characters one by one
  useEffect(() => {
    if (!started) return;

    intervalRef.current = setInterval(() => {
      setDisplayedCount((prev) => {
        if (prev >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, text, speed]);

  // Blink cursor
  useEffect(() => {
    if (!showCursor) return;
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blink);
  }, [showCursor]);

  const isComplete = displayedCount >= text.length;
  const displayed = text.slice(0, displayedCount);

  // Split by newlines for proper block rendering
  const lines = displayed.split('\n');
  // Also figure out total lines in the full text to reserve space
  const allLines = text.split('\n');

  return (
    <Tag className={className}>
      {allLines.map((fullLine, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block" style={{ minHeight: '1.1em' }}>
          {lines[lineIndex] || ''}
          {/* Show cursor only after typing has started */}
          {showCursor && started && !isComplete && lineIndex === lines.length - 1 && (
            <span
              className="inline-block ml-0.5 align-baseline"
              style={{
                width: '3px',
                height: '0.85em',
                background: 'currentColor',
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.1s',
                verticalAlign: 'baseline',
                marginBottom: '-0.05em',
              }}
            />
          )}
        </span>
      ))}
    </Tag>
  );
}

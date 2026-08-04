'use client';

import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  alignment = 'left',
  className = '',
  titleClassName = '',
  light = false,
}: SectionHeadingProps) {
  const alignClass = alignment === 'center' ? 'text-center mx-auto' : '';
  const maxWidth = alignment === 'center' ? 'max-w-3xl' : 'max-w-2xl';

  return (
    <div className={`${alignClass} ${maxWidth} ${className}`}>
      {eyebrow && (
        <ScrollReveal variant="fade-up">
          <span
            className={`text-eyebrow block mb-4 ${
              light ? 'text-soft-mint' : 'text-emerald'
            }`}
          >
            {eyebrow}
          </span>
        </ScrollReveal>
      )}
      <AnimatedText
        text={title}
        className={`text-heading font-display ${
          light ? 'text-white' : 'text-charcoal'
        } ${titleClassName}`}
        variant="slide-up"
        tag="h2"
      />
      {subtitle && (
        <ScrollReveal variant="fade-up" delay={0.3}>
          <p
            className={`text-body-lg mt-6 ${
              light ? 'text-white/70' : 'text-graphite'
            }`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

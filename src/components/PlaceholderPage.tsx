'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import FloatingShapes from '@/components/ui/FloatingShapes';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  gradient?: string;
}

export default function PlaceholderPage({
  eyebrow,
  title,
  subtitle,
  gradient = 'from-deep-teal to-emerald',
}: PlaceholderPageProps) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--warm-white) 0%, var(--off-white) 50%, var(--soft-ivory) 100%)',
      }}
    >
      <FloatingShapes count={4} />

      <div className="container-editorial relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.span
            className="text-eyebrow block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {eyebrow}
          </motion.span>

          <AnimatedText
            text={title}
            className="text-hero font-display text-charcoal mb-6"
            variant="slide-up"
            tag="h1"
            delay={0.4}
          />

          <motion.p
            className="text-body-lg text-graphite max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <MagneticButton variant="primary" href="/contact">
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="outline" href="/">
              Back to Home
            </MagneticButton>
          </motion.div>
        </div>

        {/* Decorative element */}
        <motion.div
          className={`absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${gradient} opacity-[0.07] blur-[60px] pointer-events-none hidden lg:block`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.07 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </section>
  );
}

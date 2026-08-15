'use client';

import { useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

export type LiquidPhase = 'idle' | 'pouring' | 'filled' | 'draining' | 'done';

interface LiquidPourEffectProps {
  onPhaseChange?: (phase: LiquidPhase) => void;
  delay?: number;
}

export default function LiquidPourEffect({
  onPhaseChange,
  delay = 0.8,
}: LiquidPourEffectProps) {
  const controls = useAnimationControls();

  const runSequence = useCallback(async () => {
    await new Promise((r) => setTimeout(r, delay * 1000));

    onPhaseChange?.('pouring');

    // Pour in — slide the liquid slab down into view
    await controls.start({
      y: '0%',
      transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] },
    });

    onPhaseChange?.('filled');

    // Hold so the viewer sees the inverted colours
    await new Promise((r) => setTimeout(r, 1000));

    onPhaseChange?.('draining');

    // Drain — slide the slab further down and out
    await controls.start({
      y: '200%',
      transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] },
    });

    onPhaseChange?.('done');
  }, [controls, delay, onPhaseChange]);

  useEffect(() => {
    runSequence();
  }, [runSequence]);

  return (
    <motion.div
      initial={{ y: '-200%' }}
      animate={controls}
      className="absolute left-0 w-full pointer-events-none"
      style={{ zIndex: 5, top: 0, height: '100%' }}
    >
      {/* ── Top wavy edge (visible while draining) ── */}
      <svg
        className="absolute top-0 left-0 w-full"
        style={{ transform: 'translateY(-99%)' }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,100 C180,20 360,80 540,40 C720,0 900,60 1080,30 C1260,0 1380,70 1440,100 L1440,100 L0,100 Z"
          fill="#0d503f"
        />
      </svg>

      {/* ── Solid teal body ── */}
      <div className="w-full h-full" style={{ background: '#0d503f' }} />

      {/* ── Bottom wavy edge (visible while pouring) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ transform: 'translateY(99%)' }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,0 C180,80 360,20 540,60 C720,100 900,40 1080,70 C1260,100 1380,30 1440,0 L1440,0 L0,0 Z"
          fill="#0d503f"
        />
      </svg>
    </motion.div>
  );
}

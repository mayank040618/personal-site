'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Initial check
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[40] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-charcoal/90 backdrop-blur-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/10 hover:border-deep-teal transition-colors focus:outline-none group overflow-hidden"
          aria-label="Back to top"
        >
          {/* Subtle magnetic hover effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-deep-teal to-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

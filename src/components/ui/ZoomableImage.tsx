'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ZoomableImageProps extends ImageProps {
  alt: string;
}

export default function ZoomableImage({ alt, className, ...props }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={24} />
          </button>

          {/* Expanded Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image 
                alt={alt} 
                {...props} 
                fill 
                className="object-contain" 
                sizes="100vw"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Standard Image (acts as trigger) */}
      <div 
        className="cursor-zoom-in absolute inset-0 overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <Image 
          alt={alt} 
          className={`transition-all duration-700 ease-out hover:scale-105 hover:brightness-105 ${className || ''}`} 
          {...props} 
        />
      </div>

      {/* Fullscreen Overlay using Portal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}

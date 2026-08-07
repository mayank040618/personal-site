'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
  { label: 'Theatre in Education', href: '/theatre-in-education' },
  { label: 'Training Programs', href: '/training' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'HOPE', href: '/hope' },
  { label: 'Stage4You', href: '/stage4you' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Media', href: '/media' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
];

const menuVariants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 40,
    },
  },
  open: {
    clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.06,
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  }),
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Fixed Navbar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'py-2 lg:py-3 bg-white/75 backdrop-blur-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-charcoal/5'
            : 'py-5 lg:py-8 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="container-editorial flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-[110] flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-deep-teal flex items-center justify-center text-white font-display font-bold text-sm group-hover:scale-105 group-hover:bg-forest transition-all duration-500 overflow-hidden relative">
              <Image 
                src="/images/prabhat-hero-new.jpg" 
                alt="Prabhat Singh"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display font-semibold text-charcoal text-lg tracking-tight hidden sm:block transition-colors group-hover:text-forest">
              Prabhat Singh
            </span>
          </Link>

          {/* Desktop Navigation (compact) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative group py-1.5 ${
                  pathname === link.href
                    ? 'text-deep-teal'
                    : 'text-graphite hover:text-charcoal'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-deep-teal rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
                  />
                )}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-deep-teal/30 rounded-full transition-all duration-500 ease-out w-0 group-hover:w-full ${
                    pathname === link.href ? 'hidden' : ''
                  }`}
                />
              </Link>
            ))}
            <button
              className="text-sm font-medium text-graphite hover:text-charcoal transition-colors"
              onClick={() => setIsOpen(true)}
            >
              More +
            </button>
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] w-10 h-10 flex items-center justify-center lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-4">
              <motion.span
                className="absolute left-0 w-full h-[1.5px] bg-charcoal origin-center"
                animate={{
                  top: isOpen ? '50%' : '0%',
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 w-full h-[1.5px] bg-charcoal -translate-y-1/2"
                animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-[1.5px] bg-charcoal origin-center"
                animate={{
                  bottom: isOpen ? '50%' : '0%',
                  top: isOpen ? '50%' : 'auto',
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          </button>

          {/* Desktop "All Pages" button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-graphite hover:text-charcoal transition-colors relative z-[110]"
            aria-label={isOpen ? 'Close menu' : 'Open full menu'}
          >
            <div className="relative w-5 h-3.5">
              <motion.span
                className="absolute left-0 w-full h-[1.5px] bg-current origin-center"
                animate={{
                  top: isOpen ? '50%' : '0%',
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
              <motion.span
                className="absolute left-0 bottom-0 w-3/4 h-[1.5px] bg-current origin-center"
                animate={{
                  bottom: isOpen ? '50%' : '0%',
                  top: isOpen ? '50%' : 'auto',
                  width: isOpen ? '100%' : '75%',
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[105] bg-off-white"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="h-full flex flex-col justify-center container-editorial">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 max-w-4xl">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      className={`block py-2 text-2xl sm:text-3xl md:text-4xl font-display font-semibold transition-colors duration-300 ${
                        pathname === link.href
                          ? 'text-deep-teal'
                          : 'text-charcoal/40 hover:text-charcoal'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-xs font-mono text-silver font-normal">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Contact info at bottom */}
              <motion.div
                className="mt-16 flex flex-col sm:flex-row gap-6 text-sm text-graphite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <a
                  href="mailto:hello@prabhatsingh.com"
                  className="hover:text-deep-teal transition-colors"
                >
                  hello@prabhatsingh.com
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-deep-teal transition-colors"
                >
                  LinkedIn ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { num: '01', title: 'THE MAN', desc: 'The story behind the mission.', href: '/about' },
  { num: '02', title: 'THE JOURNEY', desc: 'Milestones and evolution.', href: '/journey' },
  { num: '03', title: 'THEATRE', desc: 'Learning through performance.', href: '/theatre-in-education' },
  { num: '04', title: 'TRAINING', desc: 'Corporate and academic excellence.', href: '/training' },
  { num: '05', title: 'SPEAKING', desc: 'TEDx, keynotes and panels.', href: '/speaking' },
  { num: '06', title: 'IMPACT', desc: '100,000 lives transformed.', href: '/testimonials' },
];

function getFallbackChapter(pathname: string) {
  if (pathname.includes('/about')) return { num: '01', title: 'THE MAN' };
  if (pathname.includes('/journey')) return { num: '02', title: 'THE JOURNEY' };
  if (pathname.includes('/theatre')) return { num: '03', title: 'THEATRE' };
  if (pathname.includes('/training')) return { num: '04', title: 'TRAINING' };
  if (pathname.includes('/speaking')) return { num: '05', title: 'SPEAKING' };
  if (pathname.includes('/testimonials') || pathname.includes('/gallery')) return { num: '06', title: 'IMPACT' };
  return { num: '01', title: 'THE MAN' }; // default for root
}

function LiquidInkLayer({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? '0%' : '-100%' }}
      transition={{ delay: isOpen ? 0.3 : 0, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    >
      <div className="w-full h-full bg-[#0a0a0a]" />
      {/* Wavy edge sliding down */}
      <svg
        className="absolute bottom-0 left-0 w-full translate-y-[99%] text-[#0a0a0a]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ height: '80px' }}
      >
        <path d="M0,0 C180,80 360,20 540,60 C720,100 900,40 1080,70 C1260,100 1380,30 1440,0 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPhase, setScrollPhase] = useState<'hero' | 'glass' | 'compact'>('hero');
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const lastScrollY = useRef(0);
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0, x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  const isTouchDevice = useRef(false);

  const fallbackChapter = getFallbackChapter(pathname);
  const [activeChapter, setActiveChapter] = useState(fallbackChapter);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveChapter(getFallbackChapter(pathname));

    // IntersectionObserver to detect both dark sections AND active chapters
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    const chapterSections = document.querySelectorAll('[data-nav-chapter]');
    
    // Observer for dark theme (top 15% of viewport)
    const themeObserver = new IntersectionObserver(
      (entries) => {
        let anyIntersecting = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) anyIntersecting = true;
        });
        setIsDarkTheme(anyIntersecting);
      },
      { rootMargin: '-20px 0px -85% 0px' }
    );
    darkSections.forEach((el) => themeObserver.observe(el));

    // Observer for chapter detection (middle 50% of viewport)
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = entry.target.getAttribute('data-nav-chapter');
            const title = entry.target.getAttribute('data-nav-title');
            if (num && title) {
              setActiveChapter({ num, title });
            }
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );
    chapterSections.forEach((el) => chapterObserver.observe(el));
    
    return () => {
      themeObserver.disconnect();
      chapterObserver.disconnect();
    };
  }, [pathname]);

  // Make sure menu closes on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 20) {
      setScrollPhase('hero');
    } else if (latest >= 20 && latest < 150) {
      setScrollPhase('glass');
    } else {
      setScrollPhase('compact');
    }
    
    if (latest > lastScrollY.current && latest > 50) {
      setIsScrollingUp(false);
    } else if (latest < lastScrollY.current) {
      setIsScrollingUp(true);
    }
    lastScrollY.current = latest;
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!navRef.current || isTouchDevice.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHighlightStyle({ opacity: 1, x, y });
  };
  
  const handlePointerLeave = () => {
    setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  // Dynamic Styles
  const navHeight = scrollPhase === 'hero' ? 72 : (scrollPhase === 'compact' && !isScrollingUp ? 60 : 70);
  
  const navBg = isDarkTheme 
    ? (scrollPhase === 'hero' ? 'rgba(20,22,20,0.05)' : 'rgba(25,28,26,0.72)')
    : (scrollPhase === 'hero' ? 'rgba(250,249,246,0.18)' : 'rgba(250,249,246,0.76)');
    
  const navBlur = scrollPhase === 'hero' ? 'blur(8px)' : 'blur(24px) saturate(145%)';
  
  const navBorder = isDarkTheme
    ? (scrollPhase === 'hero' ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.06)')
    : (scrollPhase === 'hero' ? 'rgba(17,17,17,0)' : 'rgba(17,17,17,0.06)');
    
  const navShadow = isDarkTheme
    ? (scrollPhase === 'hero' ? '0 0 0 rgba(0,0,0,0)' : '0 8px 35px rgba(0,0,0,0.2)')
    : (scrollPhase === 'hero' ? '0 0 0 rgba(0,0,0,0)' : '0 8px 35px rgba(17,17,17,0.06)');

  const brandTextColor = isDarkTheme ? '#FFFFFF' : 'var(--charcoal)';

  return (
    <>
      <motion.header
        ref={navRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="fixed left-1/2 -translate-x-1/2 z-[100] flex flex-col w-full px-4 lg:px-6 pointer-events-none"
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: scrollPhase === 'hero' ? 16 : 16,
          opacity: 1 
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 100, damping: 20 },
          opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }}
        style={{ maxWidth: '1400px' }}
      >
        <motion.nav
          className="relative flex items-center justify-between w-full mx-auto pointer-events-auto"
          animate={{
            height: navHeight,
            backgroundColor: navBg,
            backdropFilter: navBlur,
            borderColor: navBorder,
            boxShadow: navShadow,
            borderRadius: 20,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ borderStyle: 'solid', borderWidth: '1px' }}
        >
          {/* Subtle Optical Highlight */}
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-[19px] overflow-hidden hidden lg:block"
            animate={{ opacity: scrollPhase !== 'hero' ? 1 : 0 }}
          >
            <div 
              className="absolute inset-0 opacity-[0.15] transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 120px at ${highlightStyle.x}px ${highlightStyle.y}px, rgba(255,255,255,1), transparent 35%)`,
                opacity: highlightStyle.opacity
              }}
            />
          </motion.div>

          {/* Left Brand */}
          <div className="pl-6 md:pl-8 flex-shrink-0 z-10 w-[120px] md:w-[150px]">
            <Link href="/" className="group flex items-center h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-sm">
              <motion.span 
                className="font-display text-[14px] md:text-[15px] tracking-[-0.01em] group-hover:opacity-80 transition-opacity"
                animate={{ color: brandTextColor }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-[600]">PRABHAT</span>{' '}
                <span className="font-[400] hidden sm:inline">SINGH</span>
              </motion.span>
            </Link>
          </div>

          {/* Center Chapter Display */}
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeChapter.title}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center"
              >
                <motion.span 
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-[600]"
                  animate={{ color: isDarkTheme ? 'rgba(255,255,255,0.7)' : '#0F5F59' }}
                  transition={{ duration: 0.3 }}
                >
                  CHAPTER {activeChapter.num}
                </motion.span>
                <motion.span 
                  className="text-[13px] md:text-[14px] font-[500] mt-0.5 tracking-[-0.01em]"
                  animate={{ color: isDarkTheme ? '#FFFFFF' : '#111111' }}
                  transition={{ duration: 0.3 }}
                >
                  {activeChapter.title}
                </motion.span>
                
                {/* Extremely subtle progress line */}
                <div className="w-8 h-[1px] mt-1 relative overflow-hidden" style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(17,17,17,0.1)' }}>
                  <motion.div 
                    className="absolute top-0 left-0 bottom-0 origin-left"
                    style={{ 
                      backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.6)' : '#0F5F59',
                      scaleX: scrollYProgress
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Menu Control */}
          <div className="pr-6 md:pr-8 flex-shrink-0 z-10 w-[120px] md:w-[150px] flex justify-end">
             <button 
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 text-[12px] md:text-[13px] font-[500] hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-teal rounded-sm"
             >
               <motion.span animate={{ color: brandTextColor }} transition={{ duration: 0.3 }}>
                 MENU
               </motion.span>
               <motion.span 
                 animate={{ color: brandTextColor }} 
                 className="text-[14px] font-[400]"
                 transition={{ duration: 0.3 }}
               >
                 +
               </motion.span>
             </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Expanded Cinematic Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col overflow-hidden bg-[rgba(250,249,246,0.92)] backdrop-blur-[30px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.5 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* The Ink layer sliding over the glass */}
            <LiquidInkLayer isOpen={isOpen} />

            {/* Menu Header (Floating over Ink) */}
            <div className="relative z-10 flex items-center justify-between px-8 md:px-12 pt-8 md:pt-10">
              <div className="flex-shrink-0">
                <span className="font-display text-[15px] tracking-[-0.01em] text-white">
                  <span className="font-[600]">PRABHAT</span>{' '}
                  <span className="font-[400]">SINGH</span>
                </span>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-2 text-[13px] font-[500] text-white/80 hover:text-white transition-colors focus:outline-none"
              >
                <span>CLOSE</span>
              </button>
            </div>

            {/* Menu Content */}
            <div className="relative z-10 container-editorial flex-grow flex flex-col justify-center py-12">
              <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-10">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3, delay: (menuItems.length - i) * 0.04 } }}
                    transition={{ delay: 0.7 + (i * 0.08), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col items-start focus:outline-none"
                    >
                      <span className="text-[11px] font-mono text-white/40 mb-2 group-hover:text-deep-teal transition-colors duration-300">
                        {item.num}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl md:text-5xl font-display font-[500] text-white/90 group-hover:text-white group-hover:translate-x-2 transition-transform duration-300">
                          {item.title}
                        </span>
                        <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-deep-teal text-xl">
                          →
                        </span>
                      </div>
                      <span className="text-[13px] text-white/50 mt-3 max-w-xs group-hover:text-white/70 transition-colors">
                        {item.desc}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer / Contact */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="mt-16 md:mt-24 text-center border-t border-white/10 pt-8"
              >
                 <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-3 text-sm md:text-base font-[500] text-white/80 hover:text-deep-teal transition-colors"
                  >
                    START A CONVERSATION
                    <span className="w-1.5 h-1.5 rounded-full bg-deep-teal" />
                  </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown, Users, Award, Building2, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ZoomableImage from '@/components/ui/ZoomableImage';
import FloatingShapes from '@/components/ui/FloatingShapes';
import AnimatedText from '@/components/ui/AnimatedText';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import Card from '@/components/ui/Card';
import MagneticButton from '@/components/ui/MagneticButton';
import SectionHeading from '@/components/ui/SectionHeading';
import { galleryItems } from '@/data/galleryData';

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOME PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <IntroductionSection />

      <TestimonialPreview />
      <GalleryPreview />
      <HopePreview />
      <Stage4YouPreview />
      
      <CTASection />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Mouse-following glow (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = heroRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glowRef.current, {
        x: x - 200,
        y: y - 200,
        duration: 1.5,
        ease: 'power2.out',
      });

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          x: (e.clientX - window.innerWidth / 2) * -0.02,
          y: (e.clientY - window.innerHeight / 2) * -0.02,
          rotationY: (e.clientX - window.innerWidth / 2) * 0.01,
          rotationX: -(e.clientY - window.innerHeight / 2) * 0.01,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
    };

    const currentHeroRef = heroRef.current;
    currentHeroRef.addEventListener('mousemove', handleMouseMove);
    return () => {
      currentHeroRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /* ── Choreography Timings ── */
  const t = {
    eyebrow: 0.6,
    word1: 0.9,      // WE DON'T
    word2: 1.1,       // TEACH
    word3: 1.3,       // COMMUNICATION.
    portrait: 1.5,
    badge1: 2.0,      // TEDx
    badge2: 2.25,     // Community
    badge3: 2.5,      // 15+ Years
    badge4: 2.75,     // Corporate
    word4: 2.4,       // WE CREATE
    word5: 2.6,       // CONFIDENT
    word6: 2.8,       // LEADERS.
    description: 3.2,
    buttons: 3.6,
    scroll: 4.2,
  };

  const wordReveal = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const cardEntrance = (delay: number) => ({
    initial: { opacity: 0, y: 16, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--warm-white) 0%, var(--off-white) 50%, var(--soft-ivory) 100%)',
        }}
        data-nav-chapter="01"
        data-nav-title="THE MAN"
      >
        {/* Floating shapes */}
        <FloatingShapes count={3} />

        {/* Static ambient glow — replaces animated version for performance */}
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(200, 230, 208, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Mouse-following glow */}
        <div
          ref={glowRef}
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(200, 230, 208, 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="container-editorial relative z-10 pt-28 md:pt-48 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-12 items-center">
            {/* Left — Typography */}
            <div className="order-2 lg:order-1 lg:col-span-7 min-w-0 pr-0 lg:pr-4">
              <AnimatedText
                text="Theatre. Communication. Leadership. Human Development."
                className="text-eyebrow block mb-6"
                variant="typewriter"
                tag="span"
                splitBy="chars"
                delay={t.eyebrow}
              />

              {/* First headline */}
              <h1 className="text-hero font-display text-charcoal mb-4">
                <span className="block overflow-hidden w-full pb-2 pr-4 -mb-2">
                  <motion.span className="inline-block pr-4 whitespace-normal max-w-full origin-left" whileHover={{ scale: 1.02, color: 'var(--deep-teal)' }} {...wordReveal(t.word1)}>CONFIDENCE ISN&apos;T TAUGHT.</motion.span>
                </span>
                <span className="block overflow-hidden w-full pb-2 pr-4 -mb-2">
                  <motion.span className="inline-block pr-4 whitespace-normal max-w-full origin-left" whileHover={{ scale: 1.02, color: 'var(--deep-teal)' }} {...wordReveal(t.word2)}>IT&apos;S DISCOVERED.</motion.span>
                </span>
              </h1>

              {/* Second headline */}
              <h1 className="text-hero font-display gradient-text mb-8">
                <span className="block overflow-hidden w-full pb-2 pr-4 -mb-2">
                  <motion.span className="inline-block gradient-text pr-4 whitespace-normal max-w-full origin-left" whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }} {...wordReveal(t.word4)}>COMMUNICATION ISN&apos;T</motion.span>
                </span>
                <span className="block overflow-hidden w-full pb-2 pr-4 -mb-2">
                  <motion.span className="inline-block gradient-text pr-4 whitespace-normal max-w-full origin-left" whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }} {...wordReveal(t.word5)}>MEMORIZED.</motion.span>
                </span>
                <span className="block overflow-hidden w-full pb-2 pr-4 -mb-2">
                  <motion.span className="inline-block gradient-text pr-4 whitespace-normal max-w-full origin-left" whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }} {...wordReveal(t.word6)}>IT&apos;S EXPERIENCED.</motion.span>
                </span>
              </h1>

              <motion.p
                className="text-base md:text-body-lg text-graphite max-w-lg mb-8 md:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: t.description, ease: [0.22, 1, 0.36, 1] }}
              >
                Prabhat Singh Rajput transforms lives through the power of
                theatre, communication training, and purposeful leadership —
                one stage at a time.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: t.buttons, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton variant="primary" size="md" href="/contact">
                  Work with Prabhat
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton variant="outline" size="md" href="/about">
                  Explore the Journey
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right — Photo Area */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative min-w-0">
              {/* Soft radial glow behind portrait */}
              <div className="absolute inset-0 -z-10 scale-110" style={{
                background: 'radial-gradient(ellipse at center, rgba(200, 230, 208, 0.35) 0%, rgba(143, 174, 139, 0.15) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }} />

              {/* Portrait with cinematic entrance + subtle float */}
              <motion.div
                ref={parallaxRef}
                className="relative aspect-[3/4] w-full max-w-xs sm:max-w-md mx-auto lg:max-w-[460px] lg:ml-auto rounded-2xl md:rounded-3xl overflow-hidden"
                style={{ perspective: '1000px', boxShadow: '0 20px 60px rgba(13, 79, 79, 0.15), 0 8px 24px rgba(26, 60, 52, 0.10)' }}
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: t.portrait, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ZoomableImage
                    src="/images/prabhat-about-bw.jpeg"
                    alt="Prabhat Singh Rajput"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 460px"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Decorative border glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-soft-mint/40 via-transparent to-sage/30 -z-10 blur-sm" />
              </motion.div>

              {/* Floating badge 1 */}
              <motion.div
                className="absolute top-4 right-2 sm:right-4 md:right-2 z-20"
                {...cardEntrance(t.badge1)}
              >
                <div
                  className="premium-card px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 glass"
                  style={{ animation: 'float 7s ease-in-out infinite' }}
                >
                  <div className="w-10 h-10 rounded-full bg-soft-mint/80 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-deep-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Theatre</p>
                    <p className="text-xs text-graphite font-medium">Enthusiast</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                className="absolute top-2/3 left-2 sm:-left-2 md:-left-4 z-20"
                {...cardEntrance(t.badge2)}
              >
                <div
                  className="premium-card px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 glass"
                  style={{ animation: 'float 8s ease-in-out infinite 1s' }}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Soft-Skills Personality</p>
                    <p className="text-[10px] text-graphite font-medium">Development Expert</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 3 */}
              <motion.div
                className="absolute -bottom-4 right-2 sm:right-4 md:right-2 z-20"
                {...cardEntrance(t.badge3)}
              >
                <div
                  className="premium-card px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 glass"
                  style={{ animation: 'float 6s ease-in-out infinite 0.5s' }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-soft-mint/80 flex items-center justify-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-deep-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Life</p>
                    <p className="text-xs text-graphite font-medium">Learner</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — premium animation, hidden on mobile */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 sm:flex flex-col items-center gap-2 hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t.scroll, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-silver font-medium">
            Scroll to Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-sage" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Storytelling Bridge ── */}
      <section className="relative py-24 md:py-40 overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--soft-ivory) 0%, var(--off-white) 100%)' }}>
        <div className="container-editorial max-w-4xl mx-auto text-center">
          <ScrollReveal variant="fade-up">
            <p className="text-heading md:text-display font-display text-charcoal/80 leading-snug mb-6">
              Because confidence is never taught.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-heading md:text-display font-display text-charcoal/60 leading-snug mb-6">
              It is experienced.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.4}>
            <p className="text-heading md:text-display font-display text-charcoal/40 leading-snug mb-6">
              It is performed.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.6}>
            <p className="text-heading md:text-display font-display gradient-text leading-snug">
              It is lived.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATISTICS BAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StatsBar() {
  const stats = [
    { end: 50, suffix: '+', label: 'Workshops Conducted' },
    { end: 100000, suffix: '+', label: 'Lives Impacted', prefix: '' },
    { end: 50, suffix: '+', label: 'Institutions Trained' },
    { end: 10, suffix: '+', label: 'Years of Experience' },
  ];

  return (
    <section className="relative py-16 md:py-24" style={{ background: 'linear-gradient(180deg, var(--soft-ivory) 0%, var(--off-white) 100%)' }}>
      {/* Soft top gradient instead of hard border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mist to-transparent" />
      <div className="container-editorial">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              <Counter
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                duration={2.5}
              />
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-mist to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTRODUCTION SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IntroductionSection() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24" style={{ background: 'linear-gradient(180deg, var(--soft-ivory) 0%, var(--white) 100%)' }} data-nav-chapter="02" data-nav-title="THE JOURNEY">
      {/* Curved SVG Top Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: 'translateY(-1px)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--off-white)"></path>
        </svg>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-soft-mint/30 blur-[100px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left — Large editorial text */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Story"
              title="Where Theatre Meets Transformation"
              className="mb-10"
            />

            <ScrollReveal variant="fade-up" delay={0.2}>
              <p className="text-body-lg text-graphite mb-6 leading-relaxed">
                For over ten years, Prabhat Singh Rajput has been at the
                intersection of art and education — wielding the power of
                theatre to unlock human potential. From university auditoriums
                to corporate boardrooms, his workshops don&apos;t just teach
                communication; they rewire how people think, express, and lead.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-body-lg text-graphite mb-8 leading-relaxed">
                As a PhD scholar researching the impact of theatre pedagogy on
                communication anxiety, Prabhat brings academic rigor to
                experiential learning. His work has been recognized by
                institutions across India, and his community initiatives —
                HOPE and Stage4You — have touched over 100,000 lives.
              </p>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal variant="slide-right" delay={0.5}>
              <blockquote className="relative pl-8 border-l-2 border-emerald/30 my-10">
                <span className="absolute -top-4 -left-2 text-6xl font-display text-sage/30">
                  &ldquo;
                </span>
                <p className="text-subheading font-display text-charcoal italic">
                  Every person has a story worth telling. Theatre gives them
                  the stage to tell it.
                </p>
                <cite className="text-caption text-graphite mt-4 block not-italic">
                  — Prabhat Singh Rajput
                </cite>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.6}>
              <MagneticButton variant="outline" href="/about">
                Read Full Story
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Right — Image */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="scale">
              <div className="relative mb-12 lg:mb-0">
                <div
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02]"
                  style={{
                    background:
                      'linear-gradient(160deg, var(--soft-ivory) 0%, var(--sage) 50%, var(--deep-teal) 100%)',
                  }}
                >
                  <ZoomableImage
                    src="/images/prabhat-hero-new.jpg"
                    alt="Prabhat Singh Rajput"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Offset decorative frame */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full rounded-3xl border border-sage/40 -z-10 bg-soft-mint/10 backdrop-blur-md" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   GALLERY PREVIEW SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AnimatedGalleryCard({
  items,
  initialDelay = 0,
  intervalDuration = 7500,
  className = '',
}: {
  items: typeof galleryItems;
  initialDelay?: number;
  intervalDuration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !items || items.length === 0) return;

    let intervalId: NodeJS.Timeout;
    const initialTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, intervalDuration);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [items, isHovered, initialDelay, intervalDuration]);

  if (!items || items.length === 0) return null;
  const current = items[index];

  return (
    <Link
      href="/gallery"
      className={`relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group shadow-xl border border-charcoal/10 bg-charcoal cursor-pointer block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={current.src}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark gradient overlay for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Glassmorphism Badge */}
      <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="bg-black/40 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl w-fit max-w-full"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold block mb-0.5">
              {current.category}
            </span>
            <p className="text-xs md:text-sm font-medium text-white truncate max-w-[200px] sm:max-w-[240px]">
              {current.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Link>
  );
}

function GalleryPreview() {
  const group1 = galleryItems.filter((_, i) => i % 3 === 0);
  const group2 = galleryItems.filter((_, i) => i % 3 === 1);
  const group3 = galleryItems.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-white" data-nav-chapter="04" data-nav-title="GALLERY">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
          <div>
            <ScrollReveal variant="fade-up">
              <span className="text-eyebrow block mb-4">The Gallery</span>
            </ScrollReveal>
            <AnimatedText
              text="MOMENTS IN TIME"
              className="text-display font-display text-charcoal max-w-lg"
              variant="word-reveal"
              tag="h2"
            />
          </div>
          <ScrollReveal variant="fade-up" delay={0.4}>
            <MagneticButton variant="outline" href="/gallery">
              View Full Gallery
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <ScrollReveal variant="fade-up" delay={0.2}>
            <AnimatedGalleryCard items={group1} initialDelay={0} intervalDuration={7500} />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.4}>
            <AnimatedGalleryCard items={group2} initialDelay={2500} intervalDuration={7500} className="md:mt-12" />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.6}>
            <AnimatedGalleryCard items={group3} initialDelay={5000} intervalDuration={7500} className="hidden sm:block" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOPE PREVIEW SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HopePreview() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'linear-gradient(180deg, var(--white) 0%, var(--soft-ivory) 100%)' }} data-nav-chapter="05" data-nav-title="H.O.P.E">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal variant="scale">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <ZoomableImage
                  src="/images/hope-initiative.jpeg"
                  alt="H.O.P.E. Initiative - Audience"
                  fill
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="order-1 lg:order-2">
            <ScrollReveal variant="fade-up">
              <span className="text-eyebrow !text-[#64ffda] block mb-4 bg-[#0a192f] inline-block px-3 py-1 rounded-full">
                Community Initiative
              </span>
            </ScrollReveal>
            <AnimatedText
              text="H.O.P.E."
              className="text-display font-display text-[#0a192f] mb-2"
              variant="word-reveal"
              tag="h2"
            />
            <ScrollReveal variant="fade-up" delay={0.2}>
              <h3 className="text-2xl font-display text-[#0a192f]/80 mb-6">
                Healing Our Past Experiences
              </h3>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-body-lg text-graphite mb-8 leading-relaxed">
                HOPE is a transformative community platform that uses the medium of art, storytelling, and open dialogue to help individuals navigate trauma and build emotional resilience.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.6}>
              <MagneticButton variant="outline" href="/hope">
                Discover HOPE
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   STAGE4YOU PREVIEW SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Stage4YouPreview() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#1C1C1C]" data-theme="dark" data-nav-chapter="06" data-nav-title="STAGE4YOU">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFB800] via-transparent to-transparent" />
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ScrollReveal variant="fade-up">
              <span className="text-eyebrow !text-[#FFB800] block mb-4">
                Flagship Platform
              </span>
            </ScrollReveal>
            <AnimatedText
              text="STAGE4YOU"
              className="text-display font-display text-white mb-6"
              variant="word-reveal"
              tag="h2"
            />
            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-body-lg text-white/70 mb-8 leading-relaxed">
                A massive theatre initiative designed to bring the stage to everyone. Stage4You breaks down barriers, providing a professional platform for aspiring artists and communicators to find their voice and captivate an audience.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.6}>
              <MagneticButton variant="primary" href="/stage4you" className="!bg-[#FFB800] !text-charcoal hover:!bg-[#FFB800]/90">
                Explore Stage4You
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal variant="scale">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,184,0,0.15)] border border-white/5">
                <ZoomableImage
                  src="/images/stage4you-showcase-2.jpg"
                  alt="Stage4You Theatre Production"
                  fill
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   TESTIMONIAL PREVIEW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PREVIEW_TESTIMONIALS = [
  {
    text: "I had the opportunity to work with Prabhat Singh during the online placement assessment process for Nxtwave at Amity University Greater Noida, and it was a very smooth experience. Even though we worked together for only one day, I was impressed by his leadership, planning, and sense of accountability.",
    name: 'Sangeet Banik',
    title: 'Associate Program Manager — Nxtwave',
    initials: 'SB',
  },
  {
    text: "I have had the pleasure of working with Mr. Prabhat Singh, and I can confidently say that they are an exceptional professional with a strong commitment to excellence. He consistently demonstrates deep subject knowledge, a proactive attitude, and the ability to handle responsibilities with great efficiency.",
    name: 'Er. Gourav Tomar',
    title: 'Assistant Professor — Former Govt. College Lecturer',
    initials: 'GT',
  },
  {
    text: "Prabhat is one of the best people I have as a youngest colleague. His ability to tackle any problem is remarkable and with a warm smile. I highly recommend his expertise to any person who want to seek an advice on team building as well as theatre.",
    name: 'Arpit Agrawal',
    title: 'Vice Chairperson — JECRC University',
    initials: 'AA',
  },
];

function TestimonialPreview() {

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PREVIEW_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = PREVIEW_TESTIMONIALS[activeIndex];

  return (
    <section className="section-spacing bg-soft-ivory relative overflow-hidden" data-nav-chapter="03" data-nav-title="IMPACT">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow block mb-6">The Impact</span>
          </ScrollReveal>

          <div className="relative min-h-[320px] md:min-h-[280px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-5xl sm:text-7xl md:text-8xl font-display text-sage/30 leading-none block mb-4">
                  &ldquo;
                </span>
                <p className="text-heading font-display text-charcoal italic leading-snug mb-8 -mt-8">
                  {current.text}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/30 flex items-center justify-center">
                    <span className="text-sm font-semibold text-deep-teal">
                      {current.initials}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-charcoal">
                      {current.name}
                    </p>
                    <p className="text-xs text-silver">
                      {current.title}
                    </p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8 mb-12">
            {PREVIEW_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-deep-teal w-6' : 'bg-sage/30'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div>
              <MagneticButton variant="outline" href="/testimonials">
                Read All 13 Testimonials
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-soft-mint/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-sage/15 rounded-full blur-[60px] pointer-events-none" />
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   CTA SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CTASection() {
  return (
    <section
      className="section-spacing relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--off-white) 0%, var(--warm-white) 100%)',
      }}
      data-nav-chapter="07"
      data-nav-title="CONNECT"
    >
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow block mb-6">Next Chapter</span>
          </ScrollReveal>

          <AnimatedText
            text="LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER"
            className="text-display font-display text-charcoal mb-8"
            variant="word-reveal"
            tag="h2"
          />

          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-body-lg text-graphite mb-10">
              Whether you&apos;re an institution seeking transformative
              workshops, a corporation investing in leadership, or a
              community looking for impact — let&apos;s talk.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton variant="primary" size="lg" href="/contact">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Floating shapes for visual interest */}
      <FloatingShapes
        count={3}
        colors={[
          'rgba(200, 230, 208, 0.2)',
          'rgba(143, 174, 139, 0.15)',
          'rgba(232, 230, 226, 0.3)',
        ]}
      />
    </section>
  );
}

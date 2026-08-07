'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown, Users, Award, Building2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import FloatingShapes from '@/components/ui/FloatingShapes';
import AnimatedText from '@/components/ui/AnimatedText';
import TypingText from '@/components/ui/TypingText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import Card from '@/components/ui/Card';
import MagneticButton from '@/components/ui/MagneticButton';
import SectionHeading from '@/components/ui/SectionHeading';

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
      <ServicesPreview />
      <ImpactSection />
      <TestimonialPreview />
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

    heroRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroRef.current?.removeEventListener('mousemove', handleMouseMove);
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
    >
      {/* Floating shapes */}
      <FloatingShapes count={6} />

      {/* Slow-drifting ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(200, 230, 208, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          opacity: [0.3, 0.5, 0.35, 0.3],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-28 items-center">
          {/* Left — Typography */}
          <div className="order-2 lg:order-1 lg:col-span-7 min-w-0 pr-0 lg:pr-8">
            <motion.span
              className="text-eyebrow block mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: t.eyebrow, ease: [0.22, 1, 0.36, 1] }}
            >
              Theatre Educator · Corporate Trainer · Speaker
            </motion.span>

            {/* First headline — word by word */}
            <h1 className="text-hero font-display text-charcoal mb-4 whitespace-pre-line">
              <span className="block overflow-hidden">
                <motion.span className="inline-block" {...wordReveal(t.word1)}>WE DON&apos;T</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="inline-block" {...wordReveal(t.word2)}>TEACH</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="inline-block" {...wordReveal(t.word3)}>COMMUNICATION.</motion.span>
              </span>
            </h1>

            {/* Second headline — gradient, word by word */}
            <h1 className="text-hero font-display gradient-text mb-8 whitespace-pre-line">
              <span className="block overflow-hidden">
                <motion.span className="inline-block gradient-text" {...wordReveal(t.word4)}>WE CREATE</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="inline-block gradient-text" {...wordReveal(t.word5)}>CONFIDENT</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="inline-block gradient-text" {...wordReveal(t.word6)}>LEADERS.</motion.span>
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
          <div className="order-1 lg:order-2 lg:col-span-5 relative min-w-0 lg:translate-x-12 xl:translate-x-20 lg:translate-y-16">
            {/* Soft radial glow behind portrait */}
            <div className="absolute inset-0 -z-10 scale-110" style={{
              background: 'radial-gradient(ellipse at center, rgba(200, 230, 208, 0.35) 0%, rgba(143, 174, 139, 0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }} />

            {/* Portrait with cinematic entrance + subtle float */}
            <motion.div
              ref={parallaxRef}
              className="relative aspect-[3/4] w-full max-w-xs sm:max-w-md mx-auto lg:max-w-[550px] lg:ml-auto rounded-2xl md:rounded-3xl overflow-hidden"
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
                <Image
                  src="/images/prabhat-hero.jpg"
                  alt="Prabhat Singh Rajput"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Decorative border glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-soft-mint/40 via-transparent to-sage/30 -z-10 blur-sm" />
            </motion.div>

            {/* Floating badge 1: TEDx (appears first) */}
            <motion.div
              className="absolute top-4 sm:top-8 -right-2 sm:-right-8 md:-right-24 z-20"
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
                  <p className="text-sm font-bold text-charcoal">TEDx Speaker</p>
                  <p className="text-xs text-graphite font-medium">PhD Scholar</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge 2: Community */}
            <motion.div
              className="absolute top-2/3 -left-2 sm:-left-6 md:-left-16 z-20"
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
                  <p className="text-xs font-bold text-charcoal">Community Builder</p>
                  <p className="text-[10px] text-graphite font-medium">100K+ Impacted</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge 3: 15+ Years */}
            <motion.div
              className="absolute -bottom-4 -left-2 sm:-left-8 md:-left-20 z-20"
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
                  <p className="text-sm font-bold text-charcoal">15+ Years</p>
                  <p className="text-xs text-graphite font-medium">Transforming Lives</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge 4: Corporate */}
            <motion.div
              className="absolute -bottom-8 sm:-bottom-12 right-0 sm:right-2 md:right-4 z-20"
              {...cardEntrance(t.badge4)}
            >
              <div
                className="premium-card px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 glass"
                style={{ animation: 'float 9s ease-in-out infinite 2s' }}
              >
                <div className="w-8 h-8 rounded-full bg-deep-teal/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-deep-teal" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal">Corporate Trainer</p>
                  <p className="text-[10px] text-graphite font-medium">Top Tier Firms</p>
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
    { end: 500, suffix: '+', label: 'Workshops Conducted' },
    { end: 100000, suffix: '+', label: 'Lives Impacted', prefix: '' },
    { end: 50, suffix: '+', label: 'Institutions Trained' },
    { end: 15, suffix: '+', label: 'Years of Experience' },
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
    <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24" style={{ background: 'linear-gradient(180deg, var(--soft-ivory) 0%, var(--white) 100%)' }}>
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
                For over fifteen years, Prabhat Singh Rajput has been at the
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                    <p className="text-sm font-mono tracking-wider opacity-60">
                      WORKSHOP PHOTOGRAPH
                    </p>
                  </div>
                </div>
                {/* Offset decorative frame */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full rounded-3xl border border-sage/40 -z-10 bg-soft-mint/10 backdrop-blur-md" />
                
                {/* Floating element on image */}
                <motion.div
                  className="absolute -left-4 md:-left-8 top-1/4 premium-card px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 z-20 glass"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{ animation: 'float 5s ease-in-out infinite' }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald" />
                  <p className="text-xs font-bold text-charcoal">PhD Scholar</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   SERVICES PREVIEW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ServicesPreview() {
  const services = [
    {
      icon: Users,
      title: 'Theatre in Education',
      description:
        'Transforming classrooms through immersive theatre-based pedagogy. Building confidence, empathy, and communication skills in students across India.',
      href: '/theatre-in-education',
      color: 'from-deep-teal/10 to-emerald/5',
    },
    {
      icon: Building2,
      title: 'Corporate Training',
      description:
        'High-impact workshops for corporate teams — from leadership communication to presentation mastery, designed to unlock professional excellence.',
      href: '/training',
      color: 'from-emerald/10 to-sage/5',
    },
    {
      icon: Sparkles,
      title: 'Keynote Speaking',
      description:
        'TEDx-caliber talks that inspire action. Prabhat delivers powerful narratives on communication, leadership, and the transformative power of storytelling.',
      href: '/speaking',
      color: 'from-sage/10 to-soft-mint/10',
    },
  ];

  return (
    <section className="section-spacing bg-white relative">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="What I Do"
          title="Crafting Leaders Through Art & Science"
          subtitle="Three pillars of work, one shared mission: empowering people to communicate with confidence, lead with empathy, and perform with purpose."
          alignment="center"
          className="mb-16"
        />

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link href={service.href} key={service.title} className="block group">
                <Card variant="default" padding="lg" className="h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <service.icon className="w-6 h-6 text-deep-teal" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-3 group-hover:text-deep-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   IMPACT SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ImpactSection() {
  const impactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!impactRef.current) return;

    const el = impactRef.current.querySelector('.impact-image');
    if (!el) return;

    gsap.to(el, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: impactRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={impactRef} className="relative overflow-hidden">
      {/* Full-width image with overlay */}
      <div className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px]">
        <div
          className="impact-image absolute inset-[-20%] w-[140%] h-[140%]"
          style={{
            background:
              'linear-gradient(135deg, var(--forest) 0%, var(--deep-teal) 40%, var(--emerald) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-forest/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-editorial">
            <ScrollReveal variant="fade-up">
              <span className="text-eyebrow !text-soft-mint block mb-4">
                Community Impact
              </span>
            </ScrollReveal>
            <AnimatedText
              text="TWO INITIATIVES. ONE HUNDRED THOUSAND LIVES."
              className="text-display font-display text-white max-w-4xl mb-6 md:mb-8"
              variant="word-reveal"
              tag="h2"
            />
            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mb-6 md:mb-8">
                Through HOPE and Stage4You, Prabhat has built grassroots
                movements that bring theatre, education, and opportunity to
                underserved communities.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton variant="secondary" href="/hope">
                  Discover HOPE
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  href="/stage4you"
                  className="!text-white hover:!bg-white/10"
                >
                  Explore Stage4You
                </MagneticButton>
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
function TestimonialPreview() {
  return (
    <section className="section-spacing bg-soft-ivory relative overflow-hidden">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow block mb-6">What People Say</span>
          </ScrollReveal>

          <ScrollReveal variant="blur">
            <blockquote>
              <span className="text-5xl sm:text-7xl md:text-8xl font-display text-sage/30 leading-none block mb-4">
                &ldquo;
              </span>
              <p className="text-heading font-display text-charcoal italic leading-snug mb-8 -mt-8">
                Prabhat&apos;s workshop didn&apos;t just improve our
                communication — it changed the way our entire team thinks
                about collaboration and leadership.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sage/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-deep-teal">
                    AK
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-charcoal">
                    Dr. Ananya Krishnan
                  </p>
                  <p className="text-xs text-silver">
                    Dean, School of Humanities — IIT Delhi
                  </p>
                </div>
              </div>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="mt-12">
              <MagneticButton variant="outline" href="/testimonials">
                Read More Testimonials
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
              <MagneticButton variant="outline" size="lg" href="/training">
                View Programs
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

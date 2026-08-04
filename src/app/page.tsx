'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown, Users, Award, Building2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import FloatingShapes from '@/components/ui/FloatingShapes';
import AnimatedText from '@/components/ui/AnimatedText';
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

  useEffect(() => {
    if (!heroRef.current) return;

    // Mouse-following glow
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
    };

    heroRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
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

      <div className="container-editorial relative z-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Typography */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="text-eyebrow block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Theatre Educator · Corporate Trainer · Speaker
            </motion.span>

            <AnimatedText
              text="WE DON'T TEACH COMMUNICATION."
              className="text-hero font-display text-charcoal mb-2"
              variant="slide-up"
              tag="h1"
              delay={0.5}
              stagger={0.06}
            />
            <AnimatedText
              text="WE CREATE CONFIDENT LEADERS."
              className="text-hero font-display gradient-text mb-8"
              variant="slide-up"
              tag="h1"
              delay={0.8}
              stagger={0.06}
            />

            <motion.p
              className="text-body-lg text-graphite max-w-lg mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Prabhat Singh Rajput transforms lives through the power of
              theatre, communication training, and purposeful leadership —
              one stage at a time.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <MagneticButton variant="primary" size="lg" href="/contact">
                Work with Prabhat
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton variant="outline" size="lg" href="/about">
                Explore the Journey
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Photo Area */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(10% 10% 10% 10% round 2rem)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-xl">
              {/* Placeholder for hero photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, var(--deep-teal) 0%, var(--emerald) 40%, var(--sage) 100%)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
                  <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <span className="text-5xl font-display font-bold">PR</span>
                  </div>
                  <p className="text-sm font-mono tracking-wider opacity-60">
                    PROFESSIONAL PHOTOGRAPH
                  </p>
                </div>
              </div>

              {/* Decorative border glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-soft-mint/40 via-transparent to-sage/30 -z-10 blur-sm" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:left-4 premium-card px-5 py-3 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="w-8 h-8 rounded-full bg-soft-mint flex items-center justify-center">
                <Award className="w-4 h-4 text-deep-teal" />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal">15+ Years</p>
                <p className="text-[10px] text-silver">Transforming Lives</p>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              className="absolute -top-4 -right-4 md:right-4 premium-card px-5 py-3 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              style={{ animation: 'float 7s ease-in-out infinite 1s' }}
            >
              <div className="w-8 h-8 rounded-full bg-soft-mint flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-deep-teal" />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal">TEDx Speaker</p>
                <p className="text-[10px] text-silver">PhD Scholar</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-silver font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-sage" />
        </motion.div>
      </motion.div>
    </section>
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
    <section className="relative py-16 md:py-20 bg-white border-y border-mist">
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
    <section className="section-spacing bg-off-white relative overflow-hidden">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
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
              <div className="relative">
                <div
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg"
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
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-sage/20 -z-10" />
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
      <div className="relative h-[70vh] min-h-[500px]">
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
              className="text-display font-display text-white max-w-4xl mb-8"
              variant="word-reveal"
              tag="h2"
            />
            <ScrollReveal variant="fade-up" delay={0.4}>
              <p className="text-lg text-white/70 max-w-2xl mb-8">
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
              <span className="text-7xl md:text-8xl font-display text-sage/30 leading-none block mb-4">
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

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BookOpen, Heart, Mic, GraduationCap, Theater, Users } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MagneticButton from '@/components/ui/MagneticButton';
import FloatingShapes from '@/components/ui/FloatingShapes';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <PhilosophyCards />
      <MilestonesTimeline />
      <PersonalTouch />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT HERO
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AboutHero() {
  return (
    <section
      className="relative min-h-[80vh] flex items-end overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--warm-white) 0%, var(--soft-ivory) 100%)',
      }}
    >
      <FloatingShapes count={4} />

      <div className="container-editorial relative z-10 pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          {/* Text */}
          <div>
            <motion.span
              className="text-eyebrow block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chapter One
            </motion.span>

            <AnimatedText
              text="THE MAN BEHIND THE MISSION"
              className="text-hero font-display text-charcoal mb-6"
              variant="slide-up"
              tag="h1"
              delay={0.4}
            />

            <motion.p
              className="text-body-lg text-graphite max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              A theatre artist who became an educator. A trainer who became a
              movement. A researcher who believes art can change the world.
            </motion.p>
          </div>

          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div
              className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl max-w-sm ml-auto"
              style={{
                background:
                  'linear-gradient(150deg, var(--sage) 0%, var(--deep-teal) 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/60">
                <p className="text-sm font-mono tracking-wider">PORTRAIT</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   STORY SECTION — Alternating blocks
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StorySection() {
  const stories = [
    {
      eyebrow: 'The Beginning',
      title: 'A Stage That Changed Everything',
      text: `Prabhat's journey began not in a classroom, but on a stage — where a shy young man discovered that theatre wasn't just performance; it was transformation. In the spotlight, he found his voice. In the audience's eyes, he found his purpose. That moment sparked a lifelong mission to bring the same transformation to others.`,
      imageGradient: 'from-soft-mint to-sage',
      imageLabel: 'EARLY THEATRE DAYS',
    },
    {
      eyebrow: 'The Evolution',
      title: 'From Artist to Educator',
      text: `What began as a passion for theatre evolved into a methodology. Prabhat pioneered Theatre in Education (TIE) workshops across Indian universities, developing a unique pedagogy that uses improvisational theatre, role-play, and experiential exercises to dismantle communication anxiety. His approach doesn't just teach skills — it rebuilds confidence from the ground up.`,
      imageGradient: 'from-emerald to-deep-teal',
      imageLabel: 'WORKSHOP SESSIONS',
      reversed: true,
    },
    {
      eyebrow: 'The Mission',
      title: 'Building Movements, Not Just Workshops',
      text: `Prabhat's impact extends far beyond individual sessions. Through HOPE — his community development initiative — and Stage4You — a platform celebrating the performing arts — he has created ecosystems of growth. Together, these initiatives have reached over 100,000 people, proving that the arts aren't a luxury; they're a necessity for human development.`,
      imageGradient: 'from-deep-teal to-forest',
      imageLabel: 'COMMUNITY IMPACT',
    },
  ];

  return (
    <section className="section-spacing bg-off-white">
      <div className="container-editorial space-y-24 md:space-y-32">
        {stories.map((story, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              story.reversed ? 'direction-rtl' : ''
            }`}
          >
            {/* Text */}
            <div
              className={`${story.reversed ? 'lg:order-2' : ''}`}
              style={{ direction: 'ltr' }}
            >
              <ScrollReveal variant="fade-up">
                <span className="text-eyebrow block mb-3">{story.eyebrow}</span>
              </ScrollReveal>
              <AnimatedText
                text={story.title}
                className="text-heading font-display text-charcoal mb-6"
                variant="slide-up"
                tag="h2"
              />
              <ScrollReveal variant="fade-up" delay={0.3}>
                <p className="text-body-lg text-graphite leading-relaxed">
                  {story.text}
                </p>
              </ScrollReveal>
            </div>

            {/* Image */}
            <div
              className={`${story.reversed ? 'lg:order-1' : ''}`}
              style={{ direction: 'ltr' }}
            >
              <ScrollReveal variant="scale">
                <div className="relative">
                  <div
                    className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br ${story.imageGradient}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white/60">
                      <p className="text-sm font-mono tracking-wider">
                        {story.imageLabel}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-sage/15 -z-10" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   PHILOSOPHY CARDS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhilosophyCards() {
  const pillars = [
    {
      icon: Theater,
      title: 'Art as Pedagogy',
      description:
        'Theatre is not entertainment — it is education in its most human form. Through structured improvisation and role-play, we unlock communication potential that traditional methods can\'t reach.',
      color: 'from-deep-teal/10 to-emerald/5',
    },
    {
      icon: Heart,
      title: 'Empathy Before Skill',
      description:
        'True communication starts with understanding others. Every workshop begins with building emotional intelligence — because leaders who listen are leaders who inspire.',
      color: 'from-emerald/10 to-sage/5',
    },
    {
      icon: Users,
      title: 'Community Over Individual',
      description:
        'Real change is collective. From university classrooms to rural communities, transformation happens when people grow together. That\'s why every program builds cohorts, not just competencies.',
      color: 'from-sage/10 to-soft-mint/10',
    },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Core Philosophy"
          title="Three Pillars of Transformation"
          subtitle="The beliefs that guide every workshop, every talk, and every initiative."
          alignment="center"
          className="mb-16"
        />

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar) => (
              <Card key={pillar.title} variant="default" padding="lg" className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <pillar.icon className="w-7 h-7 text-deep-teal" />
                </div>
                <h3 className="text-xl font-display font-semibold text-charcoal mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   MILESTONES TIMELINE (Horizontal scrolling)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MilestonesTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - track.clientWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: track.parentElement,
        start: 'top 20%',
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === track.parentElement) st.kill();
      });
    };
  }, []);

  const milestones = [
    {
      year: '2008',
      title: 'First Theatre Workshop',
      description: 'Conducted the first theatre-based communication workshop at a local university.',
      icon: Theater,
    },
    {
      year: '2012',
      title: 'HOPE Foundation',
      description: 'Founded HOPE — bringing education and arts to underserved communities.',
      icon: Heart,
    },
    {
      year: '2015',
      title: 'Corporate Expansion',
      description: 'Began delivering leadership and communication training for Fortune 500 companies.',
      icon: Users,
    },
    {
      year: '2017',
      title: 'Stage4You Launch',
      description: 'Created Stage4You — a platform celebrating performing arts with 1L+ community members.',
      icon: Mic,
    },
    {
      year: '2019',
      title: 'TEDx Speaker',
      description: 'Delivered a TEDx talk on the power of theatre pedagogy in modern education.',
      icon: Mic,
    },
    {
      year: '2021',
      title: 'PhD Research',
      description: 'Began doctoral research on theatre pedagogy\'s impact on communication anxiety.',
      icon: GraduationCap,
    },
    {
      year: '2024',
      title: '100K Lives Impacted',
      description: 'Combined impact of all initiatives crosses the 100,000 lives milestone.',
      icon: BookOpen,
    },
  ];

  return (
    <section className="section-spacing bg-soft-ivory overflow-hidden">
      <div className="container-editorial mb-12">
        <SectionHeading
          eyebrow="The Timeline"
          title="Moments That Defined the Journey"
        />
      </div>

      <div className="relative">
        <div ref={trackRef} className="flex gap-6 pl-[var(--container-padding)] pr-32">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[380px]"
            >
              <Card variant="default" padding="lg" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-mint/50 flex items-center justify-center">
                    <milestone.icon className="w-5 h-5 text-deep-teal" />
                  </div>
                  <span className="text-2xl font-display font-bold gradient-text">
                    {milestone.year}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-graphite leading-relaxed">
                  {milestone.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Gradient edges */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-soft-ivory to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-soft-ivory to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   PERSONAL TOUCH
   ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PersonalTouch() {
  return (
    <section
      className="section-spacing relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--white) 0%, var(--warm-white) 100%)',
      }}
    >
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow block mb-6">A Personal Note</span>
          </ScrollReveal>

          <ScrollReveal variant="blur">
            <blockquote className="mb-10">
              <p className="text-heading font-display text-charcoal italic leading-snug mb-8">
                &ldquo;I believe every human being carries within them the
                power to inspire, to lead, and to transform. My work is
                simply about creating the space where that power finds its
                voice.&rdquo;
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            {/* Signature placeholder */}
            <div className="mb-8">
              <p className="font-display text-2xl text-deep-teal italic">
                Prabhat Singh Rajput
              </p>
              <p className="text-caption text-silver mt-1">
                Theatre Educator · PhD Scholar · Changemaker
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton variant="primary" href="/journey">
                Explore the Full Journey
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton variant="outline" href="/contact">
                Get in Touch
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <FloatingShapes count={3} colors={['rgba(200,230,208,0.15)', 'rgba(143,174,139,0.1)', 'rgba(232,230,226,0.25)']} />
    </section>
  );
}

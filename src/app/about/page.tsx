'use client';

import ZoomableImage from '@/components/ui/ZoomableImage';

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Theater, Users } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MagneticButton from '@/components/ui/MagneticButton';
import FloatingShapes from '@/components/ui/FloatingShapes';
import OrganicInkEffect from '@/components/ui/OrganicInkEffect';
import JourneyContent from '@/components/JourneyContent';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <PhilosophyCards />
      <JourneyContent hideHeroAndFooter />
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
      className="relative min-h-screen lg:min-h-[120vh] flex items-start overflow-hidden"
      style={{
        background: '#FAF9F6', // Pure ivory to ensure perfect difference calculations
      }}
    >
      <FloatingShapes count={4} />

      {/* 1. Portrait Layer (Above Ink) - z-15 */}
      <div className="absolute inset-0 z-[15] container-editorial pt-24 lg:pt-40 pb-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 h-full items-start lg:items-end">
          <div className="hidden lg:block" /> {/* spacer for text side */}
          <motion.div
            className="relative pointer-events-auto w-full flex flex-col justify-start lg:justify-end lg:pb-32 lg:h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div
              className="relative aspect-square lg:aspect-[3/4] rounded-full lg:rounded-3xl overflow-hidden shadow-xl w-[65%] sm:w-[55%] lg:w-[85%] max-w-sm lg:max-w-md mx-auto lg:ml-auto"
              style={{
                background:
                  'linear-gradient(150deg, var(--sage) 0%, var(--deep-teal) 100%)',
              }}
            >
              <ZoomableImage
                src="/images/prabhat-hero-white-shirt.jpg"
                alt="Prabhat Singh Rajput Portrait"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Organic Ink WebGL Layer - z-10 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <OrganicInkEffect />
      </div>

      {/* 3. Text Layer (Above Ink, using mix-blend-mode: difference) - z-20 */}
      <div
        className="container-editorial relative z-20 pt-32 lg:pt-40 pb-12 lg:pb-20 min-h-[90vh] lg:h-screen flex flex-col justify-end mix-blend-difference"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Text Container */}
          <div className="pb-10 lg:pb-32 pl-1 sm:pl-0">
            <motion.span
              className="font-mono text-xs lg:text-sm uppercase tracking-[0.2em] block mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: '#E9E8E5' }} // Inverts to charcoal on ivory, and ivory on black
            >
              Chapter One
            </motion.span>

            <h1
              className="text-[3.25rem] sm:text-[4rem] lg:text-[5rem] font-display leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ color: '#E9E8E5' }}
            >
              <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>THE MAN BEHIND</motion.span>
              <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>THE MISSION</motion.span>
            </h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl font-medium max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{ color: '#E9E8E5' }}
            >
              A theatre artist who became an educator. A trainer who became a
              movement. A researcher who believes art can change the world.
            </motion.p>
          </div>
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
      imageSrc: '/images/early-theatre-days.jpeg',
    },
    {
      eyebrow: 'The Evolution',
      title: 'From Artist to Educator',
      text: `What began as a passion for theatre evolved into a methodology. Prabhat pioneered Theatre in Education (TIE) workshops across Indian universities, developing a unique pedagogy that uses improvisational theatre, role-play, and experiential exercises to dismantle communication anxiety. His approach doesn't just teach skills — it rebuilds confidence from the ground up.`,
      imageGradient: 'from-emerald to-deep-teal',
      imageLabel: 'WORKSHOP SESSIONS',
      imageSrc: '/images/workshop-sessions.jpeg',
      reversed: true,
    },
    {
      eyebrow: 'The Mission',
      title: 'Building Movements, Not Just Workshops',
      text: `Prabhat's impact extends far beyond individual sessions. Through HOPE — his community development initiative — and Stage4You — a platform celebrating the performing arts — he has created ecosystems of growth. Together, these initiatives have reached over 100,000 people, proving that the arts aren't a luxury; they're a necessity for human development.`,
      imageGradient: 'from-deep-teal to-forest',
      imageLabel: 'COMMUNITY IMPACT',
      imageSrc: '/images/community-impact-new.jpeg',
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
                    className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br ${story.imageGradient}`}
                  >
                    {story.imageSrc ? (
                      <ZoomableImage
                        src={story.imageSrc}
                        alt={story.imageLabel}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/60">
                        <p className="text-sm font-mono tracking-wider">
                          {story.imageLabel}
                        </p>
                      </div>
                    )}
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


        </div>
      </div>

      <FloatingShapes count={3} colors={['rgba(200,230,208,0.15)', 'rgba(143,174,139,0.1)', 'rgba(232,230,226,0.25)']} />
    </section>
  );
}

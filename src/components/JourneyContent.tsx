'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

type Category = 'experience' | 'education' | 'volunteering';

interface Milestone {
  year: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  category: Category;
  skills?: string;
}

const milestones: Milestone[] = [
  {
    year: '2016',
    period: '2016 – 2018',
    title: 'Bachelor of Commerce',
    organization: 'Baba Farid Group of Institutions',
    description: 'Graduated with a BCom in Accounting and Business Management. Active in sports — achieved Mr. Punjab 5th Position in Bodybuilding competition.',
    category: 'education',
    skills: 'Problem Solving',
  },
  {
    year: '2018',
    period: 'Jun 2018 – Aug 2018',
    title: 'Cultural Manager',
    organization: 'Indian Air Force',
    description: 'Motivated by the improvement of art, worked independently and professionally with knowledge of the subject, and helped develop work as a mediator between government and private cultural institutions.',
    category: 'volunteering',
    skills: 'Arts and Culture',
  },
  {
    year: '2018',
    period: 'Jun 2018 – Nov 2022',
    title: 'Co-Founder',
    organization: 'Stage4you',
    description: 'Built an online platform for all those who are talented and need a stage to shine. Ran it full-time for over 4 years, empowering thousands of young performers.',
    category: 'experience',
    skills: 'Research, Social Media Marketing +20',
  },
  {
    year: '2019',
    period: '2019 – 2021',
    title: 'MBA, Information Technology',
    organization: 'JECRC University',
    description: 'Graduated with 8.8 CGPA. Won Mr. Fresher 2019 title. Developed skills in teamwork, creativity, and leadership during the program.',
    category: 'education',
    skills: 'Teamwork, Creativity Skills +11',
  },
  {
    year: '2020',
    period: 'Jan 2020 – Feb 2020',
    title: 'Head of Social Media Marketing',
    organization: 'Rang Rajasthan Theatre & Folk Festival',
    description: 'Led social media marketing for a 7-day Rajasthani Theatre and Folk Festival aimed at preserving and promoting Rajasthani culture and language through theatre and folk arts.',
    category: 'volunteering',
    skills: 'Arts and Culture',
  },
  {
    year: '2020',
    period: 'Nov 2020 – Jan 2021',
    title: 'Associate Campus Engagement',
    organization: 'JECRC University',
    description: 'Began the campus engagement journey, building foundational skills in research, outreach, and student relationship management.',
    category: 'experience',
    skills: 'Research, Microsoft Office +13',
  },
  {
    year: '2021',
    period: 'Feb 2021 – Apr 2022',
    title: 'Manager Campus Engagement',
    organization: 'JECRC University',
    description: 'Promoted to Manager, leading campus engagement initiatives across Jaipur, Rajasthan. Spearheaded research, event coordination, and student mentorship programs.',
    category: 'experience',
    skills: 'Research, Microsoft Office +22',
  },
  {
    year: '2021',
    period: 'Oct 2021 · 1 month',
    title: 'Casting Coordinator',
    organization: 'Netflix',
    description: 'Coordinated casting for a Netflix India event co-hosted for the web series Mismatched Season 2, directed by Mr. Akarsh Khurana.',
    category: 'volunteering',
    skills: 'Arts and Culture',
  },
  {
    year: '2022',
    period: 'Apr 2022 – Sep 2022',
    title: 'Co-Founder',
    organization: 'HOPE — Home of Passion Events',
    description: 'Co-founded HOPE, a passion-driven events platform, working remotely to bring creative and cultural events to life.',
    category: 'experience',
    skills: 'Event Management',
  },
  {
    year: '2022',
    period: 'Sep 2022 – Jan 2023',
    title: 'Admission Counselor & Outreach',
    organization: 'Indian Institute of Art and Design',
    description: 'Managed student admissions and outreach in New Delhi, blending communication design expertise with trend analysis to recruit top creative talent.',
    category: 'experience',
    skills: 'Communication Design, Trend Analysis +7',
  },
  {
    year: '2023',
    period: 'Feb 2023 – Present',
    title: 'Executive — Corporate Resource Center',
    organization: 'Amity University',
    description: 'Currently leading corporate engagement at Amity University Greater Noida Campus. Manages training programs, relationship development, and industry-academia partnerships on-site.',
    category: 'experience',
    skills: 'Training, Relationship Development +2',
  },
  {
    year: '2023',
    period: 'Mar 2023 – Apr 2027',
    title: 'Doctor of Philosophy (PhD)',
    organization: 'Amity University',
    description: 'Pursuing a PhD in Business Administration and Management. Research focuses on the quantitative impact of theatre-based training on communication and leadership.',
    category: 'education',
    skills: 'Presentation Skills, Leadership +3',
  },
];

const categoryConfig: Record<Category, { label: string; color: string; bg: string; border: string }> = {
  experience: { label: 'Experience', color: '#0D4F4F', bg: 'rgba(13, 79, 79, 0.06)', border: 'rgba(13, 79, 79, 0.15)' },
  education: { label: 'Education', color: '#1B7A5A', bg: 'rgba(27, 122, 90, 0.06)', border: 'rgba(27, 122, 90, 0.15)' },
  volunteering: { label: 'Volunteering', color: '#8FAE8B', bg: 'rgba(143, 174, 139, 0.1)', border: 'rgba(143, 174, 139, 0.2)' },
};

// Individual card that animates when in view
function TimelineCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const config = categoryConfig[milestone.category];

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[85vw] md:w-[550px] h-full flex items-center"
      style={{ paddingRight: '3rem' }}
    >
      <motion.div
        initial={false}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)',
        } : { 
          opacity: 0.15, 
          y: 40, 
          scale: 0.92,
          filter: 'blur(3px)',
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div 
          className="rounded-3xl p-8 md:p-10 relative overflow-hidden group"
          style={{ 
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${config.border}`,
            boxShadow: isInView 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0,0,0,0.02)' 
              : '0 4px 12px rgba(0, 0, 0, 0.02)',
            transition: 'box-shadow 0.7s ease',
          }}
        >
          {/* Accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${config.color}, transparent)` }}
          />

          {/* Floating year in background */}
          <div 
            className="absolute -top-6 -right-4 text-[10rem] font-display font-bold leading-none select-none pointer-events-none opacity-[0.03]"
            style={{ color: config.color }}
          >
            {milestone.year}
          </div>

          {/* Category + Index */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span 
              className="text-[10px] font-medium uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
              style={{ color: config.color, background: config.bg, border: `1px solid ${config.border}` }}
            >
              {config.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--silver)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Year */}
          <div className="mb-4 relative z-10">
            <span 
              className="text-5xl md:text-6xl font-display font-bold"
              style={{ 
                background: `linear-gradient(135deg, ${config.color}, var(--emerald))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {milestone.year}
            </span>
          </div>

          {/* Title & Org */}
          <h3 
            className="text-2xl md:text-3xl font-display font-semibold mb-2 relative z-10"
            style={{ color: 'var(--charcoal)' }}
          >
            {milestone.title}
          </h3>
          <p className="text-base font-medium mb-1 relative z-10" style={{ color: config.color }}>
            {milestone.organization}
          </p>
          <p className="text-xs mb-6 relative z-10" style={{ color: 'var(--silver)' }}>
            {milestone.period}
          </p>

          {/* Description */}
          <p 
            className="text-sm leading-relaxed mb-6 relative z-10"
            style={{ color: 'var(--graphite)' }}
          >
            {milestone.description}
          </p>

          {/* Skills */}
          {milestone.skills && (
            <div className="relative z-10 pt-5" style={{ borderTop: `1px solid ${config.border}` }}>
              <div className="flex flex-wrap gap-2">
                {milestone.skills.split(', ').map((skill, i) => (
                  <span 
                    key={i}
                    className="text-[10px] font-medium px-3 py-1 rounded-full"
                    style={{ color: config.color, background: config.bg }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function JourneyContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  // Measure the scrollable track width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = window.innerWidth;
        setTrackWidth(scrollW - clientW);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for horizontal movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -trackWidth]);
  
  // Progress bar
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  
  // Year counter - interpolate through unique years
  const uniqueYears = [...new Set(milestones.map(m => parseInt(m.year)))];
  const yearRange = useTransform(
    smoothProgress, 
    [0, 1], 
    [uniqueYears[0], uniqueYears[uniqueYears.length - 1]]
  );

  // Background parallax
  const bgX = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]);

  return (
    <div className="relative" style={{ background: 'var(--soft-ivory)' }}>
      {/* ── Hero Section ── */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Decorative elements */}
        <div 
          className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
          style={{ background: 'var(--sage)' }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: 'var(--emerald)' }}
        />
        
        <ScrollReveal variant="fade-up" className="relative z-10 text-center">
          <span 
            className="inline-block text-xs font-medium uppercase tracking-[0.35em] mb-8 border rounded-full px-6 py-2.5"
            style={{ 
              color: 'var(--deep-teal)',
              borderColor: 'var(--mist)',
              background: 'rgba(255,255,255,0.6)',
            }}
          >
            The Timeline
          </span>
          <h1 
            className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-display leading-[0.95] mb-6"
            style={{ color: 'var(--charcoal)' }}
          >
            A Journey of
            <br />
            <span className="italic" style={{ color: 'var(--emerald)' }}>Purpose & Passion</span>
          </h1>
          <p 
            className="text-lg md:text-xl max-w-lg mx-auto font-light mb-6"
            style={{ color: 'var(--graphite)' }}
          >
            From theatre stages to university boardrooms — a decade of building, creating, and transforming lives.
          </p>

          {/* Category Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <span 
                key={key}
                className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] px-4 py-2 rounded-full"
                style={{ color: config.color, background: config.bg, border: `1px solid ${config.border}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
                {config.label}
              </span>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--silver)' }}>
              Scroll to explore
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
              <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* ── Fixed Progress + Year Counter ── */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Progress bar */}
        <div className="h-[3px] w-full" style={{ background: 'rgba(0,0,0,0.03)' }}>
          <motion.div
            className="h-full"
            style={{ 
              width: progressWidth,
              background: 'linear-gradient(90deg, var(--deep-teal), var(--emerald))',
            }}
          />
        </div>
      </div>

      {/* ── Horizontal Scroll Section ── */}
      <div 
        ref={containerRef}
        style={{ height: `${milestones.length * 45}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Dynamic Background Year */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center overflow-hidden">
            <motion.div style={{ opacity: bgOpacity }}>
              <motion.span 
                className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-display font-bold leading-none tracking-tighter"
                style={{ color: 'var(--charcoal)' }}
              >
                {useTransform(yearRange, (latest) => Math.round(latest))}
              </motion.span>
            </motion.div>
          </div>

          {/* Horizontal progress line at bottom */}
          <div className="absolute bottom-20 left-0 right-0 mx-12 md:mx-24">
            <div className="h-px w-full" style={{ background: 'var(--mist)' }}>
              <motion.div
                className="h-full"
                style={{ 
                  width: progressWidth,
                  background: 'linear-gradient(90deg, var(--deep-teal), var(--emerald))',
                }}
              />
            </div>
            {/* Year markers */}
            <div className="flex justify-between mt-3">
              {uniqueYears.map(year => (
                <span 
                  key={year} 
                  className="text-[10px] font-mono uppercase"
                  style={{ color: 'var(--silver)' }}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>

          {/* The scrolling track */}
          <motion.div
            ref={trackRef}
            className="flex items-center h-full pl-[10vw]"
            style={{ x }}
          >
            {/* Opening label */}
            <div className="flex-shrink-0 w-[300px] md:w-[400px] pr-8 md:pr-16">
              <motion.div
                style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
              >
                <span className="text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: 'var(--sage)' }}>
                  Begin
                </span>
                <h2 className="text-4xl md:text-5xl font-display" style={{ color: 'var(--charcoal)' }}>
                  Where it
                  <br />
                  <span className="italic" style={{ color: 'var(--emerald)' }}>all started</span>
                </h2>
              </motion.div>
            </div>

            {/* Timeline Cards */}
            {milestones.map((milestone, i) => (
              <TimelineCard
                key={`${milestone.year}-${milestone.title}`}
                milestone={milestone}
                index={i}
              />
            ))}

            {/* Closing label */}
            <div className="flex-shrink-0 w-[60vw] md:w-[500px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: 'var(--sage)' }}>
                  Present
                </span>
                <h2 className="text-4xl md:text-6xl font-display" style={{ color: 'var(--charcoal)' }}>
                  And the journey
                  <br />
                  <span className="italic" style={{ color: 'var(--emerald)' }}>continues...</span>
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Closing Section ── */}
      <div 
        className="py-32 text-center relative overflow-hidden"
        style={{ background: 'var(--off-white)' }}
      >
        <ScrollReveal variant="fade-up">
          <p 
            className="text-5xl md:text-7xl font-display italic leading-tight max-w-3xl mx-auto px-6"
            style={{ color: 'var(--charcoal)' }}
          >
            {milestones.length} milestones.
            <br />
            <span style={{ color: 'var(--emerald)' }}>One purpose.</span>
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

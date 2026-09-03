'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, Medal, Mic, GraduationCap, Heart, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ZoomableImage from '@/components/ui/ZoomableImage';

import { galleryItems } from '@/data/galleryData';

const categories = ['All', 'Workshops', 'Corporate', 'Events', 'Theatre', 'HOPE'];

const achievements = [
  {
    icon: GraduationCap,
    title: 'PhD Scholar',
    description: 'Pursuing PhD in Business Administration at Amity University — researching theatre-based training impact.',
    year: '2023–Present',
    category: 'Academic',
  },
  {
    icon: Users,
    title: '100,000+ Lives Impacted',
    description: 'Combined reach of all workshops, initiatives, and community programs across India.',
    year: '2024',
    category: 'Impact',
  },
  {
    icon: Star,
    title: 'Mr. Punjab — 5th Position',
    description: 'Achieved 5th position in Mr. Punjab Bodybuilding competition during college years.',
    year: '2017',
    category: 'Personal',
  },
  {
    icon: Heart,
    title: 'HOPE Foundation',
    description: 'Co-founded HOPE — Home of Passion Events, bringing education and arts to underserved communities.',
    year: '2022',
    category: 'Social Impact',
  },
  {
    icon: Trophy,
    title: 'Stage4You — 1L+ Community',
    description: 'Built a performing arts platform with over 100,000 community members across India.',
    year: '2018–2022',
    category: 'Entrepreneurship',
  },
  {
    icon: Award,
    title: 'Mr. Fresher 2019',
    description: 'Won the Mr. Fresher title at JECRC University during MBA program.',
    year: '2019',
    category: 'Personal',
  },
  {
    icon: Medal,
    title: 'Netflix Casting Coordinator',
    description: 'Coordinated casting for Netflix India\'s web series Mismatched Season 2.',
    year: '2021',
    category: 'Industry',
  },
  {
    icon: Mic,
    title: 'Keynote Speaker & Facilitator',
    description: 'Delivered over 100+ keynotes, leadership seminars, and interactive theatre pedagogy workshops.',
    year: '2018–Present',
    category: 'Speaking',
  },
];

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ── Gallery Section ── */}
      <div className="pt-32 pb-24">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <ScrollReveal variant="fade-up">
              <span className="text-eyebrow !text-emerald block mb-4 uppercase tracking-[0.2em]">Visual Stories</span>
              <h1 className="text-[3rem] md:text-[5rem] font-display text-charcoal leading-[1.1] mb-6">
                Moments That <span className="italic text-sage">Matter</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white shadow-lg'
                    : 'bg-mist text-graphite hover:bg-sage/30 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  className={`relative w-full rounded-2xl overflow-hidden group break-inside-avoid ${item.height}`}
                >
                  {/* Actual Image */}
                  <ZoomableImage
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-soft-mint font-semibold block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-display font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Achievements Section ── */}
      <div className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--soft-ivory)' }}>
        {/* Decorative elements */}
        <div 
          className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: 'var(--sage)' }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'var(--emerald)' }}
        />

        <div className="container-editorial relative z-10">
          <SectionHeading
            eyebrow="Recognition"
            title="Milestones of Impact"
            subtitle="Awards, honors, and key moments that mark the journey of theatre-based education and community transformation."
            alignment="center"
            className="mb-16"
          />

          <ScrollReveal stagger staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.title}
                  className="group relative rounded-3xl p-6 md:p-8 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
                  }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Year badge */}
                  <span 
                    className="text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full inline-block mb-5"
                    style={{ 
                      color: 'var(--deep-teal)',
                      background: 'rgba(13, 79, 79, 0.06)',
                    }}
                  >
                    {achievement.year}
                  </span>

                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, var(--deep-teal), var(--emerald))' }}
                  >
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 
                    className="text-lg font-display font-semibold mb-2"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {achievement.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--graphite)' }}
                  >
                    {achievement.description}
                  </p>

                  {/* Category tag */}
                  <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                    <span 
                      className="text-[10px] font-medium uppercase tracking-[0.15em]"
                      style={{ color: 'var(--silver)' }}
                    >
                      {achievement.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

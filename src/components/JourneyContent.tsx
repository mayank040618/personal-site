'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const milestones = [
  {
    year: '2008',
    title: 'The First Stage',
    description: 'Started the journey in theatre, discovering the profound impact of storytelling on human psychology and communication.',
  },
  {
    year: '2012',
    title: 'Founding HOPE',
    description: 'Launched the HOPE initiative to bring theatre pedagogy to marginalized communities, focusing on emotional rehabilitation.',
  },
  {
    year: '2016',
    title: 'Stage4You',
    description: 'Created Stage4You, a platform giving thousands of students their first opportunity to perform and overcome stage fright.',
  },
  {
    year: '2019',
    title: 'TEDx Speaker',
    description: 'Delivered a TEDx talk on the transformative power of theatre in modern education, reaching a global audience.',
  },
  {
    year: '2023',
    title: 'PhD Research',
    description: 'Began doctoral research exploring the quantitative impact of theatre-based training on communication anxiety.',
  }
];

export default function JourneyContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow !text-sage block mb-4">The Timeline</span>
            <h1 className="text-[3rem] md:text-[5rem] font-display text-charcoal leading-[1.1] mb-6">
              A Journey of <br/><span className="italic text-emerald">Purpose & Passion</span>
            </h1>
          </ScrollReveal>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto py-10">
          {/* Animated Central Line */}
          <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-px bg-mist/50 -translate-x-1/2">
            <motion.div 
              className="w-full bg-gradient-to-b from-emerald to-deep-teal" 
              style={{ height: lineHeight, transformOrigin: 'top' }}
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {milestones.map((milestone, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={milestone.year} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-16`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-12 md:left-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(27,122,90,0.4)]" />

                  {/* Content (Text) */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <ScrollReveal variant={isEven ? 'slide-right' : 'slide-left'}>
                      <span className="text-4xl md:text-6xl font-display font-bold text-mist/60 block mb-2">{milestone.year}</span>
                      <h3 className="text-2xl font-display text-charcoal mb-4">{milestone.title}</h3>
                      <p className="text-graphite leading-relaxed">{milestone.description}</p>
                    </ScrollReveal>
                  </div>

                  {/* Content (Image Placeholder) */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <ScrollReveal variant={isEven ? 'slide-left' : 'slide-right'}>
                      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-soft-ivory to-mist shadow-lg overflow-hidden group relative">
                        <div className="absolute inset-0 flex items-center justify-center text-charcoal/40 font-mono text-sm tracking-widest group-hover:scale-105 transition-transform duration-700">
                          MILESTONE {milestone.year}
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

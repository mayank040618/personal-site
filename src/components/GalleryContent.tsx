'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const categories = ['All', 'Workshops', 'Theatre', 'Corporate', 'Speaking'];

const galleryItems = [
  { id: 1, category: 'Workshops', title: 'Student Empathy Workshop', height: 'h-96', bg: 'bg-sage/40' },
  { id: 2, category: 'Theatre', title: 'Annual Play Direction', height: 'h-64', bg: 'bg-emerald/30' },
  { id: 3, category: 'Corporate', title: 'Leadership Offsite', height: 'h-80', bg: 'bg-deep-teal/40' },
  { id: 4, category: 'Speaking', title: 'TEDx Talk 2019', height: 'h-[28rem]', bg: 'bg-forest/30' },
  { id: 5, category: 'Workshops', title: 'Voice Modulation Training', height: 'h-72', bg: 'bg-soft-mint/60' },
  { id: 6, category: 'Theatre', title: 'Stage4You Event', height: 'h-96', bg: 'bg-mist' },
  { id: 7, category: 'Speaking', title: 'University Keynote', height: 'h-64', bg: 'bg-sage/30' },
  { id: 8, category: 'Corporate', title: 'Team Building Session', height: 'h-80', bg: 'bg-emerald/20' },
];

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow !text-emerald block mb-4 uppercase tracking-[0.2em]">Visual Stories</span>
            <h1 className="text-[3rem] md:text-[5rem] font-display text-charcoal leading-[1.1] mb-6">
              Moments That <span className="italic text-sage">Matter</span>
            </h1>
          </ScrollReveal>
        </div>

        {/* Filter Navigation */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category 
                    ? 'bg-deep-teal text-white border-deep-teal shadow-md' 
                    : 'bg-transparent text-graphite border-mist hover:border-deep-teal/50 hover:text-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

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
                className={`relative w-full rounded-2xl overflow-hidden group break-inside-avoid ${item.height} ${item.bg}`}
              >
                {/* Image Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
                
                {/* Simulated Image Scale Effect */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 group-hover:scale-110 transition-transform duration-700 ease-out" />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                   <span className="text-charcoal/30 font-mono text-sm tracking-widest rotate-[-45deg] font-bold">PHOTO {item.id}</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] uppercase tracking-widest text-soft-mint font-semibold block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display font-medium text-white opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

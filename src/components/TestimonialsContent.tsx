'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Ananya Krishnan',
    title: 'Dean, School of Humanities',
    institution: 'IIT Delhi',
    image: 'AK',
    text: "Prabhat's workshop didn't just improve our communication — it changed the way our entire team thinks about collaboration and leadership. His unique theatre-based approach breaks down professional barriers instantly.",
    date: 'March 2023'
  },
  {
    id: 2,
    name: 'Rajesh Sharma',
    title: 'VP of Human Resources',
    institution: 'TechMahindra',
    image: 'RS',
    text: "We invited Prabhat for a corporate leadership offsite. I have never seen a facilitator engage a crowd of 200 executives so effortlessly. The empathy and confidence he instilled in just two days is remarkable.",
    date: 'August 2023'
  },
  {
    id: 3,
    name: 'Meera Desai',
    title: 'Student Participant',
    institution: 'Stage4You Initiative',
    image: 'MD',
    text: "Before Prabhat sir's workshop, I couldn't speak in front of three people without trembling. Today, I am the lead debater of my college. He doesn't teach you how to speak; he helps you find your courage.",
    date: 'January 2024'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    title: 'Director',
    institution: 'National School of Drama (Alumni)',
    image: 'VS',
    text: "A true master of his craft. Prabhat blends academic rigor with the raw, emotional power of theatre. His methodologies on communication anxiety should be mandatory studying for all educators.",
    date: 'May 2024'
  }
];

export default function TestimonialsContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="bg-soft-ivory min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-sage/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-soft-mint/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow !text-deep-teal block mb-4 uppercase tracking-[0.2em]">Recommendations</span>
            <h1 className="text-[3rem] md:text-[5rem] font-display text-charcoal leading-[1.1] mb-6">
              Voices of <span className="italic text-emerald">Transformation</span>
            </h1>
          </ScrollReveal>
        </div>

        <div className="max-w-5xl mx-auto relative">
          
          {/* Carousel Controls */}
          <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-20">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center text-charcoal hover:bg-white hover:scale-110 transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-20">
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center text-charcoal hover:bg-white hover:scale-110 transition-all shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="relative h-[450px] md:h-[350px] w-full flex justify-center items-center perspective-1000">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, rotateY: -10 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute w-full max-w-3xl"
              >
                {/* LinkedIn-Style Glass Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(26,60,52,0.06)] relative overflow-hidden group">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-sage/20 group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Header / Profile */}
                  <div className="flex items-center gap-5 mb-8 border-b border-mist/50 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sage to-deep-teal p-0.5">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-deep-teal font-display text-xl font-bold">
                        {testimonials[currentIndex].image}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-charcoal leading-tight mb-1">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-graphite font-medium">{testimonials[currentIndex].title}</p>
                      <p className="text-xs text-silver mt-0.5">{testimonials[currentIndex].institution}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <p className="text-lg md:text-xl text-charcoal leading-relaxed italic">
                      "{testimonials[currentIndex].text}"
                    </p>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-mist/50 flex justify-between items-center text-xs text-silver font-medium">
                    <span>Verified Recommendation</span>
                    <span>{testimonials[currentIndex].date}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-8 bg-deep-teal' : 'w-2 bg-mist'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

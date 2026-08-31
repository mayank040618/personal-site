'use client';

import AnimatedText from '@/components/ui/AnimatedText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import FloatingShapes from '@/components/ui/FloatingShapes';
import OrganicInkEffect from '@/components/ui/OrganicInkEffect';

export default function TheatreInEducationContent() {
  return (
    <div className="min-h-screen bg-forest">
      {/* 1. Cinematic Hero (Sticky Parallax) */}
      <section className="sticky top-0 h-[70vh] sm:h-[90vh] flex items-center justify-center overflow-hidden pt-20 z-0" data-theme="dark">
        <div className="absolute inset-0 bg-forest">
          {/* Placeholder for dramatic workshop photo */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-t from-forest via-transparent to-transparent z-10" />
          <OrganicInkEffect theme="emerald" autoPlay={true} />
          <FloatingShapes count={6} mouseReactive={true} colors={['rgba(200, 230, 208, 0.15)', 'rgba(255, 255, 255, 0.05)', 'rgba(143, 174, 139, 0.1)']} />
        </div>
        
        <div className="container-editorial relative z-10 text-center text-white mt-12">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow !text-soft-mint block mb-6 tracking-widest uppercase">
              The Emotional Center
            </span>
          </ScrollReveal>
          <AnimatedText
            text={"WHERE THEATRE\nMEETS EDUCATION"}
            className="text-[clamp(2.5rem,8vw,7rem)] font-display mb-4 md:mb-8 leading-[0.9] whitespace-pre-line px-4"
            variant="slide-up"
            tag="h1"
          />
          <ScrollReveal variant="fade-up" delay={0.4}>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] font-light text-white/80 max-w-3xl mx-auto px-4 md:px-0">
              Theatre isn&apos;t just performance — it&apos;s the most powerful pedagogical tool for building confidence, empathy, and authentic communication.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wrapper for the rest of the page to scroll over the sticky hero */}
      <div className="relative z-10 bg-off-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] mt-[-3rem] md:mt-[-5rem]">
        {/* 2. Impact Statistics */}
        <section className="py-12 md:py-24 relative">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:divide-x divide-mist/50">
            <div>
              <Counter end={50} suffix="+" label="Workshops" duration={2} />
            </div>
            <div>
              <Counter end={50} suffix="+" label="Institutions" duration={2} />
            </div>
            <div>
              <Counter end={100} suffix="K+" label="Students Reached" duration={2.5} />
            </div>
            <div>
              <Counter end={10} suffix="+" label="Years of Impact" duration={2} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Storytelling & Student Transformation */}
      <section className="py-24 relative">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <ScrollReveal variant="fade-up">
                <span className="text-sage font-medium tracking-wider uppercase text-sm mb-4 block">
                  Theatre in Education (TIE)
                </span>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display text-charcoal mb-8 leading-[1.1]">
                  Why Theatre in <br/><span className="text-sage italic">Education?</span>
                </h2>
                <p className="text-body-lg text-graphite mb-8 leading-relaxed max-w-3xl mx-auto">
                  Theatre in Education (TIE) empowers students through artistic expression, critical thinking, and social awareness. By engaging in self-discovery, creativity, and the exploration of societal roles, participants build empathy, teamwork, and confidence — alongside a deeper understanding of storytelling and performance.
                </p>
                <p className="text-body-lg text-graphite leading-relaxed">
                  These aren&apos;t just performance skills. They translate directly into academic and professional practice, making learning more experiential, engaging, and meaningful — whether in a classroom, a training room, or a boardroom.
                </p>
              </ScrollReveal>
            </div>
            <div className="relative">
              <ScrollReveal variant="scale">
                <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-sage to-emerald relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-white/80">
                    <p className="font-mono text-sm tracking-widest text-center px-4">STUDENT TRANSFORMATION PHOTO</p>
                  </div>
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </ScrollReveal>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-soft-mint/30 rounded-full blur-[60px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Immersive Quote */}
      <section className="py-16 md:py-32 relative bg-forest overflow-hidden mt-10 md:mt-20" data-theme="dark">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container-editorial relative z-10 text-center max-w-5xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <span className="text-[clamp(5rem,15vw,12rem)] font-display text-emerald/30 leading-none block mb-4">
              &ldquo;
            </span>
            <h3 className="text-[clamp(1.5rem,5vw,4rem)] font-display text-white leading-[1.2] italic mb-8 md:mb-12 -mt-6 md:-mt-16 relative z-10">
              Every person has a story worth telling. Theatre simply gives them the courage and the stage to finally tell it.
            </h3>
            <p className="text-soft-mint tracking-[0.2em] text-sm uppercase font-semibold">
              Prabhat Singh Rajput
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Workshop Moments (Masonry / Grid) */}
      <section className="py-16 md:py-32 relative bg-off-white px-4 md:px-0">
        <div className="container-editorial">
          <ScrollReveal variant="fade-up">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display text-charcoal mb-10 md:mb-16 text-center leading-none">
              Moments of <br/><span className="italic text-emerald">Discovery</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="aspect-square rounded-2xl bg-mist shadow-lg overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-sage/40 to-deep-teal/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-xs font-mono text-white/80 tracking-wider">WORKSHOP 1</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.3}>
              <div className="aspect-[3/4] rounded-2xl bg-mist shadow-lg overflow-hidden group mt-0 md:mt-16">
                <div className="w-full h-full bg-gradient-to-br from-emerald/40 to-forest/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-xs font-mono text-white/80 tracking-wider">WORKSHOP 2</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.5}>
              <div className="aspect-square rounded-2xl bg-mist shadow-lg overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-soft-mint/40 to-sage/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-xs font-mono text-white/80 tracking-wider">WORKSHOP 3</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

'use client';

import AnimatedText from '@/components/ui/AnimatedText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import TypingText from '@/components/ui/TypingText';
import LivePerformanceEffect from '@/components/ui/LivePerformanceEffect';

export default function Stage4YouContent() {
  return (
    <div className="min-h-screen bg-charcoal">
      {/* 1. Cinematic Hero */}
      <section className="sticky top-0 h-[70vh] sm:h-[90vh] flex items-center justify-center overflow-hidden pt-20 z-0" data-theme="dark">
        <div className="absolute inset-0 bg-charcoal">
          <LivePerformanceEffect />
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-t from-charcoal via-transparent to-transparent z-10 pointer-events-none" />
        </div>
        
        <div className="container-editorial relative z-10 text-center text-white mt-12 px-4">
          <ScrollReveal variant="fade-up">
            <span className="text-eyebrow !text-amber-500 block mb-6 tracking-widest uppercase">
              Talent Showcase & Competition
            </span>
          </ScrollReveal>
          <AnimatedText
            text={"Stage4You"}
            className="text-[clamp(3.5rem,12vw,10rem)] font-display mb-4 md:mb-8 leading-[0.9] tracking-tight"
            variant="slide-up"
            tag="h1"
          />
          <ScrollReveal variant="fade-up" delay={0.4}>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] font-light text-white/80 max-w-3xl mx-auto">
              Built to give performers a real stage — and a real shot.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wrapper */}
      <div className="relative z-10 bg-off-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] mt-[-3rem] md:mt-[-5rem]">
        
        {/* 2. Impact Statistics */}
        <section className="py-12 md:py-24 relative px-4">
          <div className="container-editorial">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:divide-x divide-mist/50">
              <div>
                <Counter end={100} suffix="K+" label="Community Members" duration={2.5} />
              </div>
              <div>
                <Counter end={500} suffix="+" label="Performers" duration={2} />
              </div>
              <div>
                <Counter end={50} suffix="+" label="Competitions" duration={2} />
              </div>
              <div>
                <Counter end={1} suffix="M+" label="Audience Reached" duration={3} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Mission */}
        <section className="py-24 relative px-4">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <ScrollReveal variant="fade-up">
                  <span className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                    The Platform
                  </span>
                  <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display text-charcoal mb-8 leading-[1.1] text-balance">
                    Turning Raw Potential into <span className="text-amber-600 italic">Recognized Performance</span>
                  </h2>
                  <p className="text-body-lg text-graphite mb-8 leading-relaxed max-w-3xl mx-auto">
                    Stage4You is a talent showcase and competition platform built to give performers a real stage — and a real shot.
                  </p>
                  <p className="text-body-lg text-graphite leading-relaxed">
                    From first-timers to seasoned performers, Stage4You creates the platform for people to put their talent in front of an audience, compete, and get discovered.
                  </p>
                </ScrollReveal>
              </div>
              <div className="relative">
                <ScrollReveal variant="scale">
                  <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-charcoal to-graphite relative group">
                    <div className="absolute inset-0 flex items-center justify-center text-white/80">
                      <p className="font-mono text-sm tracking-widest text-center px-4">LIVE PERFORMANCE</p>
                    </div>
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </ScrollReveal>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-amber-500/20 rounded-full blur-[60px] -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Immersive Quote */}
        <section className="py-16 md:py-32 relative bg-charcoal overflow-hidden mt-10 md:mt-20" data-theme="dark">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="container-editorial relative z-10 text-center max-w-5xl mx-auto px-6">
            <ScrollReveal variant="fade-up">
              <span className="text-[clamp(5rem,15vw,12rem)] font-display text-amber-500/20 leading-none block mb-4">
                &ldquo;
              </span>
              <TypingText
                text="Everyone deserves a stage. We just decided to build it for them."
                className="text-[clamp(1.5rem,5vw,4rem)] font-display text-white leading-[1.2] italic mb-8 md:mb-12 -mt-6 md:-mt-16 relative z-10 text-balance"
                tag="h3"
                speed={40}
                delay={200}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Event Moments (Masonry / Grid) */}
        <section className="py-16 md:py-32 relative bg-off-white px-4 md:px-0">
          <div className="container-editorial">
            <ScrollReveal variant="fade-up">
              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display text-charcoal mb-10 md:mb-16 text-center leading-none text-balance">
                The Spotlight <br/><span className="italic text-amber-600">Awaits</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <ScrollReveal variant="fade-up" delay={0.1}>
                <div className="aspect-square rounded-2xl bg-mist shadow-lg overflow-hidden group">
                  <div className="w-full h-full bg-gradient-to-br from-charcoal/40 to-graphite/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-xs font-mono text-white/80 tracking-wider">SHOWCASE 1</span>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="aspect-[3/4] rounded-2xl bg-mist shadow-lg overflow-hidden group mt-0 md:mt-16">
                  <div className="w-full h-full bg-gradient-to-br from-amber-600/40 to-charcoal/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-xs font-mono text-white/80 tracking-wider">SHOWCASE 2</span>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.5}>
                <div className="aspect-square rounded-2xl bg-mist shadow-lg overflow-hidden group">
                  <div className="w-full h-full bg-gradient-to-br from-graphite/40 to-amber-600/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-xs font-mono text-white/80 tracking-wider">SHOWCASE 3</span>
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

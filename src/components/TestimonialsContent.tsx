'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sangeet Banik',
    title: 'Associate Program manager | Program Management',
    institution: 'Nxtwave',
    image: 'SB',
    text: "I had the opportunity to work with Prabhat Singh during the online placement assessment process... I was impressed by his leadership, planning, and sense of accountability. From maintaining discipline to arranging technical support, he handled everything very efficiently. I would gladly recommend him for his coordination and leadership skills.",
    date: 'March 23, 2026'
  },
  {
    id: 2,
    name: 'Er. Gourav Tomar',
    title: 'Assistant Professor | Civil Engineer',
    institution: 'Govt. College',
    image: 'GT',
    text: "I can confidently say that he is an exceptional professional with a strong commitment to excellence. He consistently demonstrates deep subject knowledge and the ability to handle responsibilities with great efficiency. He brings innovative ideas that add real value to the organization.",
    date: 'March 17, 2026'
  },
  {
    id: 3,
    name: 'Dr. Himdweep Walia',
    title: 'Associate Consultant @ TCS',
    institution: 'Amity University',
    image: 'HW',
    text: "He impressed me with his professionalism, resourcefulness, and ability to smoothly manage multiple aspects of the program. His proactive approach and attention to detail ensured everything ran seamlessly. It's great to see professionals like him enabling strong industry-academia engagement.",
    date: 'March 8, 2026'
  },
  {
    id: 4,
    name: 'Vibhor Pratap Singh',
    title: 'PhD Scholar @ BHU | Asst. Professor @ UPES',
    institution: 'JECRC',
    image: 'VS',
    text: "Prabhat brings a charming personality to the workplace, making collaboration both productive and enjoyable. What truly distinguishes him is his creative approach to problem-solving combined with a deeply empathetic nature. He has a thoughtful way of engaging with people and ideas.",
    date: 'March 6, 2026'
  },
  {
    id: 5,
    name: 'Juhi Singh',
    title: 'Tedx Speaker | WEF Award',
    institution: 'Amity University',
    image: 'JS',
    text: "A dynamic and optimistic professional with strong management and communication skills. Prabhat is highly dedicated, and any team he is part of will benefit from his commitment and ability to achieve targets successfully.",
    date: 'March 6, 2026'
  },
  {
    id: 6,
    name: 'Himanshu Jain',
    title: 'Student Counselling & Career Guidance',
    institution: 'Colleague',
    image: 'HJ',
    text: "Prabhat was one of the most dependable team members I have worked with. His calm demeanor, ability to stay composed under pressure, and deep understanding of his work made him a valuable asset to the team. Always willing to go the extra mile.",
    date: 'September 24, 2025'
  },
  {
    id: 7,
    name: 'Sachin Pasricha',
    title: 'Founder @ Clear Bracket',
    institution: 'Colleague',
    image: 'SP',
    text: "Prabhat has been a wonderful team member and a great human being. He's there to help, no matter what. Appreciate his dedication to his work and team. Wishing him all the best for his future endeavours.",
    date: 'January 22, 2023'
  },
  {
    id: 8,
    name: 'Deepak Bagchi',
    title: 'Outreach & Channel Partner',
    institution: 'Colleague',
    image: 'DB',
    text: "You do so many things without uttering a single word with perfection that I find no one else could do but you. Your humor and empathy fostered a comforting work environment, and I miss your energy & warming presence.",
    date: 'January 19, 2023'
  },
  {
    id: 9,
    name: 'Chayanika Gogoi',
    title: 'Student Recruitment Specialist',
    institution: 'Colleague',
    image: 'CG',
    text: "He is amazing at his job! A hard worker and an excellent person in terms of providing proper career guidance. He has a natural ability to communicate with others and know just what to say at the right time.",
    date: 'January 18, 2023'
  },
  {
    id: 10,
    name: 'Arpit Agrawal',
    title: 'Vice Chairperson',
    institution: 'JECRC University',
    image: 'AA',
    text: "His ability to go out of his way to help others has made him stand out. Being a Gen Z person his enthusiasm for theatrical exposure and live art really impressed me. His ability to tackle any problem is remarkable and with a warm smile.",
    date: 'January 5, 2022'
  },
  {
    id: 11,
    name: 'M.Kuruvilla',
    title: 'Senior Assistant Professor',
    institution: 'JECRC University',
    image: 'MK',
    text: "Prabhat is a sincere person with team spirit. He has high Emotional Quotient. His maturity of thought process makes him incredible in Decision making.",
    date: 'December 20, 2021'
  },
  {
    id: 12,
    name: 'Falguni Dixit',
    title: 'Communication & Social Media Manager',
    institution: 'Colleague',
    image: 'FD',
    text: "Writing recommendation for Prabhat was not easy for me because words can't do justice with the kind of grit and determination he put in every task he does at such a young age. I highly recommend you to reach him out for anything from reel life to real life.",
    date: 'December 18, 2021'
  },
  {
    id: 13,
    name: 'P.Shivani Singh',
    title: 'Head of IPR Cell',
    institution: 'JECRC University',
    image: 'PS',
    text: "Prabhaat is full of new thoughts and ideas to amplify the students experiences. He put his heart and soul to the work he picks and than magic happens. I have seen him growing with grace on his professional front and he is such a dedicated person with versatile talent.",
    date: 'December 17, 2021'
  }
];

function CinematicTestimonial({ 
  testimonial, 
  index, 
  total, 
  scrollYProgress 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number; 
  total: number;
  scrollYProgress: any;
}) {
  const center = index / (total - 1);
  const step = 1 / (total - 1);
  const spread = step * 0.8;
  
  const inputRange: number[] = [0];
  const opacityOutput: number[] = [0];
  const yOutput: number[] = [150];
  const scaleOutput: number[] = [0.9];
  const rotateXOutput: number[] = [45];

  if (index === 0) {
    opacityOutput[0] = 1;
    yOutput[0] = 0;
    scaleOutput[0] = 1;
    rotateXOutput[0] = 0;
  }

  if (center - spread > 0) {
    inputRange.push(center - spread);
    opacityOutput.push(0);
    yOutput.push(150);
    scaleOutput.push(0.9);
    rotateXOutput.push(45);
  }

  if (index !== 0 && index !== total - 1) {
    inputRange.push(center);
    opacityOutput.push(1);
    yOutput.push(0);
    scaleOutput.push(1);
    rotateXOutput.push(0);
  }

  if (center + spread < 1) {
    inputRange.push(center + spread);
    opacityOutput.push(0);
    yOutput.push(-150);
    scaleOutput.push(0.9);
    rotateXOutput.push(-45);
  }

  inputRange.push(1);
  if (index === total - 1) {
    opacityOutput.push(1);
    yOutput.push(0);
    scaleOutput.push(1);
    rotateXOutput.push(0);
  } else {
    opacityOutput.push(0);
    yOutput.push(-150);
    scaleOutput.push(0.9);
    rotateXOutput.push(-45);
  }

  const opacity = useTransform(scrollYProgress, inputRange, opacityOutput);
  const y = useTransform(scrollYProgress, inputRange, yOutput);
  const scale = useTransform(scrollYProgress, inputRange, scaleOutput);
  const rotateX = useTransform(scrollYProgress, inputRange, rotateXOutput);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-24"
      style={{ opacity, transformStyle: 'preserve-3d' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 max-w-7xl mx-auto w-full items-center">
        {/* Left Side: Name and Title */}
        <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
          <motion.div style={{ y, rotateX }} className="relative">
            {/* Massive decorative quote mark */}
            <div className="text-[12rem] md:text-[16rem] leading-none font-serif absolute -top-24 -left-12 select-none pointer-events-none" style={{ color: 'rgba(13, 79, 79, 0.05)' }}>
              &ldquo;
            </div>
            
            <div className="relative z-10 border-l-2 pl-6 py-2" style={{ borderColor: 'var(--deep-teal)' }}>
              <h3 className="text-3xl md:text-5xl font-display mb-3" style={{ color: 'var(--charcoal)' }}>{testimonial.name}</h3>
              <p className="text-xs md:text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--deep-teal)' }}>{testimonial.institution}</p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--graphite)' }}>{testimonial.title}</p>
            </div>
          </motion.div>
        </div>
        
        {/* Right Side: Quote */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <motion.p 
            style={{ y, scale, rotateX, color: 'var(--charcoal)' }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight font-light font-display"
          >
            {testimonial.text}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Haptic feedback logic
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which testimonial is currently in the center of the screen
    const total = testimonials.length;
    const currentIndex = Math.round(latest * (total - 1));
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
      
      // Trigger a short haptic vibration on supported devices
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(30); // 30ms vibration feels like a subtle click/tick
      }
    }
  });

  return (
    <div style={{ background: 'var(--soft-ivory)' }}>
      {/* ─── Hero Introduction ─── */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-[0.35em] mb-6" style={{ color: 'var(--deep-teal)' }}>
            The Impact
          </span>
          <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-display leading-[0.95] mb-8" style={{ color: 'var(--charcoal)' }}>
            Voices of
            <br />
            <span className="italic opacity-90 block break-words" style={{ color: 'var(--emerald)' }}>Transformation</span>
          </h1>
          <p className="text-lg md:text-xl font-light" style={{ color: 'var(--graphite)' }}>
            Scroll to experience what peers, clients & mentors say.
          </p>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to bottom, var(--deep-teal), transparent)' }} />
        </motion.div>
      </div>

      {/* ─── Cinematic Scroll Section ─── */}
      <div 
        ref={containerRef} 
        style={{ height: '500vh' }} // Reduced to 500vh so a very small flick of the finger brings the next testimonial
        className="relative"
      >
        {/* This container sticks to the screen while you scroll through the 500vh */}
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" 
          style={{ background: 'var(--off-white)', perspective: '1200px' }}
        >
          
          {/* Scroll Progress Bar (Left edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] z-20" style={{ background: 'rgba(0,0,0,0.05)' }}>
            <motion.div 
              className="w-full"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                background: 'linear-gradient(to bottom, var(--deep-teal), var(--emerald))'
              }}
            />
          </div>

          {/* Testimonial Layers */}
          {testimonials.map((testimonial, i) => (
            <CinematicTestimonial 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={i} 
              total={testimonials.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}


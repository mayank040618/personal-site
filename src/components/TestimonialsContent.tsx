'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Sangeet Banik',
    title: 'Associate Program manager | Program Management | Program Operations',
    institution: 'Nxtwave',
    image: 'SB',
    text: "I had the opportunity to work with Prabhat Singh during the online placement assessment process for Nxtwave at Amity University Greater Noida, and it was a very smooth experience. Even though we worked together for only one day, I was impressed by his leadership, planning, and sense of accountability. Prabhat took full responsibility for keeping students informed throughout the process and ensured everything was well coordinated. From maintaining discipline during the assessment to arranging labs, invigilators, and technical support for system or network issues, he handled everything very efficiently. What I appreciated most was his hospitality, communication, and the way he managed every detail with professionalism. It was a pleasure working with him, and I would gladly recommend him for his coordination and leadership skills.",
    date: 'March 23, 2026'
  },
  {
    id: 2,
    name: 'Er. Gourav Tomar',
    title: 'Assistant Professor | Civil Engineer | Structural Engineer',
    institution: 'Former Govt. College Lecturer',
    image: 'GT',
    text: "I have had the pleasure of working with Mr. Prabhat Singh, and I can confidently say that they are an exceptional professional with a strong commitment to excellence. He consistently demonstrates deep subject knowledge, a proactive attitude, and the ability to handle responsibilities with great efficiency. Whether it is managing academic initiatives, coordinating events, or mentoring students, Prabhat ji always delivers with precision and dedication. One of the most impressive qualities is his ability to collaborate effectively with team members while maintaining a positive and solution-oriented approach. He is not only dependable but also brings innovative ideas that add real value to the organization. I highly recommend Mr. Prabhat for any professional role that demands integrity, expertise, and leadership. It is truly a privilege to work alongside such a committed and inspiring individual. Wishing him continued success in all future endeavors.",
    date: 'March 17, 2026'
  },
  {
    id: 3,
    name: 'Dr. Himdweep Walia',
    title: 'Associate Consultant at Tata Consultancy Services',
    institution: 'Amity University (Former)',
    image: 'HW',
    text: "I had the opportunity to interact with Prabhat at Amity University, during two programs organized by the university. On both occasions, he impressed me with his professionalism, resourcefulness, and ability to smoothly manage multiple aspects of the program. His proactive approach and attention to detail ensured everything ran seamlessly. It's great to see professionals like him enabling strong industry-academia engagement.",
    date: 'March 8, 2026'
  },
  {
    id: 4,
    name: 'Vibhor Pratap Singh',
    title: 'PhD Scholar in BHU | Assistant Professor in UPES',
    institution: 'JECRC, Jaipur (Former)',
    image: 'VS',
    text: "I had the pleasure of working with Prabhat Singh at JECRC, Jaipur. During that time, he consistently stood out as a hardworking and dependable colleague. Prabhat brings a charming personality to the workplace, making collaboration both productive and enjoyable. What truly distinguishes him is his creative approach to problem-solving combined with a deeply empathetic nature. He has a thoughtful way of engaging with people and ideas, which enables him to contribute meaningfully to any team he is part of. I am confident that Prabhat will continue to excel in his professional journey and be an asset wherever he goes.",
    date: 'March 6, 2026'
  },
  {
    id: 5,
    name: 'Juhi Singh',
    title: 'Tedx Speaker | WEF Award | Retail Operations Manager',
    institution: 'Amity University (Client)',
    image: 'JS',
    text: "I had the pleasure of meeting Prabhat Singh at a business event at Amity University, Noida. He is a dynamic and optimistic professional with strong management and communication skills. Prabhat is highly dedicated, and any team he is part of will benefit from his commitment and ability to achieve targets successfully.",
    date: 'March 6, 2026'
  },
  {
    id: 6,
    name: 'Himanshu Jain',
    title: 'Student Counselling & Career Guidance | Admissions Advisory',
    institution: 'Colleague',
    image: 'HJ',
    text: "Prabhat was one of the most dependable team members I have worked with. He consistently demonstrated true professionalism and acted with utmost maturity in every situation. His calm demeanor, ability to stay composed under pressure, and deep understanding of his work made him a valuable asset to the team. Prabhat is proactive, reliable, and always willing to go the extra mile to ensure tasks are completed with excellence. I strongly recommend him to any organization looking for a dedicated and skilled professional.",
    date: 'September 24, 2025'
  },
  {
    id: 7,
    name: 'Sachin Pasricha',
    title: 'Founder @ Clear Bracket | Design Hiring Partner',
    institution: 'Colleague',
    image: 'SP',
    text: "Prabhat has been a wonderful team member and a great human being. He's there to help, no matter what. Appreciate his dedication to his work and team. Wishing him all the best for his future endeavours.",
    date: 'January 22, 2023'
  },
  {
    id: 8,
    name: 'Deepak Bagchi',
    title: 'Outreach | Channel Partner | Sales | Career Counselling',
    institution: 'Colleague',
    image: 'DB',
    text: "Prabhat Singh, you are one of the finest team player I worked with. You do so many things without uttering a single word with perfection that I find no one else could do but you. The way you involve yourself to find the solution to challenge is incredible & how you support your team members weather professionally or personally is mesmerizing. You have a very very long way to go. I wish all the success for you. Your humor and empathy fostered a comforting work environment, and I miss your energy & warming presence. I'm fortunate to have had the time to work along with him, and I will always recommend Prabhat to any company interested in working with him.",
    date: 'January 19, 2023'
  },
  {
    id: 9,
    name: 'Chayanika Gogoi',
    title: 'Student Recruitment Specialist | College Representative',
    institution: 'Colleague',
    image: 'CG',
    text: "I highly recommend Prabhat as a counselor and would love to work together again. He is amazing at his job! He's a hard worker and an excellent person in terms of providing proper career guidance to the students and parents. As a member of our team, he was responsible for exceeding application targets cold-calling, and building relationships. He has a natural ability to communicate with others and know just what to say at the right time. He had these skills in spades. Applicants liked him because he was able to establish real connections with them. You have a long way to go. I wish you luck and success.",
    date: 'January 18, 2023'
  },
  {
    id: 10,
    name: 'Arpit Agrawal',
    title: 'Vice Chairperson',
    institution: 'JECRC University (Manager)',
    image: 'AA',
    text: "I have worked with many people throughout my journey, but Prabhat is a unique one to work. He joined my team last year, and since then Prabhat and I have worked on several initiatives related to branding, outreach, team building. I must say he is easily adjustable to a given situation. His ability to go out of his way to help others has made him stand out. Being a Gen Z person his enthusiasm for theatrical exposure, his love for live art is something that really impressed me. Prabhat is one of the best people I have as a youngest colleague. His ability to tackle any problem is remarkable and with a warm smile. I highly recommend his expertise to any person who want to seek an advice on team building as well as theatre.",
    date: 'January 5, 2022'
  },
  {
    id: 11,
    name: 'M.Kuruvilla',
    title: 'Senior Assistant Professor',
    institution: 'JECRC University, Jaipur',
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

// Individual sticky card component with scroll-driven animations
function TestimonialCard({ 
  testimonial, 
  index, 
  totalCards 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number; 
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);



  return (
    <div
      ref={cardRef}
      className="h-[85vh] flex items-center justify-center px-4 md:px-6"
      style={{ 
        position: 'sticky',
        top: `calc(80px + ${index * 16}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="w-full max-w-[900px] mx-auto"
      >
        <div 
          className="relative rounded-[28px] overflow-hidden backdrop-blur-sm"
          style={{ 
            background: `linear-gradient(145deg, var(--white) 0%, var(--off-white) 100%)`,
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 18px 36px -18px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0,0,0,0.03)',
          }}
        >
          {/* Subtle top accent line */}
          <div 
            className="h-[3px] w-full"
            style={{ background: 'linear-gradient(90deg, var(--deep-teal), var(--emerald), var(--sage))' }}
          />

          <div className="p-8 md:p-14 lg:p-16">
            {/* Top row: Number + Institution */}
            <div className="flex items-center justify-between mb-10">
              <span 
                className="text-xs font-mono uppercase tracking-[0.25em]"
                style={{ color: 'var(--silver)' }}
              >
                {String(index + 1).padStart(2, '0')} — {totalCards}
              </span>
              <span 
                className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                style={{ 
                  color: 'var(--deep-teal)',
                  background: 'rgba(13, 79, 79, 0.06)',
                }}
              >
                {testimonial.institution}
              </span>
            </div>

            {/* Quote Icon */}
            <div className="mb-8">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--deep-teal), var(--emerald))' }}
              >
                <Quote className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="mb-12">
              <p 
                className="text-xl md:text-2xl lg:text-[1.75rem] leading-[1.65] font-light"
                style={{ 
                  color: 'var(--charcoal)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </blockquote>

            {/* Divider */}
            <div 
              className="h-px w-full mb-8"
              style={{ background: 'linear-gradient(90deg, var(--mist) 0%, transparent 100%)' }}
            />

            {/* Author section */}
            <div className="flex items-center gap-5">
              {/* Avatar with gradient ring */}
              <div 
                className="w-14 h-14 shrink-0 rounded-full p-[2px]"
                style={{ background: 'linear-gradient(135deg, var(--deep-teal), var(--emerald), var(--sage))' }}
              >
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center font-display text-lg font-bold"
                  style={{ 
                    background: 'var(--white)',
                    color: 'var(--deep-teal)',
                  }}
                >
                  {testimonial.image}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 
                  className="text-lg font-semibold truncate"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {testimonial.name}
                </h3>
                <p 
                  className="text-sm truncate"
                  style={{ color: 'var(--graphite)' }}
                >
                  {testimonial.title}
                </p>
              </div>
              
              <div className="hidden md:block text-right shrink-0">
                <span 
                  className="text-xs font-medium"
                  style={{ color: 'var(--silver)' }}
                >
                  {testimonial.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TestimonialsContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Progress bar animation
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative" style={{ background: 'var(--soft-ivory)' }}>
      {/* ─── Hero Section ─── */}
      <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Ambient decorative elements */}
        <div 
          className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: 'var(--sage)' }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: 'var(--emerald)' }}
        />

        {/* Decorative large quote marks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span 
            className="text-[20rem] md:text-[30rem] font-serif leading-none opacity-[0.025]"
            style={{ color: 'var(--deep-teal)' }}
          >
            &ldquo;
          </span>
        </div>

        <ScrollReveal variant="fade-up" className="relative z-10 text-center">
          <span 
            className="inline-block text-xs font-medium uppercase tracking-[0.35em] mb-8 border rounded-full px-6 py-2.5"
            style={{ 
              color: 'var(--deep-teal)',
              borderColor: 'var(--mist)',
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Recommendations
          </span>
          <h1 
            className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-display leading-[0.95] mb-8"
            style={{ color: 'var(--charcoal)' }}
          >
            Voices of
            <br />
            <span className="italic" style={{ color: 'var(--emerald)' }}>Transformation</span>
          </h1>
          <p 
            className="text-lg md:text-xl max-w-lg mx-auto font-light mb-12"
            style={{ color: 'var(--graphite)' }}
          >
            What peers, clients & mentors say about working with Prabhat
          </p>
          
          {/* Scroll indicator */}
          <motion.div 
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span 
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'var(--silver)' }}
            >
              Scroll to explore
            </span>
            <div 
              className="w-[1px] h-12"
              style={{ background: 'linear-gradient(to bottom, var(--silver), transparent)' }}
            />
          </motion.div>
        </ScrollReveal>
      </div>

      {/* ─── Fixed Progress Bar ─── */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-[3px]"
        style={{ background: 'rgba(0,0,0,0.03)' }}
      >
        <motion.div
          className="h-full"
          style={{ 
            width: progressWidth,
            background: 'linear-gradient(90deg, var(--deep-teal), var(--emerald))',
          }}
        />
      </div>

      {/* ─── Stacked Cards Section ─── */}
      <div ref={containerRef}>
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={i}
            totalCards={testimonials.length}
          />
        ))}
      </div>

      {/* ─── Bottom Section ─── */}
      <div 
        className="py-32 text-center relative overflow-hidden"
        style={{ background: 'var(--off-white)' }}
      >
        <ScrollReveal variant="fade-up">
          <p 
            className="text-5xl md:text-7xl font-display italic leading-tight max-w-3xl mx-auto px-6"
            style={{ color: 'var(--charcoal)' }}
          >
            {testimonials.length} voices.
            <br />
            <span style={{ color: 'var(--emerald)' }}>One vision.</span>
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}


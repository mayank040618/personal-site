'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from './ui/SocialIcons';
import ScrollReveal from './ui/ScrollReveal';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Testimonials', href: '/testimonials' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Theatre in Education', href: '/theatre-in-education' },



    ],
  },
  {
    title: 'Initiatives',
    links: [
      { label: 'HOPE', href: '/hope' },
      { label: 'Stage4You', href: '/stage4you' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  
  let instagramLink = 'https://www.instagram.com/prab_singh_rajput_?igsi=ZnJnNTZxYWN1dWVk'; // Sir's Instagram
  let theme = {
    bg: 'bg-forest',
    accent: '!text-soft-mint',
    btnText: 'text-forest',
    btnHover: 'hover:bg-soft-mint',
    blob1: 'bg-emerald/5',
    blob2: 'bg-deep-teal/10'
  };

  if (pathname === '/hope') {
    instagramLink = 'https://www.instagram.com/homeofpassionevents?igsh=bmFoZzN2b291cW80'; // HOPE
    theme = {
      bg: 'bg-blue-950',
      accent: '!text-cyan-400',
      btnText: 'text-blue-950',
      btnHover: 'hover:bg-cyan-400',
      blob1: 'bg-cyan-400/5',
      blob2: 'bg-blue-600/10'
    };
  } else if (pathname === '/stage4you') {
    instagramLink = 'https://www.instagram.com/_stage4you_?igsi=OHhxZnNvbHNjbG85'; // Stage4You
    theme = {
      bg: 'bg-charcoal',
      accent: '!text-amber-500',
      btnText: 'text-charcoal',
      btnHover: 'hover:bg-amber-500',
      blob1: 'bg-amber-500/5',
      blob2: 'bg-graphite/30'
    };
  }

  const socials = [
    { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prabhatsinghrajput/' },
    { label: 'Instagram', icon: InstagramIcon, href: instagramLink },
    { label: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
    { label: 'Email', icon: Mail, href: 'mailto:prabhatweb23@gmail.com' },
  ];

  return (
    <footer className={`${theme.bg} text-white relative overflow-hidden transition-colors duration-500`}>
      {/* Top CTA Section */}
      {pathname !== '/contact' && (
        <div className="section-spacing border-b border-white/10">
          <div className="container-editorial">
            <ScrollReveal variant="fade-up" threshold={0.99}>
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                  <span className={`text-eyebrow ${theme.accent} block mb-4 transition-colors duration-500`}>
                    Let&apos;s Connect
                  </span>
                  <h2 className="text-display font-display text-white max-w-lg">
                    Ready to create something meaningful?
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white ${theme.btnText} font-medium ${theme.btnHover} transition-colors duration-300 w-full sm:w-auto`}
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Links Grid */}
      <div className="section-spacing">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            {/* Brand Column */}
            <ScrollReveal variant="fade-up" threshold={0.99}>
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image 
                      src="/images/prabhat-profile.jpeg" 
                      alt="Prabhat Singh Rajput" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <span className="font-display font-semibold text-lg">
                    Prabhat Singh
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Theatre Educator, Corporate Trainer, TEDx Speaker & PhD
                  Scholar. Transforming lives through the art of communication.
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Link Columns */}
            {footerLinks.map((group, i) => (
              <ScrollReveal key={group.title} variant="fade-up" delay={0.1 * (i + 1)} threshold={0.99}>
                <div>
                  <h3 className="text-caption !text-white/40 mb-5">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Prabhat Singh Rajput. All rights reserved.</p>
          <p>
            Crafted with purpose & passion
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-96 h-96 ${theme.blob1} rounded-full blur-[100px] pointer-events-none transition-colors duration-500`} />
      <div className={`absolute bottom-0 left-0 w-64 h-64 ${theme.blob2} rounded-full blur-[80px] pointer-events-none transition-colors duration-500`} />
    </footer>
  );
}

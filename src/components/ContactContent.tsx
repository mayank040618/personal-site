'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactContent() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  const contactInfo = [
    { label: 'Email', value: 'prabhatweb23@gmail.com', href: 'mailto:prabhatweb23@gmail.com' },
    { label: 'Phone', value: '+91-92898 30699', href: 'tel:+919289830699' },
    { label: 'LinkedIn', value: 'Prabhat Singh Rajput', href: 'https://linkedin.com/' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--soft-ivory)' }}>
      {/* Decorative background elements */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none translate-x-1/3 -translate-y-1/3"
        style={{ 
          background: 'radial-gradient(circle, var(--emerald) 0%, transparent 65%)',
          opacity: 0.12
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none -translate-x-1/3 translate-y-1/3"
        style={{ 
          background: 'radial-gradient(circle, var(--deep-teal) 0%, transparent 65%)',
          opacity: 0.1
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 min-h-screen flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Typography & Info */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col justify-between h-full">
            <div>
              <ScrollReveal variant="slide-right">
                <span 
                  className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] mb-8 border rounded-full px-5 py-2"
                  style={{ 
                    color: 'var(--deep-teal)',
                    borderColor: 'var(--mist)',
                    background: 'rgba(255,255,255,0.4)',
                  }}
                >
                  Let&apos;s Connect
                </span>
              </ScrollReveal>
              
              <ScrollReveal variant="slide-right" delay={0.1}>
                <h1 
                  className="text-5xl md:text-7xl font-display leading-[0.95] mb-8"
                  style={{ color: 'var(--charcoal)' }}
                >
                  Start a
                  <br />
                  <span className="italic relative inline-block">
                    Conversation
                    <span 
                      className="absolute bottom-1 left-0 w-full h-[30%] -z-10 opacity-30"
                      style={{ background: 'var(--emerald)' }}
                    />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="slide-right" delay={0.2}>
                <p 
                  className="text-lg font-light leading-relaxed mb-12 max-w-md"
                  style={{ color: 'var(--graphite)' }}
                >
                  Whether you&apos;re an institution looking for corporate training, a community seeking theatre workshops, or simply want to collaborate.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="slide-right" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t" style={{ borderColor: 'var(--mist)' }}>
                {contactInfo.map((info) => (
                  <div key={info.label} className="group">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--sage)' }}>
                      {info.label}
                    </p>
                    <a 
                      href={info.href}
                      className="text-base font-medium inline-block relative overflow-hidden transition-colors"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      <span className="relative z-10">{info.value}</span>
                      <span 
                        className="absolute bottom-0 left-0 w-full h-px transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: 'var(--emerald)' }}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ScrollReveal variant="fade-up" delay={0.4} className="h-full">
              <div 
                className="rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center"
                style={{ 
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.05)',
                }}
              >
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--emerald)' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-display mb-4" style={{ color: 'var(--charcoal)' }}>Message Sent</h3>
                      <p style={{ color: 'var(--graphite)' }}>Thank you for reaching out. I&apos;ll get back to you shortly.</p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="mt-8 text-sm uppercase tracking-widest font-medium border-b border-transparent hover:border-current transition-colors pb-1"
                        style={{ color: 'var(--deep-teal)' }}
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* Name Field */}
                      <div className="relative group">
                        <label 
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            activeField === 'name' || formData.name ? '-top-5 text-[10px] uppercase tracking-widest' : 'top-3 text-base'
                          } ${activeField === 'name' ? 'text-emerald-700' : 'text-gray-400'}`}
                        >
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setActiveField('name')}
                          onBlur={(e) => !e.target.value && setActiveField(null)}
                          className="w-full bg-transparent border-b pb-3 pt-3 focus:outline-none transition-colors"
                          style={{ borderColor: activeField === 'name' ? 'var(--emerald)' : 'var(--mist)', color: 'var(--charcoal)' }}
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative group">
                        <label 
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            activeField === 'email' || formData.email ? '-top-5 text-[10px] uppercase tracking-widest' : 'top-3 text-base'
                          } ${activeField === 'email' ? 'text-emerald-700' : 'text-gray-400'}`}
                        >
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setActiveField('email')}
                          onBlur={(e) => !e.target.value && setActiveField(null)}
                          className="w-full bg-transparent border-b pb-3 pt-3 focus:outline-none transition-colors"
                          style={{ borderColor: activeField === 'email' ? 'var(--emerald)' : 'var(--mist)', color: 'var(--charcoal)' }}
                        />
                      </div>

                      {/* Service Type */}
                      <div className="relative group">
                        <label 
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            activeField === 'service' || formData.service ? '-top-5 text-[10px] uppercase tracking-widest' : 'top-3 text-base'
                          } ${activeField === 'service' ? 'text-emerald-700' : 'text-gray-400'}`}
                        >
                          Interested In
                        </label>
                        <select 
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          onFocus={() => setActiveField('service')}
                          onBlur={(e) => !e.target.value && setActiveField(null)}
                          className="w-full bg-transparent border-b pb-3 pt-3 focus:outline-none transition-colors appearance-none"
                          style={{ borderColor: activeField === 'service' ? 'var(--emerald)' : 'var(--mist)', color: 'var(--charcoal)' }}
                        >
                          <option value="" disabled hidden></option>
                          <option value="corporate">Corporate Training</option>
                          <option value="theatre">Theatre Workshop</option>
                          <option value="speaking">Speaking Engagement</option>
                          <option value="other">Other Collaboration</option>
                        </select>
                        <div className="absolute right-0 top-4 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9L12 15L18 9"></path>
                          </svg>
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="relative group pt-4">
                        <label 
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            activeField === 'message' || formData.message ? 'top-0 text-[10px] uppercase tracking-widest' : 'top-6 text-base'
                          } ${activeField === 'message' ? 'text-emerald-700' : 'text-gray-400'}`}
                        >
                          Your Message
                        </label>
                        <textarea 
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setActiveField('message')}
                          onBlur={(e) => !e.target.value && setActiveField(null)}
                          className="w-full bg-transparent border-b pb-3 pt-6 focus:outline-none transition-colors resize-none"
                          style={{ borderColor: activeField === 'message' ? 'var(--emerald)' : 'var(--mist)', color: 'var(--charcoal)' }}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <button 
                          type="submit"
                          disabled={formState === 'submitting'}
                          className="group relative overflow-hidden rounded-full px-8 py-4 w-full flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                          style={{ background: 'var(--deep-teal)', color: 'var(--white)' }}
                        >
                          <span className="relative z-10 text-sm uppercase tracking-widest font-medium">
                            {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                          </span>
                          {formState !== 'submitting' && (
                            <svg 
                              className="relative z-10 transform transition-transform group-hover:translate-x-1" 
                              width="16" height="16" viewBox="0 0 24 24" fill="none"
                            >
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <div 
                            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: 'var(--emerald)' }}
                          />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </div>
  );
}

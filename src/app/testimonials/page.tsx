import { Metadata } from 'next';
import TestimonialsContent from '@/components/TestimonialsContent';

export const metadata: Metadata = {
  title: 'Testimonials — Prabhat Singh Rajput',
  description: 'Read what institutions, corporations, and students say about their transformative experience with Prabhat Singh Rajput\'s workshops.',
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}

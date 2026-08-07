import { Metadata } from 'next';
import TheatreInEducationContent from '@/components/TheatreInEducationContent';

export const metadata: Metadata = {
  title: 'Theatre in Education — Prabhat Singh Rajput',
  description: 'Discover how Prabhat Singh Rajput uses theatre pedagogy to transform communication skills and build confident leaders in educational institutions.',
};

export default function TheatreInEducationPage() {
  return <TheatreInEducationContent />;
}

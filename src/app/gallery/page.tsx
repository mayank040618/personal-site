import { Metadata } from 'next';
import GalleryContent from '@/components/GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery & Achievements — Prabhat Singh Rajput',
  description: 'A visual journey through workshops, events, theatre performances, and milestones in Prabhat Singh Rajput\'s career.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}

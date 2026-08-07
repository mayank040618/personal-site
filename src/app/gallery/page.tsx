import { Metadata } from 'next';
import GalleryContent from '@/components/GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery — Prabhat Singh Rajput',
  description: 'A visual journey through Prabhat Singh Rajput\'s workshops, events, theatre performances, and community initiatives.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}

import { Metadata } from 'next';
import JourneyContent from '@/components/JourneyContent';

export const metadata: Metadata = {
  title: 'Journey — Prabhat Singh Rajput',
  description: 'Explore the milestones and transformative moments in Prabhat Singh Rajput\'s journey as a theatre educator and changemaker.',
};

export default function JourneyPage() {
  return <JourneyContent />;
}

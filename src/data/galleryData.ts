export interface GalleryItem {
  id: number;
  src: string;
  category: string;
  title: string;
  height?: string;
}

export const galleryItems: GalleryItem[] = [
  { id: 1, src: '/images/masters-union.jpeg', category: 'Events', title: "Masters' Union Event", height: 'h-96' },
  { id: 2, src: '/images/casting.jpeg', category: 'Events', title: 'Netflix Mismatched On Set', height: 'h-[28rem]' },
  { id: 3, src: '/images/audience-boy.jpg', category: 'Events', title: 'Audience Moment', height: 'h-80' },
  { id: 4, src: '/images/stage4you-performance.jpeg', category: 'Theatre', title: 'Stage4You Performance', height: 'h-96' },
  { id: 5, src: '/images/hope-workshop.jpeg', category: 'HOPE', title: 'HOPE Workshop', height: 'h-72' },
  { id: 6, src: '/images/netflix-group.jpeg', category: 'Corporate', title: 'Netflix Collaboration', height: 'h-80' },
  { id: 7, src: '/images/workshop-1.jpeg', category: 'Workshops', title: 'Workshop Session', height: 'h-96' },
  { id: 8, src: '/images/community-impact-new.jpeg', category: 'HOPE', title: 'Community Impact', height: 'h-[28rem]' },
  { id: 9, src: '/images/theatre-stage.jpeg', category: 'Theatre', title: 'Theatre Stage', height: 'h-80' },
  { id: 10, src: '/images/student-transformation.jpeg', category: 'Workshops', title: 'Student Transformation', height: 'h-96' },
  { id: 11, src: '/images/early-theatre-days.jpeg', category: 'Theatre', title: 'Early Theatre Days', height: 'h-72' },
  { id: 12, src: '/images/workshop-sessions.jpeg', category: 'Workshops', title: 'Workshop Sessions', height: 'h-80' },
  { id: 13, src: '/images/hope-initiative.jpeg', category: 'HOPE', title: 'HOPE Initiative', height: 'h-96' },
  { id: 14, src: '/images/prabhat-about.jpeg', category: 'Events', title: 'Prabhat Singh', height: 'h-[28rem]' },
  { id: 15, src: '/images/prabhat-hero-new.jpg', category: 'Events', title: 'Profile Shot', height: 'h-96' },
  { id: 16, src: '/images/prabhat-hero.jpg', category: 'Events', title: 'On Stage', height: 'h-80' },
  { id: 17, src: '/images/prabhat-hero-white-shirt.jpg', category: 'Corporate', title: 'Corporate Look', height: 'h-72' },
  { id: 18, src: '/images/prabhat-about-bw.jpeg', category: 'Theatre', title: 'Dramatic Moment', height: 'h-[28rem]' },
  { id: 19, src: '/images/stage4you-showcase-1.jpg', category: 'Events', title: 'JU Rhythm Talent Showcase', height: 'h-96' },
  { id: 20, src: '/images/stage4you-showcase-3.jpg', category: 'Workshops', title: 'Performers Script Session', height: 'h-80' },
  { id: 21, src: '/images/theatre-team-steps.jpg', category: 'Theatre', title: 'Theatre Team & NayaPUN Festival', height: 'h-[28rem]' },
  { id: 22, src: '/images/workshop-circle-discussion.jpg', category: 'Workshops', title: 'Interactive Group Mentorship', height: 'h-96' },
  { id: 23, src: '/images/nukkad-natak-outdoor.jpg', category: 'Theatre', title: 'Street Theatre & Outdoor Address', height: 'h-[28rem]' },
  { id: 24, src: '/images/prabhat-keynote-speaking.jpg', category: 'Events', title: 'Keynote & Stage Address', height: 'h-96' },
];

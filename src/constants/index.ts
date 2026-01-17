import { Instagram, Facebook } from 'lucide-react';

export const optimizeCloudinaryUrl = (url: string) => {
  if (!url.includes('res.cloudinary.com')) return url;
  const parts = url.split('upload/');
  if (parts.length < 2) return url;
  return `${parts[0]}upload/f_auto,q_auto/${parts[1]}`;
};

export const SITE_CONFIG = {
  name: 'AKP STUDIO',
  description: 'ستوديو تصوير فوتوغرافي وفيديوغرافي بأسلوب سينمائي، يدمج بين العمارة، الضوء، والإنسان.',
  email: 'ahm222233900@gmail.com',
  phone: '01022061319',
  address: 'Cairo, Egypt',
  instagram: 'ahmedkhled__photography',
  whatsapp: '01022061319',
  portfolioUrl: 'https://6ae4140fcada4f6aaf85baae6323f67f.elf.site',
};

export const NAVIGATION_LINKS = [
  { name: 'Films', href: '/videography' },
  { name: 'Stills', href: '/photography' },
  { name: 'Journal', href: '/journal' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/ahmedkhled__photography', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/ahmedkhaledph74/', icon: Facebook },
];

export const FEATURED_COUPLES = [
  'Mohamed ❤️ Lama',
  'Ahmed ❤️ Toka',
  'Hesham ❤️ Radwa',
  'Abdo ❤️ Nancy',
  'Shady ❤️ Mai',
  'Mohamed ❤️ Habiba',
];

export const JOURNAL_ENTRIES = [
  {
    id: 1,
    title: 'The Art of Wedding Photography',
    excerpt: 'Capturing the raw emotions and fleeting moments that make your special day truly unforgettable.',
    date: 'June 15, 2024',
    category: 'Photography',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
    slug: 'art-of-wedding-photography'
  },
  {
    id: 2,
    title: 'Cinematic Storytelling in Commercials',
    excerpt: 'How we bring brand narratives to life through immersive visual storytelling and cinematic techniques.',
    date: 'May 22, 2024',
    category: 'Filmmaking',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
    slug: 'cinematic-storytelling'
  },
  {
    id: 3,
    title: 'Behind the Scenes: Desert Fashion Shoot',
    excerpt: 'A look into the challenges and beauty of shooting high fashion in the stunning landscapes of Egypt.',
    date: 'April 10, 2024',
    category: 'Behind the Scenes',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
    slug: 'desert-fashion-shoot'
  }
];

export const CONTACT_INFO = {
  email: 'contact@akpstudio.com',
  phone: '+20 123 456 7890',
  address: 'Cairo, Egypt',
};

export const PACKAGES = [
  {
    name: 'Silver',
    price: '$$',
    features: ['4 Hours Coverage', '1 Photographer', 'Digital Gallery', '50 Edited Photos'],
    type: 'photography'
  },
  {
    name: 'Gold',
    price: '$$$',
    features: ['8 Hours Coverage', '2 Photographers', 'Digital Gallery', 'Unlimited Photos', 'Printed Album'],
    type: 'photography'
  },
  {
    name: 'Diamond',
    price: '$$$$',
    features: ['Full Day Coverage', '2 Photographers', 'Drone Shots', 'Cinematic Film', 'Premium Album'],
    type: 'combined'
  }
];

export const PROJECTS = [
  {
    id: 'sarah-james',
    title: 'Sarah & James',
    category: 'weddings',
    type: 'video',
    videoUrl: 'https://player.vimeo.com/video/76979871',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
    videoPreview: 'https://www.w3schools.com/html/mov_bbb.mp4',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975685190-2b50a3a676d1?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975922200-8d02edc6d162?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1516747773445-48b1475e7579?q=80&w=1964&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    ],
    description: 'A beautiful wedding ceremony held at the historic downtown cathedral, followed by a lively reception under the stars. We captured every tear, laugh, and dance move of this unforgettable night.',
    client: 'Sarah & James',
    date: 'June 2024',
    location: 'Cairo, Egypt'
  },
  {
    id: 'urban-fashion',
    title: 'Urban Fashion',
    category: 'commercial',
    type: 'photo',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
    ],
    description: 'High-energy fashion shoot for the new summer collection of Urban Streetwear. The goal was to capture the raw energy and style of the city streets.',
    client: 'Urban Streetwear',
    date: 'May 2024',
    location: 'Alexandria, Egypt'
  },
  {
    id: 'elena-marco',
    title: 'Elena & Marco',
    category: 'weddings',
    type: 'photo',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975922200-8d02edc6d162?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1516747773445-48b1475e7579?q=80&w=1964&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975685190-2b50a3a676d1?q=80&w=1974&auto=format&fit=crop',
    ],
    description: 'An intimate garden wedding filled with soft light and genuine emotions. Elena and Marco wanted a natural and candid approach to their wedding photography.',
    client: 'Elena & Marco',
    date: 'April 2024',
    location: 'Giza, Egypt'
  },
  {
    id: 'neon-nights',
    title: 'Neon Nights',
    category: 'short-films',
    type: 'video',
    videoUrl: 'https://player.vimeo.com/video/22439234',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
    videoPreview: 'https://www.w3schools.com/html/mov_bbb.mp4',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
    ],
    description: 'A conceptual music video exploring the nightlife of Cairo through a cinematic lens. Using neon lights and shadows to create a mood of mystery and excitement.',
    client: 'The Night Owls Band',
    date: 'March 2024',
    location: 'Cairo, Egypt'
  },
  {
    id: 'portrait-session-1',
    title: 'Studio Portraits',
    category: 'portraits',
    type: 'photo',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975685190-2b50a3a676d1?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1516747773445-48b1475e7579?q=80&w=1964&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    ],
    description: 'A series of artistic portraits focusing on expressions and lighting. These sessions are designed to capture the unique personality of each subject.',
    client: 'Various Artists',
    date: 'February 2024',
    location: 'AKP Studio'
  },
   {
    id: 'coffee-brand',
    title: 'Morning Brew',
    category: 'commercial',
    type: 'video',
    image: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    src: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    videoPreview: 'https://www.w3schools.com/html/mov_bbb.mp4',
    gallery: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1516747773445-48b1475e7579?q=80&w=1964&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975922200-8d02edc6d162?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1520975685190-2b50a3a676d1?q=80&w=1974&auto=format&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1974&auto=format&fit=crop',
    ],
    description: 'Commercial spot for a new local coffee roastery. We highlighted the artisanal process of brewing coffee and the cozy atmosphere of the cafe.',
    client: 'Morning Brew Coffee',
    date: 'January 2024',
    location: 'Maadi, Cairo'
  },
];

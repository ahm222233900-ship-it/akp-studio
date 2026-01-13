import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const SITE_CONFIG = {
  name: 'AKP STUDIO',
  description: 'Capturing moments, creating memories. Professional photography and videography studio.',
  email: 'contact@akpstudio.com',
  phone: '+20 123 456 7890',
  address: 'Cairo, Egypt',
  instagram: '@akpstudio',
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Photography', href: '/photography' },
  { name: 'Videography', href: '/videography' },
  { name: 'Services', href: '/services' },
  { name: 'Booking', href: '/booking' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
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
    image: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    description: 'Commercial spot for a new local coffee roastery. We highlighted the artisanal process of brewing coffee and the cozy atmosphere of the cafe.',
    client: 'Morning Brew Coffee',
    date: 'January 2024',
    location: 'Maadi, Cairo'
  },
];

'use client';

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import { optimizeCloudinaryUrl, SITE_CONFIG } from '@/constants';

// Placeholder images for Instagram feed
const INSTAGRAM_POSTS = [
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop',
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2020&auto=format&fit=crop',
  'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'
];

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Latest Moments</h2>
            <p className="text-gray-400">Follow us on Instagram</p>
          </div>
          <a
            href={`https://instagram.com/${SITE_CONFIG.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors px-6 py-3 border border-white/20 rounded-full"
          >
            <Instagram size={20} />
            <span className="uppercase tracking-widest text-sm font-medium">{SITE_CONFIG.instagram}</span>
          </a>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative w-full">
        <div className="flex space-x-4 animate-scroll whitespace-nowrap">
          {/* Double the list for infinite scroll effect */}
          {[...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS].map((src, index) => (
            <motion.div
              key={index}
              className="relative w-72 h-72 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={optimizeCloudinaryUrl(src)}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover rounded-md"
                sizes="288px"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

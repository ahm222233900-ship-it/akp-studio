'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Image from 'next/image';

const VIDEO_PROJECTS = [
  {
    id: 1,
    title: 'LUXURY WEDDING FILM',
    category: 'Wedding Films',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop',
    videoUrl: '/videos/wedding-film.mp4',
    description: 'A cinematic love story captured in breathtaking detail',
    duration: '4:32'
  },
  {
    id: 2,
    title: 'ARCHITECTURAL VISUALIZATION',
    category: 'Commercial',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    videoUrl: '/videos/architectural.mp4',
    description: 'Modern spaces brought to life through cinematic storytelling',
    duration: '2:45'
  },
  {
    id: 3,
    title: 'BRAND COMMERCIAL',
    category: 'Commercial',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    videoUrl: '/videos/commercial.mp4',
    description: 'Compelling brand narratives with cinematic quality',
    duration: '1:28'
  },
  {
    id: 4,
    title: 'ARTISTIC SHORT FILM',
    category: 'Short Films',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop',
    videoUrl: '/videos/short-film.mp4',
    description: 'An exploration of human emotion through visual poetry',
    duration: '8:15'
  },
  {
    id: 5,
    title: 'MUSIC VIDEO',
    category: 'Music Videos',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1974&auto=format&fit=crop',
    videoUrl: '/videos/music-video.mp4',
    description: 'Rhythm and visuals merge in perfect harmony',
    duration: '3:42'
  },
  {
    id: 6,
    title: 'EVENT HIGHLIGHTS',
    category: 'Events',
    thumbnail: 'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1518820983433-2a7d2d3b5f4f?q=80&w=1974&auto=format&fit=crop',
    videoUrl: '/videos/event-highlights.mp4',
    description: 'Energy and atmosphere of special occasions',
    duration: '3:18'
  }
];

const CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Wedding Films', value: 'Wedding Films' },
  { name: 'Commercial', value: 'Commercial' },
  { name: 'Short Films', value: 'Short Films' },
  { name: 'Music Videos', value: 'Music Videos' },
  { name: 'Events', value: 'Events' }
];

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEO_PROJECTS[0] | null>(null);

  const filteredVideos = selectedCategory === 'all' 
    ? VIDEO_PROJECTS 
    : VIDEO_PROJECTS.filter(video => video.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 text-sm font-light tracking-wide uppercase transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'text-white border-b border-white'
                  : 'text-gray-400 hover:text-white border-b border-transparent hover:border-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden aspect-[16/9] cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-full">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300"
                  >
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white/80 text-xs font-light tracking-wider uppercase">
                      {video.category}
                    </span>
                    <h3 className="text-white text-lg font-light tracking-wide uppercase mt-1">
                      {video.title}
                    </h3>
                    <p className="text-white/80 text-sm font-light mt-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-6xl aspect-video">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <X size={32} />
              </button>
              
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                src={selectedVideo.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

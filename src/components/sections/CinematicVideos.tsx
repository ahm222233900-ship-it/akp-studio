'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, X } from 'lucide-react';
import Image from 'next/image';

const CINEMATIC_VIDEOS = [
  {
    id: 1,
    title: 'CINEMATIC WEDDING FILM',
    thumbnail: '/images/video-1-thumb.jpg',
    videoUrl: '/videos/wedding-film.mp4',
    description: 'A love story captured in cinematic perfection'
  },
  {
    id: 2,
    title: 'ARCHITECTURAL VISUALIZATION',
    thumbnail: '/images/video-2-thumb.jpg',
    videoUrl: '/videos/architectural.mp4',
    description: 'Spaces come alive through cinematic storytelling'
  },
  {
    id: 3,
    title: 'COMMERCIAL STORY',
    thumbnail: '/images/video-3-thumb.jpg',
    videoUrl: '/videos/commercial.mp4',
    description: 'Brand narratives told through compelling visuals'
  }
];

export default function CinematicVideos() {
  const [selectedVideo, setSelectedVideo] = useState<typeof CINEMATIC_VIDEOS[0] | null>(null);

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-wider uppercase mb-4">
            Cinematic Stories
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide">
            Moving images that capture emotion and atmosphere
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CINEMATIC_VIDEOS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
              viewport={{ once: true }}
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

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-light tracking-wide uppercase">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
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
      </div>
    </section>
  );
}
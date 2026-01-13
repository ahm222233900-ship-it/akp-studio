'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOGRAPHY_IMAGES = [
  {
    id: 1,
    src: '/images/photography/wedding-1.jpg',
    category: 'weddings',
    title: 'Romantic Wedding Moment',
    description: 'Capturing the essence of love and celebration'
  },
  {
    id: 2,
    src: '/images/photography/architectural-1.jpg',
    category: 'architectural',
    title: 'Modern Architecture',
    description: 'Geometric beauty in contemporary design'
  },
  {
    id: 3,
    src: '/images/photography/street-1.jpg',
    category: 'street-life',
    title: 'Urban Life',
    description: 'Raw emotions in the heart of the city'
  },
  {
    id: 4,
    src: '/images/photography/event-1.jpg',
    category: 'events',
    title: 'Corporate Event',
    description: 'Professional event photography with artistic touch'
  },
  {
    id: 5,
    src: '/images/photography/wedding-2.jpg',
    category: 'weddings',
    title: 'Wedding Celebration',
    description: 'Joyful moments of matrimonial bliss'
  },
  {
    id: 6,
    src: '/images/photography/architectural-2.jpg',
    category: 'architectural',
    title: 'Architectural Detail',
    description: 'Intricate details in building design'
  },
  {
    id: 7,
    src: '/images/photography/street-2.jpg',
    category: 'street-life',
    title: 'Street Portrait',
    description: 'Authentic human stories on the streets'
  },
  {
    id: 8,
    src: '/images/photography/event-2.jpg',
    category: 'events',
    title: 'Event Atmosphere',
    description: 'Capturing the energy of special occasions'
  }
];

const CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Weddings', value: 'weddings' },
  { name: 'Architectural', value: 'architectural' },
  { name: 'Street Life', value: 'street-life' },
  { name: 'Events', value: 'events' }
];

export default function PhotographyGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof PHOTOGRAPHY_IMAGES[0] | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? PHOTOGRAPHY_IMAGES 
    : PHOTOGRAPHY_IMAGES.filter(img => img.category === selectedCategory);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    
    setSelectedImage(filteredImages[newIndex]);
  };

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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
                
                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-lg font-light tracking-wide uppercase">
                      {image.title}
                    </h3>
                    <p className="text-white/80 text-sm font-light mt-1">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <X size={32} />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <ChevronLeft size={40} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <ChevronRight size={40} />
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white text-xl font-light tracking-wide uppercase">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80 text-sm font-light mt-2">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
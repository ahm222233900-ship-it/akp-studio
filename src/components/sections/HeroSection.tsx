'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SITE_CONFIG } from '@/constants';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Video Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
        >
          {/* Placeholder video sources */}
          <source src="/videos/hero-showreel.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="text-center space-y-8 px-4 w-full">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-serif font-bold text-white tracking-widest uppercase mix-blend-difference"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-widest uppercase max-w-2xl mx-auto font-sans"
          >
            {SITE_CONFIG.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center space-y-4">
          <span className="text-white/80 text-xs tracking-widest uppercase font-sans">Scroll to Explore</span>
          <motion.div
            animate={{ height: [0, 60, 0], y: [0, 0, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}

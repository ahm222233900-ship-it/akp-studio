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

  // Background moves slightly slower than scroll (parallax)
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Text moves slower than the scroll (Parallax effect)
  // As user scrolls down, text moves down but slower than the page, creating depth
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Parallax Video Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60"
          autoPlay
          loop
          muted
          playsInline
          poster="/window.svg"
        >
          {/* Placeholder for cinematic slow-motion video */}
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <div className="space-y-6 max-w-5xl">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 3 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-serif font-bold text-[#fafafa] tracking-[0.15em] uppercase leading-none mix-blend-overlay"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 3.8 }}
            className="text-sm sm:text-base md:text-xl text-gray-300 font-light tracking-[0.3em] uppercase max-w-2xl mx-auto font-sans"
          >
            Photography & Cinematic Films
          </motion.p>
        </div>
      </motion.div>

    </section>
  );
}

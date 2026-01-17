'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MixedGrid from '@/components/gallery/MixedGrid';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedWorks from '@/components/sections/FeaturedWorks';
import FeaturedCouples from '@/components/sections/FeaturedCouples';
import VideoHighlight from '@/components/sections/VideoHighlight';
import DirectorVision from '@/components/sections/DirectorVision';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Link from 'next/link';
import { SITE_CONFIG } from '@/constants';
import Gallery from '@/components/Gallery';

export default function Home() {
  const [mode, setMode] = useState<'video' | 'photo'>('video');

  return (
    <div className="min-h-screen bg-[#050505]">
      <HeroSection />

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="bg-zinc-900/40 border border-white/10 rounded-full p-1 backdrop-blur-md inline-flex">
            <button
              onClick={() => setMode('video')}
              className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all ${mode === 'video' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
            >
              Cinematic
            </button>
            <button
              onClick={() => setMode('photo')}
              className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all ${mode === 'photo' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
            >
              Still
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MixedGrid externalFilter={mode === 'video' ? 'video' : 'photo'} />
        </motion.div>
      </AnimatePresence>

      <FeaturedWorks />
      <FeaturedCouples />
      <Gallery />
      <VideoHighlight />
      <section className="py-12 text-center">
        <Link 
          href="/photography" 
          className="inline-flex items-center space-x-2 text-white/80 hover:text-[#d9c78a] transition-colors uppercase tracking-widest text-sm border border-white/20 px-6 py-3"
        >
          <span>View Full Work</span>
        </Link>
        <a 
          href={SITE_CONFIG.portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-white/80 hover:text-[#d9c78a] transition-colors uppercase tracking-widest text-sm border border-white/20 px-6 py-3 ml-4"
        >
          <span>View Portfolio</span>
        </a>
      </section>
      <DirectorVision />
      <InstagramFeed />
    </div>
  );
}

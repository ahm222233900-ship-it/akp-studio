'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setVisible(y < 50 || y < lastYRef.current);
      lastYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/20 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
      data-role="site-navbar"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <motion.span
              whileHover={{ opacity: 0.85 }}
              className="text-white tracking-[0.3em] uppercase font-serif text-lg"
            >
              {SITE_CONFIG.name}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/videography" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">Films</Link>
            <Link href="/photography" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">Stills</Link>
            <Link href="/journal" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">Journal</Link>
            <a href={SITE_CONFIG.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">Portfolio</a>
            <Link href="/about" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">About</Link>
            <Link href="/contact" className="text-white/80 hover:text-[#d9c78a] transition-colors duration-200 text-sm tracking-widest uppercase">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <Link href="/videography" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">Films</Link>
            <Link href="/photography" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">Stills</Link>
            <Link href="/journal" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">Journal</Link>
            <a href={SITE_CONFIG.portfolioUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">Portfolio</a>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-white text-2xl font-light tracking-widest uppercase hover:text-gray-400 transition-colors">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    document.body.classList.add('cinema-mode');
    document.documentElement.classList.add('cinema-mode');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('cinema-mode');
      document.documentElement.classList.remove('cinema-mode');
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${url}?autoplay=1&muted=1&title=0&byline=0&portrait=0`}
            className="w-full h-full rounded-md"
            allow="autoplay; fullscreen; picture-in-picture"
          />
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white uppercase tracking-widest text-sm"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  items: Array<{ image: string; title: string }>;
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ items, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, items.length - 1));
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, items.length]);

  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const next = () => setIndex(i => Math.min(i + 1, items.length - 1));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-[90vw] h-[80vh] max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={items[index].image}
            alt={items[index].title}
            fill
            className="object-contain"
            priority
          />

          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition"
            >
              <X />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className={cn(
                "w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition",
                index === 0 && "opacity-50 cursor-not-allowed"
              )}
              disabled={index === 0}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className={cn(
                "w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition",
                index === items.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              disabled={index === items.length - 1}
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

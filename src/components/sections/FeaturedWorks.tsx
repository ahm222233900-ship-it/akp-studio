'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { optimizeCloudinaryUrl } from '@/constants';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/constants';

export default function FeaturedWorks() {
  // Fixed selection: 6 works, minimal text, large visuals
  const byCategory = (cat: string, preferType?: 'photo' | 'video') =>
    PROJECTS.find(p => p.category === cat && (!preferType || p.type === preferType)) ?? PROJECTS.find(p => p.category === cat);
  const selected = [
    byCategory('weddings', 'video'),
    byCategory('commercial', 'photo'),
    byCategory('portraits', 'photo'),
    byCategory('short-films', 'video'),
    byCategory('weddings', 'photo'),
    byCategory('commercial', 'video'),
  ].filter(Boolean) as typeof PROJECTS;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-6 w-full md:w-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider"
            >
              Selected Works
            </motion.h2>
          </div>

          <Link 
            href="/photography"
            className="hidden md:flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm mb-2"
          >
            <span>View Full Work</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {selected.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-video overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
              >
                <Link href={`/projects/${project.id}`}>
                  <Image
                    src={optimizeCloudinaryUrl(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-2xl md:text-3xl font-serif italic text-white">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/photography"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm"
          >
            <span>View Full Work</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

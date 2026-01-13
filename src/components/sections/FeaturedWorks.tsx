'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/constants';
import { cn } from '@/lib/utils';

export default function FeaturedWorks() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  const filteredProjects = PROJECTS.filter(project => 
    filter === 'all' ? true : project.type === filter
  ).slice(0, 4);

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

            {/* Switch Toggle */}
            <div className="inline-flex bg-zinc-900/50 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'all' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilter('photo')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'photo' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                Photography
              </button>
              <button
                onClick={() => setFilter('video')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === 'video' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                Videography
              </button>
            </div>
          </div>

          <Link 
            href={filter === 'video' ? '/videography' : '/photography'}
            className="hidden md:flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm mb-2"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
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
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">{project.title}</h3>
                      <p className="text-white/80 text-sm tracking-widest uppercase">{project.category}</p>
                      <span className="inline-block mt-4 text-xs border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest text-white/90">
                        {project.type}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href={filter === 'video' ? '/videography' : '/photography'}
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

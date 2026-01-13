'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function MixedGrid() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  const filteredProjects = PROJECTS.filter(project => 
    filter === 'all' ? true : project.type === filter
  ).slice(0, 6); // Show 6 items for the grid

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-8 w-full md:w-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-widest mb-4">
                Visual Stories
              </h2>
              <p className="text-gray-400 font-sans tracking-wide max-w-xl">
                A curated selection of our finest moments captured in time.
              </p>
            </motion.div>

            {/* Switch Toggle */}
            <div className="inline-flex bg-zinc-900/50 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-sans tracking-widest transition-all duration-300",
                  filter === 'all' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilter('photo')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-sans tracking-widest transition-all duration-300",
                  filter === 'photo' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                Photo
              </button>
              <button
                onClick={() => setFilter('video')}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-sans tracking-widest transition-all duration-300",
                  filter === 'video' ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                Video
              </button>
            </div>
          </div>

          <Link 
            href={filter === 'video' ? '/videography' : '/photography'}
            className="hidden md:flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-sans group"
          >
            <span>View All {filter === 'all' ? 'Works' : filter === 'photo' ? 'Photography' : 'Videography'}</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Determine span based on index to create asymmetry
              // We use index % 6 to create a repeating pattern if we had more items
              const i = index % 6;
              const isLarge = i === 0 || i === 3;
              const isTall = i === 1 || i === 4;
              
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "relative group overflow-hidden rounded-sm cursor-none",
                    isLarge && "md:col-span-2 lg:col-span-2",
                    isTall && "md:row-span-2"
                  )}
                >
                  <Link href={`/projects/${project.id}`} className="block w-full h-full">
                    <div className="w-full h-full relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                        sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2 font-sans transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          {project.category}
                        </span>
                        <h3 className="text-3xl font-serif text-white italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
          <Link 
            href={filter === 'video' ? '/videography' : '/photography'}
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-sans"
          >
            <span>View All Works</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/constants';

const TABS = [
  { id: 'all', label: 'All Work' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'short-films', label: 'Short Films' },
];

interface PortfolioGridProps {
  defaultCategory?: string;
  typeFilter?: 'photo' | 'video' | 'all';
}

export default function PortfolioGrid({ defaultCategory = 'all', typeFilter = 'all' }: PortfolioGridProps) {
  const [activeTab, setActiveTab] = useState(defaultCategory);

  const filteredProjects = PROJECTS.filter(project => {
    // First filter by type (Photo/Video)
    if (typeFilter !== 'all' && project.type !== typeFilter) return false;
    
    // Then filter by category tab
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300",
              activeTab === tab.id 
                ? "bg-white text-black font-medium" 
                : "bg-transparent text-gray-400 hover:text-white border border-white/20"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
            >
              <Link href={`/projects/${project.id}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2 text-center">{project.title}</h3>
                  <span className="text-xs text-white/80 uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { JOURNAL_ENTRIES, optimizeCloudinaryUrl } from '@/constants';
import { ArrowRight } from 'lucide-react';

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light text-white tracking-wider uppercase mb-6"
          >
            Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto"
          >
            Stories, insights, and behind-the-scenes moments from our creative journey.
          </motion.p>
        </div>
      </section>

      {/* Journal Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {JOURNAL_ENTRIES.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-zinc-900">
                  <Image
                    src={optimizeCloudinaryUrl(entry.image)}
                    alt={entry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white uppercase tracking-widest border border-white/10">
                      {entry.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500 font-light tracking-widest uppercase">
                    <span>{entry.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-light text-white group-hover:text-gray-300 transition-colors">
                    {entry.title}
                  </h2>
                  
                  <p className="text-gray-400 font-light leading-relaxed line-clamp-3">
                    {entry.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center text-sm text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                      Read Story <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

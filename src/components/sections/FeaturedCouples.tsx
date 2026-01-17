'use client';

import { motion } from 'framer-motion';
import { FEATURED_COUPLES, SITE_CONFIG } from '@/constants';

export default function FeaturedCouples() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif text-white tracking-wide"
          >
            Featured Couples
          </motion.h2>
          <a
            href={SITE_CONFIG.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center space-x-2 text-white/80 hover:text-[#d9c78a] transition-colors uppercase tracking-widest text-sm border border-white/20 px-4 py-2"
          >
            <span>View Portfolio</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {FEATURED_COUPLES.map((name, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group px-4 py-6 border border-white/10 rounded-lg bg-white/5 text-center"
            >
              <span className="text-white/90 text-sm md:text-base tracking-wide group-hover:text-[#d9c78a] transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href={SITE_CONFIG.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-[#d9c78a] transition-colors uppercase tracking-widest text-sm border border-white/20 px-4 py-2"
          >
            <span>View Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}

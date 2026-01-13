'use client';

import { motion } from 'framer-motion';

export default function DirectorVision() {
  return (
    <section className="py-32 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-gray-400 uppercase tracking-[0.3em]"
          >
            Director's Vision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight"
          >
            "We believe that every moment holds a story waiting to be told. Our mission is not just to capture events, but to preserve the emotions, the atmosphere, and the fleeting beauty of life in its purest form."
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <p className="text-white text-lg font-sans tracking-widest uppercase text-xs">- Ahmed Kamel, Lead Director</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

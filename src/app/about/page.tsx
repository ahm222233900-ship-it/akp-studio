'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DirectorVision from '@/components/sections/DirectorVision';
import { optimizeCloudinaryUrl } from '@/constants';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-light text-white tracking-wider uppercase mb-8"
            >
              عن الاستوديو
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed"
            >
              AKP STUDIO هو ستوديو بصري يقدّم الحكاية قبل الصورة. يقوده أحمد خالد، بخلفية معمارية ورؤية سينمائية، حيث يلتقي الضوء بالحركة والفراغ.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[21/9] overflow-hidden rounded-lg mb-20 bg-zinc-900"
          >
            <Image
              src={optimizeCloudinaryUrl('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop')}
              alt="Studio Portrait B&W"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <DirectorVision />

      {/* Philosophy Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light text-white uppercase tracking-wider mb-6">Our Philosophy</h2>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                <p>
                  We believe that every image should tell a story. Whether it&apos;s the intimate moments of a wedding 
                  or the bold statement of a commercial campaign, our approach is rooted in authenticity and emotion.
                </p>
                <p>
                  Our team of dedicated professionals brings years of experience and a passion for visual arts 
                  to every project. We don&apos;t just document events; we craft cinematic experiences that resonate.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-zinc-900 p-8 text-center border border-white/5">
                  <span className="block text-4xl font-light text-white mb-2">5+</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
                </div>
                <div className="bg-zinc-900 p-8 text-center border border-white/5">
                  <span className="block text-4xl font-light text-white mb-2">200+</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Projects</span>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-zinc-900 p-8 text-center border border-white/5">
                  <span className="block text-4xl font-light text-white mb-2">100%</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Satisfaction</span>
                </div>
                <div className="bg-zinc-900 p-8 text-center border border-white/5">
                  <span className="block text-4xl font-light text-white mb-2">15+</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Awards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

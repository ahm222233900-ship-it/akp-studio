'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { optimizeCloudinaryUrl } from '@/constants';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoModal from '@/components/player/VideoModal';
import { useRef, useState } from 'react';
import { PROJECTS } from '@/constants';

type Project = typeof PROJECTS[0];

export default function ProjectDetails({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Pinned Video Section (if video), else Parallax Hero */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        {project.type === 'video' ? (
          <div className="sticky top-0 h-screen w-full">
            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 z-20"
              aria-label="Play Highlights"
            />
            <Image
              src={optimizeCloudinaryUrl(project.image)}
              alt={project.title}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-white tracking-widest uppercase text-xs">Play</span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src={optimizeCloudinaryUrl(project.image)}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4 max-w-5xl mx-auto"
          >
            <span className="text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-8 block font-sans">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif text-white italic tracking-wide mb-8 mix-blend-difference">
              {project.title}
            </h1>
            <div className="flex justify-center space-x-8 text-sm uppercase tracking-widest text-white/80 font-sans">
              <span>{project.location}</span>
              <span>—</span>
              <span>{project.date}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Story Intro */}
        <section className="py-32 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl leading-relaxed text-gray-200 font-serif"
          >
            {project.description}
          </motion.p>
        </section>

        {/* 3. Mixed Gallery (The Journey) */}
        <section className="py-20 space-y-32">
          {/* Alternating Layout: Image Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative aspect-[3/4] w-full"
             >
                <Image 
                  src={project.image} 
                  alt="Detail 1" 
                  fill 
                  className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" 
                />
             </motion.div>
             <div className="space-y-6 md:pl-12">
               <h3 className="text-3xl font-serif text-white italic">The Beginning</h3>
               <p className="text-gray-400 font-sans leading-relaxed">
                 Every story has a beginning. We capture the anticipation, the subtle glances, and the quiet moments before the main event.
               </p>
             </div>
          </div>

          {project.type === 'video' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="relative aspect-video w-full rounded-sm overflow-hidden">
                <Image
                  src={optimizeCloudinaryUrl(project.image)}
                  alt="Highlights"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <span className="text-white uppercase tracking-widest text-xs bg-white/10 border border-white/30 rounded-full px-4 py-2">
                    Watch Highlights
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Alternating Layout: Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6 md:pr-12 order-2 md:order-1">
               <h3 className="text-3xl font-serif text-white italic">The Emotion</h3>
               <p className="text-gray-400 font-sans leading-relaxed">
                 It&apos;s not just about how it looks, but how it feels. Our focus is on genuine emotions and unscripted interactions.
               </p>
             </div>
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative aspect-video w-full order-1 md:order-2"
             >
                <Image 
                  src={project.image} 
                  alt="Detail 2" 
                  fill 
                  className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" 
                />
             </motion.div>
          </div>
        </section>

        {/* 3.5 Curated Gallery */}
        <section className="py-24">
          <h3 className="text-center text-2xl md:text-3xl font-serif italic text-white mb-12">Gallery</h3>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
            {(project.gallery && project.gallery.length ? project.gallery : [project.image]).map((src: string, i: number) => (
              <div key={i} className="relative mb-6 break-inside-avoid rounded-sm overflow-hidden">
                <Image
                  src={optimizeCloudinaryUrl(src)}
                  alt={`${project.title} ${i + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Details & CTA */}
        <section className="py-32 border-t border-white/10 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                <h3 className="text-2xl font-serif text-white mb-8">Project Details</h3>
                <dl className="space-y-4 text-gray-400 font-sans">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <dt>Client</dt>
                    <dd className="text-white">{project.client}</dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <dt>Date</dt>
                    <dd className="text-white">{project.date}</dd>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <dt>Location</dt>
                    <dd className="text-white">{project.location}</dd>
                  </div>
                </dl>
             </div>
             <div className="flex flex-col justify-center items-start md:items-end space-y-6">
                <p className="text-xl text-white font-serif italic">Ready to tell your own story?</p>
                <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8">
                  <Link href="/booking">Book Your Session</Link>
                </Button>
             </div>
          </div>
        </section>

        <div className="pb-20">
          <Link 
            href={project.type === 'video' ? '/videography' : '/photography'}
            className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            <span className="uppercase tracking-widest text-sm font-sans">Back to Portfolio</span>
          </Link>
          <div className="mt-12 border-t border-white/10 pt-10 flex justify-center">
            <Link 
              href={`/projects/${nextProject.id}`} 
              className="text-white text-2xl md:text-3xl font-serif italic hover:opacity-80 transition-opacity"
            >
              Next Project — {nextProject.title}
            </Link>
          </div>
        </div>
      </div>
      {open && project.videoUrl && (
        <VideoModal url={project.videoUrl} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

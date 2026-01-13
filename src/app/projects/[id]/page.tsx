'use client';

import { PROJECTS } from '@/constants';
import { notFound, useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/player/VideoPlayer';
import { useRef } from 'react';

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const project = PROJECTS.find(p => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  if (!project) {
    return notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Full Screen Hero with Parallax */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
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
            "{project.description}"
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

          {/* Video Section (Center) */}
          {project.type === 'video' && (
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="w-full"
             >
                <VideoPlayer poster={project.image} className="aspect-video w-full rounded-sm" />
                <p className="text-center text-sm text-gray-500 mt-4 uppercase tracking-widest">Watch the Highlights</p>
             </motion.div>
          )}

          {/* Alternating Layout: Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6 md:pr-12 order-2 md:order-1">
               <h3 className="text-3xl font-serif text-white italic">The Emotion</h3>
               <p className="text-gray-400 font-sans leading-relaxed">
                 It's not just about how it looks, but how it feels. Our focus is on genuine emotions and unscripted interactions.
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
                <p className="text-xl text-white font-serif italic">"Ready to tell your own story?"</p>
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
        </div>
      </div>
    </div>
  );
}

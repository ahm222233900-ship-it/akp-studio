'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, optimizeCloudinaryUrl } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Play } from 'lucide-react';
import Lightbox from './Lightbox';
import VideoModal from '@/components/player/VideoModal';

type ProjectItem = typeof PROJECTS[number];

function hasVideoPreview(p: ProjectItem): p is ProjectItem & { videoPreview: string } {
  return typeof (p as { videoPreview?: unknown }).videoPreview === 'string';
}
function getImageSrc(p: ProjectItem): string {
  const withOptional = p as { src?: string; image: string };
  return withOptional.src ?? withOptional.image;
}
function ContentWrapper({ children, aspectClass }: { children: React.ReactNode; aspectClass: string }) {
  return (
    <div className={cn("w-full relative", aspectClass)}>
      {children}
    </div>
  );
}

export default function MixedGrid({ projects, externalFilter }: { projects?: ProjectItem[]; externalFilter?: 'all' | 'photo' | 'video' }) {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>(externalFilter ?? 'all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const baseProjects = (projects ?? PROJECTS);
  const activeFilter = externalFilter ?? filter;

  const filteredProjects = baseProjects.filter(project => 
    activeFilter === 'all' ? true : project.type === activeFilter
  ).slice(0, 6);
  

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const openVideoModal = (url?: string) => {
    if (url) {
      setVideoUrl(url);
      setVideoOpen(true);
    }
  };

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

            {!externalFilter && (
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
            )}
          </div>

          <Link 
            href={activeFilter === 'video' ? '/videography' : '/photography'}
            className="hidden md:flex items-center space-x-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-sans group"
          >
            <span>View All {activeFilter === 'all' ? 'Works' : activeFilter === 'photo' ? 'Photography' : 'Videography'}</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const i = index % 6;
              const isTall = i === 1 || i === 4;
              const aspectClass = isTall ? "aspect-[4/5]" : "aspect-video";
              
              return (
                <GridItem 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  isTall={isTall}
                  aspectClass={aspectClass}
                  onOpenLightbox={() => openLightbox(index)}
                  onOpenVideo={() => openVideoModal(project.videoUrl)}
                />
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
        {/* Lightbox Modal */}
        {lightboxOpen && (
          <Lightbox
            items={filteredProjects.filter(p => p.type === 'photo')}
            initialIndex={Math.min(currentIndex, filteredProjects.length - 1)}
            onClose={() => setLightboxOpen(false)}
          />
        )}
        {videoOpen && videoUrl && (
          <VideoModal url={videoUrl} onClose={() => { setVideoOpen(false); setVideoUrl(null); }} />
        )}
    </section>
  );
}

function GridItem({ project, index, isTall, aspectClass, onOpenLightbox, onOpenVideo }: { project: ProjectItem, index: number, isTall: boolean, aspectClass: string, onOpenLightbox: () => void, onOpenVideo: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative group overflow-hidden rounded-sm cursor-none mb-8 break-inside-avoid",
        isTall && ""
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {project.type === 'photo' ? (
        <button onClick={onOpenLightbox} className="block w-full text-left">
          <ContentWrapper aspectClass={aspectClass}>
          {/* Image */}
          <div className={cn(
            "absolute inset-0 transition-all duration-700 ease-out",
            "grayscale group-hover:grayscale-0", // Golden Tip: Grayscale to Color
            isHovered ? "scale-105" : "scale-100"
          )}>
            <Image
              src={optimizeCloudinaryUrl(getImageSrc(project))}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 2}
            />
          </div>
          {/* Overlay & Content */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
          {/* Bottom Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block text-white/70 text-[10px] tracking-[0.2em] uppercase mb-3 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {project.title}
              </h3>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white uppercase tracking-widest text-xs font-sans border border-white/30 px-3 py-1 rounded-full"
              >
                <span>View Project</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
          </ContentWrapper>
        </button>
      ) : (
      <button onClick={onOpenVideo} className="block w-full text-left">
        <ContentWrapper aspectClass={aspectClass}>
          {/* Video Preview (if type is video) */}
          {project.type === 'video' && hasVideoPreview(project) && (
            <video
              ref={videoRef}
              src={project.videoPreview}
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {/* Image base layer */}
          <Image
            src={optimizeCloudinaryUrl(getImageSrc(project))}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index < 2}
          />

          {/* Overlay & Content */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* View Project Link */}
          <Link
            href={`/projects/${project.id}`}
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 hover:text-[#d9c78a]"
          >
            <span className="text-xs uppercase tracking-widest text-white">View Project</span>
            <ArrowUpRight size={14} className="text-white" />
          </Link>

          {/* Play Icon Overlay for Videography */}
          {project.type === 'video' && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block text-white/70 text-[10px] tracking-[0.2em] uppercase mb-3 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {project.title}
              </h3>
            </div>
          </div>
        </ContentWrapper>
      </button>
      )}
    </motion.div>
  );
}

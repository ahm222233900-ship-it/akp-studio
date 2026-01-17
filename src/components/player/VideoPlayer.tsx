'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src?: string; // Optional for now, as we might use placeholders
  poster: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleCinema = () => {
    setIsCinemaMode(!isCinemaMode);
  };

  return (
    <div className={cn(className, "relative")}>
      <div
        className={cn(
          "transition-all duration-500 ease-in-out",
          isCinemaMode
            ? "fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-20"
            : "relative w-full h-full group overflow-hidden rounded-lg bg-black"
        )}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isCinemaMode && "object-contain max-h-screen"
          )}
          loop
          playsInline
          onClick={togglePlay}
        />

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 pointer-events-none",
            !isCinemaMode && "group-hover:bg-black/40"
          )}
        >
          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={togglePlay}
                className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 pointer-events-auto hover:scale-110 transition-transform duration-300"
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
          <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>

          <div className="flex items-center space-x-4">
            <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button onClick={toggleCinema} className="text-white hover:text-gray-300 transition-colors">
              {isCinemaMode ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

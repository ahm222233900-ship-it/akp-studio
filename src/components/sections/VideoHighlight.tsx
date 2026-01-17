'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/constants';

export default function VideoHighlight() {
  const highlight = PROJECTS.find(p => p.type === 'video');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!highlight) return null;

  const url = highlight.videoUrl?.includes('player.vimeo.com') || highlight.videoUrl?.includes('youtube.com')
    ? `${highlight.videoUrl}?autoplay=${inView ? 1 : 0}&muted=1&title=0&byline=0&portrait=0`
    : highlight.videoUrl;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
          {url?.includes('player.vimeo.com') || url?.includes('youtube.com') ? (
            <iframe
              key={inView ? 'play' : 'pause'}
              src={url}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={url}
              muted
              loop
              playsInline
              autoPlay={inView}
            />
          )}
        </div>
      </div>
    </section>
  );
}

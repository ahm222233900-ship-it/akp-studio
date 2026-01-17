import VideoGallery from '@/components/sections/VideoGallery';

export default function VideographyPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-widest mb-6">
          Videography
        </h1>
        <p className="text-gray-400 font-sans tracking-wide max-w-xl mb-12">
          Films only. Hover for a subtle motion. Click to fullscreen.
        </p>
      </div>
      <VideoGallery />
    </main>
  );
}

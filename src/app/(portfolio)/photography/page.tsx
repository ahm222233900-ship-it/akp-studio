import MixedGrid from '@/components/gallery/MixedGrid';

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-widest mb-6">
          Photography
        </h1>
        <p className="text-gray-400 font-sans tracking-wide max-w-xl mb-12">
          Capturing moments frozen in time. A collection of our finest still imagery.
        </p>
      </div>
      
      <MixedGrid externalFilter="photo" />
    </main>
  );
}

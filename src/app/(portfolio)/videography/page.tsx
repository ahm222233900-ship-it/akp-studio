import PortfolioGrid from '@/components/gallery/PortfolioGrid';

export default function VideographyPage() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">Videography</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
          Cinematic storytelling that brings your memories to life.
        </p>
      </div>
      <PortfolioGrid typeFilter="video" />
    </div>
  );
}

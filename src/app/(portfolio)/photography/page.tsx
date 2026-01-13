import PortfolioGrid from '@/components/gallery/PortfolioGrid';

export default function PhotographyPage() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">Photography</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
          Capturing the essence of moments through the lens.
        </p>
      </div>
      <PortfolioGrid typeFilter="photo" />
    </div>
  );
}

import HeroSection from '@/components/sections/HeroSection';
import MixedGrid from '@/components/gallery/MixedGrid';
import DirectorVision from '@/components/sections/DirectorVision';
import InstagramFeed from '@/components/sections/InstagramFeed';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <MixedGrid />
      <DirectorVision />
      <InstagramFeed />
    </div>
  );
}

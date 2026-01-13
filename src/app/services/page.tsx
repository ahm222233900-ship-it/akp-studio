import PricingSection from '@/components/sections/PricingSection';

export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">Our Services</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
          We offer a range of professional photography and videography services tailored to your unique needs.
        </p>
      </div>
      <PricingSection />
    </div>
  );
}

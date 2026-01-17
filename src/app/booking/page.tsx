import BookingForm from '@/components/sections/BookingForm';

export default function BookingPage() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">Book Your Session</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
          Let&apos;s create something beautiful together. Fill out the form below to get started.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}

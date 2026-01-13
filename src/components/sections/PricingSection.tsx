'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PACKAGES } from '@/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4"
          >
            Investment
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect package for your special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                pkg.name === 'Diamond' 
                  ? 'border-white/20 bg-white/5' 
                  : 'border-white/10 bg-black'
              } flex flex-col`}
            >
              {pkg.name === 'Diamond' && (
                <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{pkg.name}</h3>
                <div className="text-4xl font-light text-white mb-1">{pkg.price}</div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">{pkg.type}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-white flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full" variant={pkg.name === 'Diamond' ? 'default' : 'outline'}>
                <Link href="/booking">Book Now</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Need a custom package?</p>
          <Button asChild variant="link" className="text-white">
            <Link href="/booking">Contact us for a custom quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

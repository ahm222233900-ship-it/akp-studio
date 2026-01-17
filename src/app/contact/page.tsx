'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/constants';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Page Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light text-white tracking-wider uppercase mb-6"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto"
          >
            Let&apos;s create something extraordinary together. Reach out to discuss your project.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-light text-white tracking-wider uppercase mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Ready to bring your vision to life? We&apos;re here to discuss your project 
                    and create something memorable together.
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.a
                    href={`mailto:${SITE_CONFIG.email}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <Mail className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    <span className="font-light">{SITE_CONFIG.email}</span>
                  </motion.a>

                  <motion.a
                    href={`tel:${SITE_CONFIG.phone}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <Phone className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    <span className="font-light">{SITE_CONFIG.phone}</span>
                  </motion.a>

                  <motion.a
                    href={`https://instagram.com/${SITE_CONFIG.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <Instagram className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    <span className="font-light">{SITE_CONFIG.instagram}</span>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 text-gray-300 group"
                  >
                    <MapPin className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    <span className="font-light">{SITE_CONFIG.address}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="flex items-center justify-center">
                  <div className="relative w-[340px] h-[200px] [perspective:1000px]">
                    <motion.div
                      initial={{ rotateY: 0 }}
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 [transform-style:preserve-3d]"
                    >
                      <div className="absolute inset-0 bg-zinc-900/70 border border-white/20 rounded-xl backdrop-blur-md p-6 [backface-visibility:hidden]">
                        <div className="flex items-center justify-between">
                          <span className="text-white tracking-[0.3em] uppercase font-serif">AKP STUDIO</span>
                          <span className="text-white/70 text-xs tracking-widest uppercase">Contact</span>
                        </div>
                        <div className="mt-6 space-y-2 text-sm">
                          <div className="text-white/80">{SITE_CONFIG.email}</div>
                          <div className="text-white/80">{SITE_CONFIG.phone}</div>
                          <div className="text-white/80">{SITE_CONFIG.instagram}</div>
                        </div>
                        <div className="mt-6 text-right">
                          <span className="text-[#d9c78a] text-xs tracking-widest uppercase">Hover to reveal QR</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black border border-white/20 rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                        <Image
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\\D/g, '')}`)}`}
                          alt="WhatsApp QR"
                          width={160}
                          height={160}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="text-center pt-8 border-t border-gray-800">
                  <p className="text-gray-500 text-sm font-light">
                    Response time: Usually within 24 hours
                  </p>
                  <p className="text-gray-500 text-sm font-light mt-1">
                    Available for projects worldwide
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

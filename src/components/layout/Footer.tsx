'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/constants';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-black border-t border-white/10 py-16"
      data-role="site-footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="block relative w-40 h-16">
              <Image 
                src="/logo-white.svg"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase">
              Navigation
            </h4>
            <div className="space-y-3">
              {NAVIGATION_LINKS.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase">
              Connect
            </h4>
            <div className="space-y-4">
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Mail size={18} />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Phone size={18} />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin size={18} />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex space-x-4 pt-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

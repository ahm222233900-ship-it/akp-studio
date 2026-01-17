'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
};

export default function Gallery() {
  const [items, setItems] = useState<CloudinaryResource[]>([]);

  useEffect(() => {
    const run = async () => {
      const res = await fetch('/api/cloudinary/list?type=image');
      const json = await res.json();
      if (res.ok && Array.isArray(json.resources)) setItems(json.resources);
    };
    run();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {items.map((it) => (
            <motion.div
              key={it.public_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="mb-4 break-inside-avoid"
            >
              <div className="relative w-full overflow-hidden rounded-lg border border-white/10">
                <Image src={it.secure_url} alt={it.public_id} width={1200} height={800} className="w-full h-auto object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

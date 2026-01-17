'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTargetRoute = (p: string | null) => {
      if (!p) return false;
      return p.startsWith('/photography') || p.startsWith('/videography');
    };
    if (isTargetRoute(prevPath.current) || isTargetRoute(pathname)) {
      const t1 = setTimeout(() => setVisible(true), 0);
      const t2 = setTimeout(() => setVisible(false), 450);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-black"
        />
      )}
    </AnimatePresence>
  );
}

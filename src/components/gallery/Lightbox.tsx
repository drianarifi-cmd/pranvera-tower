'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-navy/95 backdrop-blur-md z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Image panel */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <Image
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </motion.div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-cream/70 hover:text-gold transition-colors text-3xl leading-none z-10"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold transition-colors text-5xl leading-none z-10 px-3 py-2"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold transition-colors text-5xl leading-none z-10 px-3 py-2"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 font-sans text-xs tracking-widest uppercase z-10">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

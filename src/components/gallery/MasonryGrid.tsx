'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
];

export default function MasonryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(i: number) {
    setLightboxIndex(i);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prevImage() {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  }

  function nextImage() {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_IMAGES.length
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {GALLERY_IMAGES.map((src, i) => {
          const imageHeight = 400 + (i % 3) * 100;
          return (
            <motion.div
              key={src}
              className="break-inside-avoid cursor-pointer relative overflow-hidden group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={src}
                alt={`Interior ${i + 1}`}
                width={800}
                height={imageHeight}
                className="w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-gold text-3xl leading-none select-none">⊕</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Lightbox
        images={GALLERY_IMAGES}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}

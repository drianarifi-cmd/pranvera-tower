export const APARTMENT_IMAGES: Record<string, string[]> = {
  '1br': [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
  ],
  '2br': [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&q=80',
  ],
  '3br': [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
  ],
  penthouse: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  ],
  commercial: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&q=80',
  ],
};

export const TABS = ['1br', '2br', '3br', 'penthouse', 'commercial'] as const;
export type TabKey = typeof TABS[number];

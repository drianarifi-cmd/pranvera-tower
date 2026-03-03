'use client';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  title: string;
  titleItalic?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, titleItalic, center }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <p className="section-label mb-4">{label}</p>
      <h2 className="section-title">
        {title}{' '}
        {titleItalic && (
          <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{titleItalic}</em>
        )}
      </h2>
    </motion.div>
  );
}

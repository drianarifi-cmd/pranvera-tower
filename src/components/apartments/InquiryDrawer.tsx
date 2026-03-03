'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apartmentType: string;
}

export default function InquiryDrawer({ isOpen, onClose, apartmentType }: InquiryDrawerProps) {
  const t = useTranslations('inquiry');
  const ct = useTranslations('contact');

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fix 3: Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fix 1 & 4: catch block, error state, removed 'YOUR_FORM_ID' fallback
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || ''}`,
        {
          method: 'POST',
          body: new FormData(e.currentTarget),
          headers: { Accept: 'application/json' },
        }
      );
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(200,169,110,0.2)',
    borderRadius: 0,
    color: '#f9f4ec',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.875rem',
    fontWeight: 300,
    padding: '0.875rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Jost', sans-serif",
    fontSize: '10px',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#8fa3b8',
    marginBottom: '0.5rem',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              backgroundColor: 'rgba(7,17,31,0.7)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Fix 3: Drawer panel with role, aria-modal, aria-label */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry form"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 101,
              width: '100%',
              maxWidth: '480px',
              backgroundColor: '#0d1e33',
              borderLeft: '1px solid rgba(200,169,110,0.15)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '2rem 2rem 1.5rem',
                borderBottom: '1px solid rgba(200,169,110,0.1)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '10px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: '#c8a96e',
                    marginBottom: '0.5rem',
                  }}
                >
                  Pranvera Tower
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.75rem',
                    fontWeight: 300,
                    color: '#f9f4ec',
                    margin: 0,
                  }}
                >
                  {t('title')}
                </h2>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color: '#8fa3b8',
                    marginTop: '0.375rem',
                  }}
                >
                  {t('subtitle')}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label={t('close')}
                style={{
                  background: 'none',
                  border: '1px solid rgba(200,169,110,0.2)',
                  color: '#8fa3b8',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#c8a96e';
                  (e.currentTarget as HTMLButtonElement).style.color = '#c8a96e';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,169,110,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#8fa3b8';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem', flex: 1 }}>
              {success ? (
                // Fix 6: aria-live region for success message
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', padding: '4rem 0' }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      border: '1px solid #c8a96e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8L6.5 12.5L14 4" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.5rem',
                      fontWeight: 300,
                      color: '#f9f4ec',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {ct('form.success')}
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                    style={{ fontSize: '10px', padding: '0.75rem 1.5rem' }}
                  >
                    {t('close')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Hidden apartment type */}
                  <input type="hidden" name="apartment_type" value={apartmentType} />

                  {/* Fix 2: htmlFor + id for name */}
                  <div>
                    <label htmlFor="inquiry-name" style={labelStyle}>{ct('form.name')}</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.6)')}
                      onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.2)')}
                    />
                  </div>

                  {/* Fix 2: htmlFor + id for email */}
                  <div>
                    <label htmlFor="inquiry-email" style={labelStyle}>{ct('form.email')}</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.6)')}
                      onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.2)')}
                    />
                  </div>

                  {/* Fix 2: htmlFor + id for phone */}
                  <div>
                    <label htmlFor="inquiry-phone" style={labelStyle}>{ct('form.phone')}</label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.6)')}
                      onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(200,169,110,0.2)')}
                    />
                  </div>

                  {/* Fix 2: htmlFor + id for message */}
                  <div>
                    <label htmlFor="inquiry-message" style={labelStyle}>{ct('form.message')}</label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                      onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(200,169,110,0.6)')}
                      onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(200,169,110,0.2)')}
                    />
                  </div>

                  {/* Fix 5: aria-busy on submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="btn-primary w-full justify-center"
                    style={{
                      fontSize: '10px',
                      padding: '1rem 2rem',
                      width: '100%',
                      justifyContent: 'center',
                      opacity: submitting ? 0.6 : 1,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    {submitting ? '...' : ct('form.submit')}
                  </button>

                  {/* Fix 1: display error message */}
                  {error !== null && (
                    <p
                      role="alert"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 300,
                        color: '#e07070',
                        margin: 0,
                        textAlign: 'center',
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

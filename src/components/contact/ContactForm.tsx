'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'sent';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const raw = t.raw('interests');
    if (Array.isArray(raw)) {
      setInterests(raw as string[]);
    }
  }, [t]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';
    const endpoint = `https://formspree.io/f/${formspreeId}`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, interest, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          (data as { error?: string }).error || `Submission failed (${res.status}). Please try again.`;
        setError(msg);
        setStatus('idle');
        return;
      }

      setStatus('sent');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mb-8" />
        <p className="font-serif text-xl text-cream">{t('success')}</p>
        <div className="w-px h-12 bg-gradient-to-t from-gold to-transparent mt-8" />
      </div>
    );
  }

  const inputBase =
    'w-full bg-transparent border border-gold/20 px-4 py-3 text-cream placeholder-muted/50 font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors duration-200';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
          {t('name')} *
        </label>
        <input
          id="cf-name"
          type="text"
          required
          autoComplete="name"
          className={inputBase}
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
          {t('email')} *
        </label>
        <input
          id="cf-email"
          type="email"
          required
          autoComplete="email"
          className={inputBase}
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cf-phone" className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
          {t('phone')}
        </label>
        <input
          id="cf-phone"
          type="tel"
          autoComplete="tel"
          className={inputBase}
          placeholder={t('phone')}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Interest */}
      <div>
        <label htmlFor="cf-interest" className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
          {t('interest')}
        </label>
        <select
          id="cf-interest"
          className={`${inputBase} cursor-pointer`}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="" className="bg-navy text-muted">
            — {t('interest')} —
          </option>
          {interests.map((opt) => (
            <option key={opt} value={opt} className="bg-navy text-cream">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
          {t('message')}
        </label>
        <textarea
          id="cf-message"
          rows={5}
          className={`${inputBase} resize-none`}
          placeholder={t('message')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '...' : t('submit')}
      </button>

      {/* Error */}
      {error && (
        <p role="alert" className="font-sans text-sm text-red-400 pt-2">
          {error}
        </p>
      )}
    </form>
  );
}

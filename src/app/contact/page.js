'use client';

import React, { useState, useRef, useEffect } from 'react';
import DarkAquamorphicBackground from '../components/DarkAquamorphicBackground';
import { useTheme } from 'next-themes';

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const STEPS    = [{ id: 1, label: 'You' }, { id: 2, label: 'Project' }, { id: 3, label: 'Schedule' }];
const BUDGETS  = ['Under $500', '$500 – $1k', '$1k – $5k', '$5k – $10k', '$10k+', "Let's discuss"];
const DEADLINES = ['ASAP', '2 – 4 weeks', '1 – 2 months', '2 – 3 months', 'No rush'];
const SLOTS    = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Evening (5pm – 8pm)', 'Flexible'];

function TzSelect({ value, onChange, options, isDark, c }) {
  const [open,   setOpen]   = useState(false);
  const [query,  setQuery]  = useState('');
  const wrapRef  = useRef(null);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? options.filter(tz => tz.toLowerCase().replace(/_/g, ' ').includes(query.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    const fn = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const select = tz => {
    onChange(tz);
    setQuery('');
    setOpen(false);
  };

  const displayValue = open ? query : (value ? value.replace(/_/g, ' ') : '');

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          value={displayValue}
          placeholder={value ? value.replace(/_/g, ' ') : 'Search timezone…'}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setOpen(true); setQuery(''); }}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 36px 11px 14px',
            background: c.inputBg,
            border: `1px solid ${open ? (isDark ? 'rgba(91,140,255,0.5)' : 'rgba(30,58,95,0.4)') : c.inputBorder}`,
            borderRadius: open ? '10px 10px 0 0' : 10,
            boxShadow: open ? (isDark ? '0 0 0 3px rgba(91,140,255,0.08)' : '0 0 0 3px rgba(30,58,95,0.06)') : 'none',
            color: c.inputText,
            fontSize: 14,
            fontFamily: "'Satoshi', sans-serif",
            outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s, border-radius 0.1s',
          }}
        />
        <span style={{
          position: 'absolute', right: 12, top: '50%', transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
          color: c.muted, fontSize: 10, pointerEvents: 'none', transition: 'transform 0.2s',
        }}>▼</span>
      </div>

      {open && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          background: isDark ? '#0d1829' : '#fff',
          border: `1px solid ${isDark ? 'rgba(91,140,255,0.4)' : 'rgba(30,58,95,0.3)'}`,
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
          maxHeight: 220,
          overflowY: 'auto',
          boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 16px 40px rgba(0,0,0,0.12)',
        }}>
          {filtered.map(tz => (
            <div
              key={tz}
              onMouseDown={() => select(tz)}
              style={{
                padding: '9px 14px',
                fontSize: 13,
                fontFamily: "'Satoshi', sans-serif",
                cursor: 'pointer',
                color: tz === value ? (isDark ? '#a8c4ff' : '#1e3a5f') : c.inputText,
                background: tz === value
                  ? (isDark ? 'rgba(91,140,255,0.12)' : 'rgba(30,58,95,0.06)')
                  : 'transparent',
                borderLeft: tz === value ? `2px solid ${isDark ? 'rgba(91,140,255,0.6)' : 'rgba(30,58,95,0.5)'}` : '2px solid transparent',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (tz !== value) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'; }}
              onMouseLeave={e => { if (tz !== value) e.currentTarget.style.background = 'transparent'; }}
            >
              {tz.replace(/_/g, ' ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  const [step, setStep]             = useState(1);
  const [direction, setDirection]   = useState('forward');
  const [animKey, setAnimKey]       = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');
  const honeypotRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '',
    idea: '', budget: '', deadline: '',
    availability: '', timezone: '',
  });

  const [tzOptions, setTzOptions] = useState([]);

  // Auto-detect timezone and build options list on mount
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Use full IANA list if available, else static fallback
      const all = typeof Intl.supportedValuesOf === 'function'
        ? Intl.supportedValuesOf('timeZone')
        : [
            'Pacific/Honolulu','America/Anchorage','America/Los_Angeles','America/Denver',
            'America/Chicago','America/New_York','America/Sao_Paulo','UTC',
            'Europe/London','Europe/Paris','Europe/Helsinki','Europe/Moscow',
            'Asia/Dubai','Asia/Karachi','Asia/Kolkata','Asia/Dhaka','Asia/Bangkok',
            'Asia/Singapore','Asia/Tokyo','Australia/Sydney','Pacific/Auckland',
          ];
      // Ensure detected tz is in the list
      const list = detected && !all.includes(detected) ? [detected, ...all] : all;
      setTzOptions(list);
      if (detected) set('timezone', detected);
    } catch {}
  }, []);

  const c = {
    bg:            isDark ? '#07101f'                : '#f5f4f0',
    heading:       isDark ? '#eaf2ff'                : '#0f172a',
    sub:           isDark ? 'rgba(200,220,255,0.55)' : 'rgba(15,23,42,0.5)',
    card:          isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
    cardBorder:    isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    inputBg:       isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    inputBorder:   isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    inputText:     isDark ? '#eaf2ff'                : '#0f172a',
    label:         isDark ? 'rgba(200,220,255,0.4)'  : 'rgba(15,23,42,0.4)',
    muted:         isDark ? 'rgba(200,220,255,0.3)'  : 'rgba(15,23,42,0.3)',
    chipBg:        isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    chipBorder:    isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)',
    chipSel:       isDark ? 'rgba(91,140,255,0.15)'  : 'rgba(30,58,95,0.08)',
    chipSelBorder: isDark ? 'rgba(91,140,255,0.5)'   : 'rgba(30,58,95,0.4)',
    chipSelText:   isDark ? '#a8c4ff'                : '#1e3a5f',
    stepActive:    isDark ? '#eaf2ff'                : '#0f172a',
    stepIdle:      isDark ? 'rgba(200,220,255,0.2)'  : 'rgba(15,23,42,0.2)',
    dot:           isDark ? 'rgba(100,210,100,0.9)'  : 'rgba(34,160,34,0.9)',
    dotGlow:       isDark ? 'rgba(100,210,100,0.12)' : 'rgba(34,160,34,0.1)',
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px',
    background: c.inputBg,
    border: `1px solid ${c.inputBorder}`,
    borderRadius: 10,
    color: c.inputText,
    fontSize: 15,
    fontFamily: "'Satoshi', sans-serif",
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  };

  const onFocus = e => {
    e.target.style.borderColor = isDark ? 'rgba(91,140,255,0.5)' : 'rgba(30,58,95,0.4)';
    e.target.style.boxShadow   = isDark ? '0 0 0 3px rgba(91,140,255,0.08)' : '0 0 0 3px rgba(30,58,95,0.06)';
  };
  const onBlur = e => { e.target.style.borderColor = c.inputBorder; e.target.style.boxShadow = 'none'; };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    if (step === 1) {
      if (!form.name.trim())  { setError('Enter your name.'); return false; }
      if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
                               { setError('Enter a valid email.'); return false; }
    }
    if (step === 2) {
      if (!form.idea.trim())  { setError('Give a brief idea of your project.'); return false; }
    }
    return true;
  };

  const next = () => {
    setError('');
    if (!validate()) return;
    setDirection('forward');
    setAnimKey(k => k + 1);
    setStep(s => s + 1);
  };

  const back = () => {
    setError('');
    setDirection('back');
    setAnimKey(k => k + 1);
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (honeypotRef.current?.value) return;
    if (!form.availability) { setError('Pick an availability slot.'); return; }

    setIsSubmitting(true);
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: 'Discovery Call Request',
          message: `Project: ${form.idea}\nBudget: ${form.budget || 'Not specified'}\nDeadline: ${form.deadline || 'Not specified'}\nAvailability: ${form.availability}\nTimezone: ${form.timezone || 'Not specified'}`,
          website: honeypotRef.current?.value || '',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) setError(json?.error || 'Failed to send.');
      else {
        setSubmitted(true);
        setForm({ name: '', email: '', idea: '', budget: '', deadline: '', availability: '', timezone: '' });
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Chip = ({ value, selected, onClick }) => (
    <button type="button" onClick={onClick}
      className={selected ? 'chip chip-selected' : 'chip'}
      style={{
        padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13,
        fontFamily: "'Satoshi', sans-serif", fontWeight: selected ? 600 : 400,
        background: selected ? c.chipSel : c.chipBg,
        border: `1px solid ${selected ? c.chipSelBorder : c.chipBorder}`,
        color: selected ? c.chipSelText : c.inputText,
        transition: 'background 0.15s, border-color 0.15s, color 0.15s, transform 0.12s',
      }}>
      {value}
    </button>
  );

  const animClass = direction === 'forward' ? 'step-enter-fwd' : 'step-enter-back';

  return (
    <DarkAquamorphicBackground>
      <div style={{ position: 'fixed', inset: 0, background: c.bg, zIndex: 0, transition: 'background 0.3s' }} />

      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px',
        fontFamily: "'Satoshi', sans-serif",
      }}>
        <div style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'stretch' }} className="contact-layout">

          {/* ── Left: flow column ── */}
          <div>

          {/* Header */}
          {!submitted && (
            <div style={{ textAlign: 'center', marginBottom: 36 }} className="page-header">
              <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.05, color: c.heading, letterSpacing: '-0.03em' }}>
                Let&apos;s work together.
              </h1>
              <p style={{ marginTop: 12, fontSize: 14, color: c.sub, lineHeight: 1.65 }}>
                Takes 2 minutes. I&apos;ll get back to you within 12 hours.
              </p>
            </div>
          )}

          {/* Step indicator */}
          {!submitted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28, justifyContent: 'center' }}>
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      background: step > s.id
                        ? 'linear-gradient(135deg, #1e3a5f, #0f2744)'
                        : step === s.id
                          ? (isDark ? 'rgba(91,140,255,0.15)' : 'rgba(30,58,95,0.08)')
                          : 'transparent',
                      border: step === s.id
                        ? `1.5px solid ${isDark ? 'rgba(91,140,255,0.6)' : 'rgba(30,58,95,0.4)'}`
                        : `1.5px solid ${step > s.id ? 'transparent' : c.chipBorder}`,
                      color: step > s.id ? '#fff' : step === s.id ? c.stepActive : c.stepIdle,
                      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    }}>
                      {step > s.id ? '✓' : s.id}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: step === s.id ? c.heading : c.muted,
                      transition: 'color 0.2s',
                    }}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: 'relative', width: 48, height: 1, margin: '0 8px', marginBottom: 20, background: c.chipBorder, overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: isDark ? 'rgba(91,140,255,0.5)' : 'rgba(30,58,95,0.35)',
                        transform: `scaleX(${step > s.id ? 1 : 0})`,
                        transformOrigin: 'left',
                        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Card */}
          {!submitted ? (
            <div style={{
              background: c.card,
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 18,
              padding: '32px 28px',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
            }}>
              <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off"
                style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }} />

              {/* Animated step content */}
              <div key={animKey} className={animClass}>

                {/* Step 1 — You */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: c.heading }}>
                      First, who are you?
                    </p>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Your name</label>
                      <input name="name" type="text" value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="e.g. Mahesh Bhatia"
                        autoComplete="name" autoFocus
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Work email</label>
                      <input name="email" type="email" value={form.email} onChange={e => set('email', e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 — Project */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: c.heading }}>
                      Tell me about the project.
                    </p>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Brief idea</label>
                      <textarea name="idea" value={form.idea} onChange={e => set('idea', e.target.value)}
                        placeholder="What are you building? What problem does it solve?"
                        rows={4}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                        onFocus={onFocus} onBlur={onBlur}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 10, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Budget</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {BUDGETS.map(b => (
                          <Chip key={b} value={b} selected={form.budget === b} onClick={() => set('budget', form.budget === b ? '' : b)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 10, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Deadline</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {DEADLINES.map(d => (
                          <Chip key={d} value={d} selected={form.deadline === d} onClick={() => set('deadline', form.deadline === d ? '' : d)} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 — Schedule */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: c.heading }}>
                      When are you free?
                    </p>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 10, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Preferred time slot</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {SLOTS.map(s => (
                          <Chip key={s} value={s} selected={form.availability === s} onClick={() => set('availability', s)} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: c.label, marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                        Your timezone
                      </label>
                      <TzSelect
                        value={form.timezone}
                        onChange={tz => set('timezone', tz)}
                        options={tzOptions}
                        isDark={isDark}
                        c={c}
                      />
                    </div>

                    {error && <p style={{ margin: 0, fontSize: 13, color: '#f87171', fontWeight: 500 }}>{error}</p>}

                    <button type="submit" disabled={isSubmitting} style={{
                      marginTop: 4, padding: '13px 28px',
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
                      color: '#fff', border: 'none', borderRadius: 10,
                      fontWeight: 700, fontSize: 15,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontFamily: "'Satoshi', sans-serif",
                      boxShadow: '0 4px 24px rgba(15,39,68,0.5)',
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: 'opacity 0.15s, transform 0.15s',
                      letterSpacing: '0.01em',
                    }}
                      onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                    >
                      {isSubmitting ? 'Booking…' : 'Book discovery call →'}
                    </button>
                    <p style={{ margin: 0, fontSize: 12, color: c.muted, textAlign: 'center' }}>
                      No commitment. Just a 30-min conversation.
                    </p>
                  </form>
                )}

              </div>{/* /animated content */}

              {/* Navigation (steps 1 & 2) */}
              {step < 3 && (
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {step > 1
                    ? <button type="button" onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: c.muted, fontFamily: "'Satoshi', sans-serif", padding: 0, transition: 'color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = c.heading; }}
                        onMouseLeave={e => { e.currentTarget.style.color = c.muted; }}>
                        ← Back
                      </button>
                    : <span />
                  }
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    {error && <p style={{ margin: 0, fontSize: 13, color: '#f87171', fontWeight: 500 }}>{error}</p>}
                    <button type="button" onClick={next} style={{
                      padding: '11px 24px',
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
                      color: '#fff', border: 'none', borderRadius: 9,
                      fontWeight: 700, fontSize: 14,
                      cursor: 'pointer', fontFamily: "'Satoshi', sans-serif",
                      boxShadow: '0 4px 18px rgba(15,39,68,0.45)',
                      transition: 'transform 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success */
            <div className="success-enter" style={{
              background: c.card,
              border: `1px solid ${isDark ? 'rgba(74,222,128,0.2)' : 'rgba(22,101,52,0.2)'}`,
              borderRadius: 18,
              padding: '52px 32px',
              backdropFilter: 'blur(12px)',
              textAlign: 'center',
            }}>
              <div className="checkmark-pop" style={{ fontSize: 36, marginBottom: 16, display: 'inline-block',
                width: 64, height: 64, borderRadius: '50%',
                background: isDark ? 'rgba(74,222,128,0.1)' : 'rgba(22,101,52,0.08)',
                border: `1px solid ${isDark ? 'rgba(74,222,128,0.25)' : 'rgba(22,101,52,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>✓</div>
              <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: c.heading }}>Request sent.</h2>
              <p style={{ margin: 0, fontSize: 14, color: c.sub, lineHeight: 1.65, maxWidth: 340, marginInline: 'auto' }}>
                I&apos;ll review your brief and reach out within 24 hours to confirm a time for our call.
              </p>
              <button onClick={() => { setSubmitted(false); setStep(1); setDirection('forward'); setAnimKey(k => k + 1); }} style={{
                marginTop: 24, padding: '10px 22px',
                background: 'transparent',
                border: `1px solid ${c.chipBorder}`,
                borderRadius: 9, cursor: 'pointer',
                fontSize: 13, color: c.sub, fontFamily: "'Satoshi', sans-serif",
                transition: 'color 0.15s, border-color 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = c.heading; e.currentTarget.style.borderColor = c.inputBorder; }}
                onMouseLeave={e => { e.currentTarget.style.color = c.sub; e.currentTarget.style.borderColor = c.chipBorder; }}
              >
                Submit another
              </button>
            </div>
          )}

          </div>{/* /flow column */}

          {/* ── Right: direct contact card ── */}
          <div style={{ position: 'sticky', top: 100, alignSelf: 'stretch' }} className="direct-card">
            <div style={{
              background: c.card,
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 18,
              padding: '28px 22px',
              backdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column', gap: 20,
              height: '100%', boxSizing: 'border-box',
            }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 25, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.heading }}>
                  Prefer direct contact?
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { label: 'Email',    value: 'yash@theyash.dev',    href: 'mailto:yash@theyash.dev',                     color: isDark ? 'rgba(200,220,255,0.6)' : 'rgba(15,23,42,0.5)', icon: <EmailIcon /> },
                  { label: 'Discord',  value: 'the.yash',            href: 'https://discord.com/users/848724317416325160', color: '#5865F2', icon: <DiscordIcon /> },
                  { label: 'LinkedIn', value: '/in/theyash07',        href: 'https://linkedin.com/in/theyash07',           color: '#0A66C2', icon: <LinkedInIcon /> },
                  { label: 'Telegram', value: '@offbeatjs',           href: 'https://t.me/offbeatjs',                      color: '#2AABEE', icon: <TelegramIcon /> },
                ].map(({ label, value, href, icon, color }) => (
                  <a key={label} href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="direct-link"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 10px', borderRadius: 10,
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      fontSize: 13, fontWeight: 800, color,
                    }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      <div style={{ fontSize: 14, color: c.heading, fontWeight: 500, marginTop: 2 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ height: 1, background: c.cardBorder }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* <span className="dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot, flexShrink: 0 }} /> */}
               
              </div>
            </div>
          </div>

        </div>{/* /grid */}
      </div>

      <style jsx>{`
        .contact-layout {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .direct-link:hover {
          background: ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
        }
        @media (max-width: 680px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
          .direct-card {
            position: static !important;
          }
        }
      `}</style>
      <style jsx>{`
        /* Page entrance */
        .page-header {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Step transitions */
        .step-enter-fwd {
          animation: stepFwd 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .step-enter-back {
          animation: stepBack 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes stepFwd {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepBack {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Chip bounce on select */
        .chip:active {
          transform: scale(0.94);
        }
        .chip-selected {
          animation: chipPop 0.18s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes chipPop {
          0%   { transform: scale(0.93); }
          100% { transform: scale(1); }
        }

        /* Success state */
        .success-enter {
          animation: successIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .checkmark-pop {
          animation: checkIn 0.5s 0.15s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes successIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Availability badge dot pulse */
        .dot-pulse {
          box-shadow: 0 0 0 0 currentColor;
          animation: dotPulse 2.5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(100,210,100,0.5); }
          60%  { box-shadow: 0 0 0 5px rgba(100,210,100,0); }
          100% { box-shadow: 0 0 0 0 rgba(100,210,100,0); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .step-enter-fwd, .step-enter-back,
          .success-enter, .checkmark-pop,
          .page-header, .dot-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </DarkAquamorphicBackground>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DottedSurface } from './components/ui/dotted-surface';
import { IdentityCardBody, RevealCardContainer } from '@/app/components/ui/animated-profile-card';
import { Mail, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

// Simple inline SVGs for brand icons (lucide deprecated them)
const GhIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const XIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
  </svg>
);
const LiIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const skillGroups = [
  {
    label: 'Automation & AI Systems',
    items: [
      'Node.js', 'Python',
      'OpenAI / LLM APIs',
      'WhatsApp API', 'Telegram Bots',
      'Webhooks', 'Event-driven systems',
      'Puppeteer', 'Playwright',
      'Task automation', 'Workflow orchestration'
    ]
  },
  {
    label: 'Backend & APIs',
    items: [
      'REST APIs', 'API Design',
      'Authentication (JWT, OAuth)',
      'Database Design',
      'Third-party integrations',
      'Payment integrations (Stripe, Razorpay)',
      'Email & messaging systems'
    ]
  },
  {
    label: 'Frontend & Interfaces',
    items: [
      'React', 'Next.js',
      'Tailwind CSS',
      'Responsive UI',
      'Dashboard interfaces',
      'Component-driven design'
    ]
  },
  {
    label: 'Infrastructure & Systems',
    items: [
      'Docker', 'Linux',
      'VPS deployment',
      'CI/CD basics',
      'Git & version control',
      'System architecture thinking'
    ]
  },
  {
    label: 'Specialized Work',
    items: [
      'WhatsApp automation systems',
      'AI chatbots',
      'Internal tools & dashboards',
      'Scraping & data pipelines',
      'Business workflow automation'
    ]
  }
];

const profile = {
  avatarUrl: "/cat.jpg",
  avatarText: "Y",
  fullName: "Yash",
  place: "🇮🇳",
  about: "Full-stack web developer. Specializing in modern web interfaces, APIs and automation bots for Social platforms.",
  socials: [
    { id: "gh",   url: "https://github.com/offbeatjs",      label: "GitHub",   icon: <GhIcon /> },
    { id: "tw",   url: "https://x.com/not_yash_",           label: "Twitter",  icon: <XIcon /> },
    { id: "li",   url: "https://linkedin.com/in/theyash07", label: "LinkedIn", icon: <LiIcon /> },
    { id: "mail", url: "mailto:yash@theyash.dev",       label: "Email",    icon: <Mail className="h-5 w-5" /> },
  ],
};

const inlineSocials = [
  { href: 'https://github.com/offbeatjs',      label: 'GitHub',   icon: <GhIcon /> },
  { href: 'https://x.com/not_yash_',           label: 'Twitter',  icon: <XIcon /> },
  { href: 'https://linkedin.com/in/theyash07', label: 'LinkedIn', icon: <LiIcon /> },
  { href: 'mailto:yash@theyash.dev',           label: 'Email',    icon: <Mail size={17} /> },
];

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  // Theme-aware color tokens
  const c = {
    heading:     isDark ? '#eaf2ff'                  : '#0f172a',
    sub:         isDark ? 'rgba(200,220,255,0.85)'   : 'rgba(15,23,42,0.75)',
    pillBg:      isDark ? 'rgba(255,255,255,0.03)'   : 'rgba(0,0,0,0.04)',
    pillBorder:  isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.08)',
    pillText:    isDark ? 'rgba(200,220,255,0.7)'    : 'rgba(15,23,42,0.65)',
    labelText:   isDark ? 'rgba(200,220,255,0.3)'    : 'rgba(15,23,42,0.3)',
    divider:     isDark ? 'rgba(255,255,255,0.05)'   : 'rgba(0,0,0,0.07)',
    iconColor:   isDark ? 'rgba(200,220,255,0.4)'    : 'rgba(15,23,42,0.35)',
    iconHover:   isDark ? 'rgba(200,220,255,0.9)'    : 'rgba(15,23,42,0.9)',
    iconHoverBg: isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.06)',
    anonText:    isDark ? 'rgba(200,220,255,0.4)'    : 'rgba(15,23,42,0.4)',
    anonBorder:  isDark ? 'rgba(255,255,255,0.07)'   : 'rgba(0,0,0,0.1)',
    ctaSecBorder:isDark ? 'rgba(255,255,255,0.08)'   : 'rgba(0,0,0,0.1)',
    ctaSecText:  isDark ? 'rgba(200,220,255,0.7)'    : 'rgba(15,23,42,0.65)',
  };

  const cyclingWords = [
    { text: 'WhatsApp', color: '#25D366' },
    { text: 'Discord',  color: '#5865F2' },
    { text: 'Telegram', color: '#2AABEE' },
  ];
  const [showHi,      setShowHi]      = useState(false);
  const [showYash,    setShowYash]    = useState(false);
  const [typed1,      setTyped1]      = useState('');
  const [typed2,      setTyped2]      = useState('');
  const [wordIndex,   setWordIndex]   = useState(0);
  const [wordBlur,    setWordBlur]    = useState(false);
  const [anonOpen,    setAnonOpen]    = useState(false);
  const [toast,       setToast]       = useState(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowHi(true),  200);
    const t2 = setTimeout(() => setShowYash(true), 800);
    let iv;
    const t3 = setTimeout(() => {
      const part1 = ' I build AI-powered automation systems for ';
      let i = 0;
      iv = setInterval(() => {
        if (i < part1.length) { setTyped1(part1.slice(0, ++i)); }
        else {
          clearInterval(iv);
          // type second part after cycling word
          const part2 = ', APIs, and business workflows.';
          let j = 0;
          iv = setInterval(() => {
            if (j < part2.length) setTyped2(part2.slice(0, ++j));
            else clearInterval(iv);
          }, 38);
        }
      }, 38);
    }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(iv); };
  }, []);

  // Cycle word every 2s with blur transition
  useEffect(() => {
    const id = setInterval(() => {
      setWordBlur(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % cyclingWords.length);
        setWordBlur(false);
      }, 300);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!anonOpen) return;
    const fn = (e) => { if (e.key === 'Escape') setAnonOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [anonOpen]);

  function showToast(msg, ok) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: isDark ? '#07101f' : '#f5f4f0', zIndex: 0 }} />
      <DottedSurface className="!z-[1]" />

      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '160px 24px 80px',
          gap: 56,
          boxSizing: 'border-box',
          flexWrap: 'wrap',
        }}
        className="md:!pt-28"
      >
        {/* Left: hero */}
        <section style={{ maxWidth: 480, flex: '1 1 400px' }}>

          {/* Headline */}
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 4.5vw, 50px)', lineHeight: 1.2, color: c.heading, fontWeight: 700, fontFamily: "'Satoshi', sans-serif" }}>
            <span style={{
              opacity: showHi ? 1 : 0, filter: showHi ? 'blur(0)' : 'blur(8px)',
              transition: 'opacity 0.5s ease, filter 0.5s ease', display: 'inline-block',
            }}>Hi.</span>
            {' '}
            <span style={{
              opacity: showYash ? 1 : 0, filter: showYash ? 'blur(0)' : 'blur(8px)',
              transition: 'opacity 0.5s ease, filter 0.5s ease', display: 'inline-block',
            }}>I&apos;m Yash.</span><br />
            {typed1}
            <span style={{
              display: 'inline-block',
              minWidth: '7ch',
              filter: wordBlur ? 'blur(10px)' : 'blur(0)',
              transition: 'filter 0.5s ease, color 0s',
              verticalAlign: 'baseline',
              color: typed1.endsWith('for ') ? cyclingWords[wordIndex].color : 'inherit',
            }}>
              {typed1.endsWith('for ') ? cyclingWords[wordIndex].text : ''}
            </span>
            {typed2}
          </h1>

          <p style={{ marginTop: 16, color: c.sub, fontSize: 16, lineHeight: 1.7, maxWidth: 400, fontFamily: "'Satoshi', sans-serif" }}>
            Full-stack developer focused on automation, APIs, and real-world systems.
            I build systems that eliminate repetitive work. Be it bots, API pipelines or internal tools, I help businesses save time and scale efficiently.
          </p>

          {/* CTAs */}
          <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/contact" className="cursor-target" style={{
              display: 'inline-block', padding: '12px 26px',
              background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
              color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14,
              border: 'none',
              boxShadow: '0 4px 24px rgba(15,39,68,0.6), 0 1px 0 rgba(255,255,255,0.1) inset',
              letterSpacing: '0.01em',
            }}>
              Book a Call
            </Link>
            <Link href="/projects" className="cursor-target" style={{
              display: 'inline-block', padding: '10px 20px',
              borderRadius: 9, border: `1px solid ${c.ctaSecBorder}`,
              color: c.ctaSecText, textDecoration: 'none',
              fontWeight: 500, fontSize: 14,
            }}>
              View Work
            </Link>
          </div>

          {/* Skill groups */}
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {skillGroups.map((group) => (
              <div key={group.label}>
                <span style={{
                  display: 'block',
                  fontSize: 10,
                  color: isDark ? 'rgba(200,220,255,0.45)' : 'rgba(15,23,42,0.4)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 5,
                }}>
                  {group.label}
                </span>
                <span style={{
                  fontSize: 14,
                  color: c.sub,
                  lineHeight: 1.5,
                }}>
                  {group.items.join(' · ')}
                </span>
              </div>
            ))}
          </div>

          {/* Divider + socials */}
          <div style={{ marginTop: 32, height: 1, background: c.divider }} />
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 4 }}>
            {inlineSocials.map(({ href, label, icon }) => (
              <a key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={label} className="cursor-target"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: 8,
                  color: c.iconColor, textDecoration: 'none',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = c.iconHover; e.currentTarget.style.background = c.iconHoverBg; }}
                onMouseLeave={e => { e.currentTarget.style.color = c.iconColor; e.currentTarget.style.background = 'transparent'; }}
              >{icon}</a>
            ))}
            
          </div>
        </section>

        {/* Right: profile card */}
        <section style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: -48, position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
          <RevealCardContainer
            accent="#5b8cff"
            textOnAccent="#ffffff"
            mutedOnAccent="rgba(255,255,255,0.8)"
            base={<IdentityCardBody {...profile} scheme="plain" displayAvatar={true} />}
          />
        </section>
      </main>

      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          padding: '12px 18px',
          background: 'rgba(20,28,45,0.95)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${toast.ok ? 'rgba(74,222,128,0.2)' : 'rgba(220,60,60,0.2)'}`,
          borderRadius: 10,
          color: toast.ok ? '#a7f3d0' : '#ffaaaa',
          fontSize: 13, fontWeight: 500,
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.25s ease-out',
        }}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

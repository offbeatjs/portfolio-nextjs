"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import DarkAquamorphicBackground from './components/DarkAquamorphicBackground';
import AnonModal from './components/AnonModal';
import Toast from './components/Toast';
import { DottedSurface } from './components/ui/dotted-surface';
import { IdentityCardBody, RevealCardContainer } from '@/app/components/ui/animated-profile-card';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import toastStyles from './styles/Toast.module.css';

export default function Home() {
  const skills = ['JavaScript', 'Next.js', 'Discord.js', 'Node.js', 'React', 'HTML/CSS', 'MERN', 'Git', 'Docker', 'REST APIs', 'TypeScript', 'Tailwind CSS'];
  const [anonOpen, setAnonOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const anonRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [showHi, setShowHi] = useState(false);
  const [showYash, setShowYash] = useState(false);
  const [showAnonSuccess, setShowAnonSuccess] = useState(false);
  const [showAnonError, setShowAnonError] = useState(false);
  const [anonErrorMessage, setAnonErrorMessage] = useState('');

  useEffect(() => {
    // Show "Hi." with fade-in
    const hiTimer = setTimeout(() => setShowHi(true), 200);
    
    // Show "I'm Yash" with fade-in
    const yashTimer = setTimeout(() => setShowYash(true), 800);
    
    // Start typing effect for the rest
    let typeInterval;
    const restTimer = setTimeout(() => {
      const text = ' I weave apps and dreams.';
      let index = 0;
      
      typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 40); // 40ms per character for smooth, fast typing
    }, 1400);
    
    return () => {
      clearTimeout(hiTimer);
      clearTimeout(yashTimer);
      clearTimeout(restTimer);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, []);

  // Profile data for the animated card
  const profile = {
    avatarUrl: "/cat.jpg",
    avatarText: "Y",
    fullName: "Yash",
    place: "🇮🇳",
    about: "Full-stack web developer. Specializing in creating mordern web interfaces, APIs and automation bots for Discord, Telegram.",
    socials: [
      {
        id: "gh",
        url: "https://github.com/offbeatjs",
        label: "GitHub",
        icon: <Github className="h-5 w-5" />,
      },
      {
        id: "tw",
        url: "https://x.com/not_yash_",
        label: "Twitter",
        icon: <Twitter className="h-5 w-5" />,
      },
      {
        id: "li",
        url: "https://linkedin.com/in/theyash07",
        label: "LinkedIn",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        id: "mail",
        url: "mailto:the.yashh@icloud.com",
        label: "Email",
        icon: <Mail className="h-5 w-5" />,
      },
    ],
  };

  // Draggable state and position for modal
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setAnonOpen(false);
    }
    if (anonOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anonOpen]);

  function startDrag(e) {
    const el = anonRef.current;
    if (!el) return;
    dragState.current.dragging = true;
    const rect = el.getBoundingClientRect();
    dragState.current.startX = e.clientX || (e.touches && e.touches[0].clientX);
    dragState.current.startY = e.clientY || (e.touches && e.touches[0].clientY);
    dragState.current.originX = rect.left;
    dragState.current.originY = rect.top;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', endDrag);
  }

  function onDrag(e) {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const cx = e.clientX || (e.touches && e.touches[0].clientX);
    const cy = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = cx - dragState.current.startX;
    const dy = cy - dragState.current.startY;
    setModalPos({ x: dragState.current.originX + dx, y: dragState.current.originY + dy });
  }

  function endDrag() {
    dragState.current.dragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', endDrag);
  }

  // Add blur overlay when modal open is handled inside AnonModal (keeps modal sharp)
  function pushToast(message, opts = { type: 'info', duration: 3000 }) {
    const id = Date.now() + Math.random().toString(36).slice(2, 9);
    setToasts((s) => [...s, { id, message, ...opts }]);
  }

  function removeToast(id) {
    setToasts((s) => s.filter((t) => t.id !== id));
  }

  return (
    <DarkAquamorphicBackground>
      <DottedSurface />

      {/* Right-side floating translucent button */}
      <button
        onClick={() => setAnonOpen(true)}
        aria-haspopup="dialog"
        className="cursor-target"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 28,
          zIndex: 1200,
          padding: '12px 14px',
          borderRadius: 999,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
          color: '#eaf2ff',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 30px rgba(2,6,20,0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Send me an anonymous message
      </button>

            <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 48px',
          gap: 48,
          boxSizing: 'border-box',
          flexWrap: 'wrap',
        }}
        className="md:!pt-12"
      >
        {/* Hero / Intro */}
        <section style={{ maxWidth: 720, flex: '1 1 520px' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.05,
              color: '#eaf2ff',
            }}
          >
            <span 
              style={{
                opacity: showHi ? 1 : 0,
                filter: showHi ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 0.6s ease-out, filter 0.6s ease-out',
                display: 'inline-block',
              }}
            >
              Hi.
            </span>
            {' '}
            <span 
              style={{
                opacity: showYash ? 1 : 0,
                filter: showYash ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 0.6s ease-out, filter 0.6s ease-out',
                display: 'inline-block',
              }}
            >
              I&apos;m Yash.
            </span>
            {typedText}
          </h1>
          <p
            style={{
              marginTop: 18,
              color: 'rgba(230,240,255,0.9)',
              maxWidth: 560,
              fontSize: 16,
            }}
          >
            I design and implement performant, accessible interfaces with a focus
            on clean UX and reliable code. Currently building with Next.js, Node,
            and modern frontend tools.
          </p>

          <div
            style={{
              marginTop: 22,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Link
              href="/projects"
              className="cursor-target"
              style={{
                display: 'inline-block',
                padding: '10px 16px',
                background: 'linear-gradient(90deg,#5b8cff,#8b5cf0)',
                color: '#07102a',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              View projects
            </Link>

            <Link
              href="/contact"
              className="cursor-target"
              style={{
                display: 'inline-block',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(230,240,255,0.95)',
                textDecoration: 'none',
              }}
            >
              Get in touch
            </Link>
          </div>

          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: '6px 10px',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(200,220,255,0.92)',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Animated Profile Card - Right Side */}
        <section style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RevealCardContainer
            accent="#5b8cff"
            textOnAccent="#ffffff"
            mutedOnAccent="rgba(255,255,255,0.8)"
            base={
              <IdentityCardBody {...profile} scheme="plain" displayAvatar={true} />
            }
            // overlay={
            //   <IdentityCardBody
            //     {...profile}
            //     scheme="plain"
            //     displayAvatar={true}
            //     // cardCss={{ backgroundColor: "var(--accent-color)" }}
            //   />
            // }
          />
        </section>

      </main>

      {/* Anonymous modal (uses shared overlay/blur style similar to HireMe) */}
      <AnonModal
        open={anonOpen}
        onClose={() => setAnonOpen(false)}
        onSuccess={(res) => {
          if (res?.ok) {
            setShowAnonSuccess(true);
            setTimeout(() => setShowAnonSuccess(false), 5000);
          } else {
            setAnonErrorMessage(res?.message || 'Failed to send message');
            setShowAnonError(true);
            setTimeout(() => setShowAnonError(false), 5000);
          }
        }}
      />

      {/* Anonymous Message Success Notification */}
      {showAnonSuccess && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
            background: "rgba(30, 35, 50, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "16px 20px",
            minWidth: "320px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #5b8cff, #8b5cf0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#eaf2ff", marginBottom: "4px" }}>
                Message Sent!
              </div>
              <div style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)", lineHeight: 1.4 }}>
                Your anonymous message has been delivered.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Anonymous Message Error Notification */}
      {showAnonError && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
            background: "rgba(30, 35, 50, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,100,100,0.3)",
            borderRadius: "12px",
            padding: "16px 20px",
            minWidth: "320px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff5b5b, #ff8b8b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              ✕
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#eaf2ff", marginBottom: "4px" }}>
                Failed to Send
              </div>
              <div style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)", lineHeight: 1.4 }}>
                {anonErrorMessage}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Toast container */}
      <div className={toastStyles.container} aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} id={t.id} message={t.message} type={t.type} duration={t.duration} onClose={removeToast} />
        ))}
      </div>
    </DarkAquamorphicBackground>
  );
}

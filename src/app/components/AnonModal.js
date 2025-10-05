"use client";

import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/AnonModal.module.css';

export default function AnonModal({ open, onClose, onSuccess }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const modalRef = useRef(null);

  // drag state
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    // reset when opened
    if (open) {
      setText('');
      setPos({ x: 0, y: 0 });
    }
  }, [open]);

  function startDrag(e) {
    const el = modalRef.current;
    if (!el) return;
    dragState.current.dragging = true;
    const rect = el.getBoundingClientRect();
    dragState.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragState.current.startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
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
    setPos({ x: dragState.current.originX + dx, y: dragState.current.originY + dy });
  }

  function endDrag() {
    dragState.current.dragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', endDrag);
  }

  async function handleSend() {
    if (!text.trim()) return;
    try {
      setSending(true);
      const res = await fetch('/api/anon-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Send failed');
      setText('');
      onClose();
      onSuccess && onSuccess({ ok: true, message: 'Anonymous message sent — thank you!' });
    } catch (err) {
      console.error(err);
      onSuccess && onSuccess({ ok: false, message: 'Failed to send anonymous message.' });
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Send anonymous message" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={modalRef}
        className={styles.modal}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <div className={styles.titleBar} onMouseDown={startDrag}>
          <div className={styles.traffic} aria-hidden />
          <div className={styles.title}>Send anonymous message</div>
          <div style={{ width: 36 }} />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your anonymous message here..."
          className={styles.textarea}
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.send} onClick={handleSend} disabled={sending || !text.trim()}>
            {sending ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

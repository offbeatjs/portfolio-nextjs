'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/DarkAquamorphicBackground.module.css';

const TechCanvasBackground = ({ children, className = '' }) => {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const mouseRef     = useRef({ x: 0.5, y: 0.5 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId  = null;
    let running = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Colors derived from theme
    const bgFrom      = isDark ? '#05050a' : '#f0f4ff';
    const bgTo        = isDark ? '#0b1020' : '#e8eeff';
    const gridLine    = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,80,0.04)';
    const lineColor   = isDark ? '120,160,255' : '60,100,200';
    const glowInner   = isDark ? 'rgba(140,180,255,0.9)'  : 'rgba(60,100,220,0.85)';
    const glowMid     = isDark ? 'rgba(80,110,200,0.12)'  : 'rgba(60,100,220,0.08)';
    const dotColor    = isDark ? 'rgba(200,220,255,0.95)' : 'rgba(30,60,180,0.9)';
    const pulseColor  = isDark ? '140,180,255' : '60,100,220';

    function resize() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width  = rect.width  + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const nodes = [];
    const cols = 10, rows = 6, margin = 40;

    function initNodes() {
      nodes.length = 0;
      const { width: w, height: h } = canvas.getBoundingClientRect();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const nx = margin + (i / (cols - 1)) * (w - margin * 2) + (Math.random() - 0.5) * 18;
          const ny = margin + (j / (rows - 1)) * (h - margin * 2) + (Math.random() - 0.5) * 18;
          nodes.push({ x: nx, y: ny, ox: nx, oy: ny, phase: Math.random() * Math.PI * 2, speed: 0.0008 + Math.random() * 0.0014, size: 1 + Math.random() * 2, pulse: 0 });
        }
      }
    }

    let lastTime = performance.now();
    const minFrameDelta = 1000 / 45;

    function draw(now) {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, bgFrom);
      g.addColorStop(1, bgTo);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridLine;
      for (let i = 0; i <= cols; i++) { const x = i * (w / cols); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let j = 0; j <= rows; j++) { const y = j * (h / rows); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.restore();

      // Parallax
      const px = (mouseRef.current.x - 0.5) * 30;
      const py = (mouseRef.current.y - 0.5) * 20;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.speed * (now - lastTime);
        n.x = n.ox + Math.sin(n.phase) * 8 + px * 0.12;
        n.y = n.oy + Math.cos(n.phase * 1.1) * 6 + py * 0.12;
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - (now - lastTime) * 0.002);
      }

      // Connections
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(${lineColor},${(0.18 * (1 - dist / 120)).toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        grad.addColorStop(0, glowInner); grad.addColorStop(0.6, glowMid); grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - 18, n.y - 18, 36, 36);
        ctx.beginPath(); ctx.fillStyle = dotColor; ctx.arc(n.x, n.y, n.size + 0.8, 0, Math.PI * 2); ctx.fill();
        if (n.pulse > 0) {
          const t = 1 - n.pulse;
          ctx.beginPath(); ctx.strokeStyle = `rgba(${pulseColor},${(0.35 * t).toFixed(3)})`; ctx.lineWidth = 1.2 + 2 * t;
          ctx.arc(n.x, n.y, 8 + 30 * t, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }

    let pulseTimer = 0;
    function loop(now) {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      const delta = now - lastTime;
      if (delta < minFrameDelta) return;
      pulseTimer -= delta;
      if (pulseTimer <= 0) { const idx = Math.floor(Math.random() * nodes.length); if (nodes[idx]) nodes[idx].pulse = 1; pulseTimer = 1500 + Math.random() * 2500; }
      draw(now);
      lastTime = now;
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = Math.max(0, Math.min(1, ((e.clientX || (e.touches?.[0].clientX)) - rect.left) / rect.width));
      mouseRef.current.y = Math.max(0, Math.min(1, ((e.clientY || (e.touches?.[0].clientY)) - rect.top)  / rect.height));
    }

    function onWindowResize() { resize(); initNodes(); }

    resize(); initNodes(); lastTime = performance.now();
    if (prefersReduced) { draw(lastTime); return; }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize', onWindowResize, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isDark]);

  if (!isDark) {
    return (
      <div className={`${styles.light_container} ${className}`}>
        <div className={styles.content_wrapper}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${styles.dark_aqua_container} ${className}`}>
      <canvas ref={canvasRef} className={styles.tech_canvas} />
      <div className={styles.content_wrapper}>{children}</div>
    </div>
  );
};

export default TechCanvasBackground;

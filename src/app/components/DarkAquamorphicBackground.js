'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/DarkAquamorphicBackground.module.css';

const TechCanvasBackground = ({ children, className = '' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId = null;
    let running = true;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // sizing with DPR
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Techy nodes grid setup
    const nodes = [];
    const cols = 10;
    const rows = 6;
    const margin = 40;

    function initNodes() {
      nodes.length = 0;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const nx = margin + (i / (cols - 1)) * (w - margin * 2) + (Math.random() - 0.5) * 18;
          const ny = margin + (j / (rows - 1)) * (h - margin * 2) + (Math.random() - 0.5) * 18;
          nodes.push({
            x: nx,
            y: ny,
            ox: nx,
            oy: ny,
            phase: Math.random() * Math.PI * 2,
            speed: 0.0008 + Math.random() * 0.0014,
            size: 1 + Math.random() * 2,
            pulse: 0
          });
        }
      }
    }

    // draw one frame
    let lastTime = performance.now();
    const maxFPS = 45; // cap fps for lower CPU
    const minFrameDelta = 1000 / maxFPS;

    function draw(now) {
      if (!running) return;
      rafId = requestAnimationFrame(draw);
      const delta = now - lastTime;
      if (delta < minFrameDelta) return;
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // clear with very dark background + subtle vignette
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#05050a');
      g.addColorStop(1, '#0b1020');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // slight grid lines (techy, plain)
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      const spacingX = w / cols;
      const spacingY = h / rows;
      for (let i = 0; i <= cols; i++) {
        const x = i * spacingX;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const y = j * spacingY;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // update & draw nodes
      // apply gentle parallax from mouse (small offset)      
      const px = (mouseRef.current.x - 0.5) * 30; // parallax range
      const py = (mouseRef.current.y - 0.5) * 20;

      // node animations: move slightly using sine phases      
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.speed * delta;
        const ox = n.ox + Math.sin(n.phase) * 8;
        const oy = n.oy + Math.cos(n.phase * 1.1) * 6;
        n.x = ox + px * 0.12;
        n.y = oy + py * 0.12;
        // occasional pulse decay
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - delta * 0.002);
      }

      // connect nearby nodes with subtle lines
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = 0.18 * (1 - dist / 120);
            ctx.strokeStyle = `rgba(120,160,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // draw nodes and pulses
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // base glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        grad.addColorStop(0, 'rgba(140,180,255,0.9)');
        grad.addColorStop(0.6, 'rgba(80,110,200,0.12)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - 18, n.y - 18, 36, 36);

        // center dot
        ctx.beginPath();
        ctx.fillStyle = 'rgba(200,220,255,0.95)';
        ctx.arc(n.x, n.y, n.size + 0.8, 0, Math.PI * 2);
        ctx.fill();

        // pulse ring if active
        if (n.pulse > 0) {
          ctx.beginPath();
          const t = 1 - n.pulse;
          ctx.strokeStyle = `rgba(140,180,255,${(0.35 * t).toFixed(3)})`;
          ctx.lineWidth = 1.2 + 2 * t;
          ctx.arc(n.x, n.y, 8 + 30 * t, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // subtle top-right panel gimmick: a thin tech stripe      
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = 'rgba(10,16,30,0.04)';
      ctx.fillRect(w - 220, 24, 200, 110);
      ctx.restore();
    }

    // occasional random pulse to add a gimmick    
    let pulseTimer = 0;
    function pulseTick(delta) {
      pulseTimer -= delta;
      if (pulseTimer <= 0) {
        const idx = Math.floor(Math.random() * nodes.length);
        if (nodes[idx]) nodes[idx].pulse = 1;
        pulseTimer = 1500 + Math.random() * 2500;
      }
    }

    // animation loop wrapper to include pulse ticks    
    function loop(now) {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      const delta = now - lastTime;
      if (delta < minFrameDelta) return;
      lastTime = now;
      pulseTick(delta);
      draw(now);
    }

    // Mouse move for parallax (lightweight): track normalized pos    
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width;
      const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) / rect.height;
      mouseRef.current.x = Math.max(0, Math.min(1, x));
      mouseRef.current.y = Math.max(0, Math.min(1, y));
    }

    // init    
    function start() {
      resize();
      initNodes();
      lastTime = performance.now();
      if (prefersReduced) {
        // draw one static frame and do not animate        
        draw(lastTime);
        return;
      }
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('resize', onWindowResize, { passive: true });
      rafId = requestAnimationFrame(loop);
    }

    function onWindowResize() {
      resize();
      initNodes();
    }

    start();

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.dark_aqua_container} ${className}`}>
      <canvas ref={canvasRef} className={styles.tech_canvas} />
      <div className={styles.content_wrapper}>{children}</div>
    </div>
  );
};

export default TechCanvasBackground;

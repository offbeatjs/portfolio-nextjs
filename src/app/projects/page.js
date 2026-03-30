'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { DottedSurface } from '../components/ui/dotted-surface';
import customProjectsData from '../data/projects.json';

export default function Projects() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filter,   setFilter]   = useState('all');

  const c = {
    bg:           isDark ? '#07101f'                  : '#f5f4f0',
    heading:      isDark ? '#eaf2ff'                  : '#0f172a',
    sub:          isDark ? 'rgba(200,220,255,0.5)'    : 'rgba(15,23,42,0.45)',
    count:        isDark ? 'rgba(200,220,255,0.35)'   : 'rgba(15,23,42,0.35)',
    divider:      isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.07)',
    rowHover:     isDark ? 'rgba(255,255,255,0.02)'   : 'rgba(0,0,0,0.025)',
    rowActive:    isDark ? 'rgba(255,255,255,0.035)'  : 'rgba(0,0,0,0.04)',
    index:        isDark ? 'rgba(200,220,255,0.18)'   : 'rgba(15,23,42,0.18)',
    title:        isDark ? '#eaf2ff'                  : '#0f172a',
    techBg:       isDark ? 'rgba(255,255,255,0.04)'   : 'rgba(0,0,0,0.04)',
    techBorder:   isDark ? 'rgba(255,255,255,0.07)'   : 'rgba(0,0,0,0.08)',
    techText:     isDark ? 'rgba(200,220,255,0.45)'   : 'rgba(15,23,42,0.45)',
    arrow:        isDark ? 'rgba(200,220,255,0.2)'    : 'rgba(15,23,42,0.2)',
    desc:         isDark ? 'rgba(200,220,255,0.55)'   : 'rgba(15,23,42,0.55)',
    link:         isDark ? 'rgba(200,220,255,0.7)'    : 'rgba(15,23,42,0.65)',
    linkBorder:   isDark ? 'rgba(200,220,255,0.2)'    : 'rgba(15,23,42,0.2)',
    stars:        isDark ? 'rgba(200,220,255,0.3)'    : 'rgba(15,23,42,0.3)',
    year:         isDark ? 'rgba(200,220,255,0.22)'   : 'rgba(15,23,42,0.22)',
    filterActive: isDark ? 'rgba(200,220,255,0.1)'    : 'rgba(15,23,42,0.08)',
    filterBorder: isDark ? 'rgba(200,220,255,0.25)'   : 'rgba(15,23,42,0.25)',
    filterText:   isDark ? 'rgba(200,220,255,0.85)'   : 'rgba(15,23,42,0.85)',
    filterIdleBorder: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.1)',
    filterIdleText:   isDark ? 'rgba(200,220,255,0.35)' : 'rgba(15,23,42,0.4)',
    // layer card colors
    layerBg:      isDark ? 'rgba(255,255,255,0.03)'   : 'rgba(255,255,255,0.7)',
    layerBorder:  isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.06)',
    skeletonBg:   isDark ? 'rgba(255,255,255,0.05)'   : 'rgba(0,0,0,0.06)',
  };

  useEffect(() => {
    (async () => {
      try {
        const [a, b] = await Promise.all([
          fetch('https://api.github.com/users/offbeatjs/repos?per_page=50&sort=updated').then(r => r.json()),
          fetch('https://api.github.com/users/programmer-offbeat/repos?per_page=50&sort=updated').then(r => r.json()),
        ]);
        const github = [...a, ...b]
          .filter(r => !r.fork && r.description)
          .slice(0, 12)
          .map(r => ({
            id:          `gh-${r.id}`,
            title:       r.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: r.description,
            tech:        r.language ? [r.language] : ['JavaScript'],
            language:    r.language,
            github:      r.html_url,
            demo:        r.homepage || null,
            stars:       r.stargazers_count,
            forks:       r.forks_count,
            year:        new Date(r.updated_at).getFullYear(),
          }));
        setProjects([...customProjectsData.customProjects, ...github]);
      } catch {
        setProjects(customProjectsData.customProjects);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const langs = [...new Set(projects.flatMap(p => p.tech))].slice(0, 7);
  const filtered = filter === 'all'
    ? projects
    : projects.filter(p =>
        p.tech.some(t => t.toLowerCase() === filter.toLowerCase()) ||
        p.language?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: c.bg, zIndex: 0 }} />
      <DottedSurface className="!z-[1]" />

      {/* Layered decorative panels */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Top-right accent layer */}
        <div style={{
          position: 'absolute', top: -120, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(91,140,255,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(91,140,255,0.09) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Bottom-left accent layer */}
        <div style={{
          position: 'absolute', bottom: -80, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 860, margin: '0 auto',
        padding: '140px 32px 120px',
        fontFamily: "'Satoshi', sans-serif",
      }}>

        {/* Header layer */}
        <div style={{
          background: c.layerBg,
          border: `1px solid ${c.layerBorder}`,
          borderRadius: 16,
          padding: '32px 36px',
          marginBottom: 32,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 0.95, color: c.heading, letterSpacing: '-0.03em' }}>
                Work
              </h1>
              <p style={{ marginTop: 10, fontSize: 13, color: c.count }}>
                {loading ? 'Loading…' : `${filtered.length} projects`}
              </p>
            </div>
            {/* Filter strip */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {['all', ...langs].map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{
                  padding: '4px 12px', borderRadius: 999, cursor: 'pointer',
                  border: filter === t ? `1px solid ${c.filterBorder}` : `1px solid ${c.filterIdleBorder}`,
                  background: filter === t ? c.filterActive : 'transparent',
                  color: filter === t ? c.filterText : c.filterIdleText,
                  fontSize: 12, fontFamily: "'Satoshi', sans-serif",
                  transition: 'all 0.15s',
                }}>
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects layer */}
        <div style={{
          background: c.layerBg,
          border: `1px solid ${c.layerBorder}`,
          borderRadius: 16,
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
        }}>
          {/* Top divider */}
          <div style={{ height: 1, background: c.divider }} />

          {/* Skeleton */}
          {loading && [1,2,3,4,5].map(i => (
            <div key={i} style={{ padding: '20px 24px', borderBottom: `1px solid ${c.divider}`, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 28, height: 12, borderRadius: 4, background: c.skeletonBg }} />
              <div style={{ width: `${100 + i * 50}px`, height: 16, borderRadius: 4, background: c.skeletonBg }} />
            </div>
          ))}

          {/* Rows */}
          {!loading && filtered.map((p, i) => {
            const open = expanded === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setExpanded(open ? null : p.id)}
                style={{
                  borderBottom: `1px solid ${c.divider}`,
                  cursor: 'pointer',
                  background: open ? c.rowActive : 'transparent',
                  transition: 'background 0.15s',
                  padding: '0 24px',
                }}
                onMouseEnter={e => { if (!open) e.currentTarget.style.background = c.rowHover; }}
                onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Main row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr auto auto',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 0',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.index, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', fontWeight: 600, color: c.title, letterSpacing: '-0.01em' }}>
                    {p.title}
                  </span>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {p.tech.slice(0, 2).map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: c.techBg, border: `1px solid ${c.techBorder}`, color: c.techText }}>{t}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 16, color: c.arrow, display: 'inline-block', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>↗</span>
                </div>

                {/* Expanded */}
                {open && (
                  <div style={{ paddingBottom: 20, display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 16px' }}>
                    <div />
                    <div>
                      <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.65, color: c.desc, maxWidth: 520 }}>
                        {p.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          style={{ fontSize: 13, fontWeight: 600, color: c.link, textDecoration: 'none', borderBottom: `1px solid ${c.linkBorder}`, paddingBottom: 1 }}>
                          GitHub ↗
                        </a>
                        {p.demo && p.demo !== '#' && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            style={{ fontSize: 13, fontWeight: 600, color: c.link, textDecoration: 'none', borderBottom: `1px solid ${c.linkBorder}`, paddingBottom: 1 }}>
                            Live ↗
                          </a>
                        )}
                        {p.stars > 0 && <span style={{ fontSize: 12, color: c.stars }}>★ {p.stars}</span>}
                        {p.year && <span style={{ fontSize: 12, color: c.year }}>{p.year}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!loading && filtered.length === 0 && (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: c.sub, fontSize: 14 }}>
              No projects for that filter.{' '}
              <button onClick={() => setFilter('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.link, textDecoration: 'underline', fontSize: 14, fontFamily: "'Satoshi', sans-serif" }}>
                Show all
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

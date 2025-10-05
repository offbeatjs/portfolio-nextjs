'use client';

import React from 'react';
import navs from "../styles/Navbar.module.css";
// HireMe modal is now mounted globally via HireMePortal. We dispatch an event to open it.
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  function openHireMe() {
    try {
      const evt = new CustomEvent('open-hire-me');
      window.dispatchEvent(evt);
    } catch {}
  }

  function navigateWithTransition(href) {
    try {
      if (href === pathname) return;

      const root = document.getElementById('__next') || document.body;
      root.classList.add('site-blur');

      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '2000';
      overlay.style.pointerEvents = 'none';
      document.body.appendChild(overlay);

      // start enter animation
      requestAnimationFrame(() => overlay.classList.add('pt-enter'));

      let fallbackTimer = null;
      let removed = false;

      const cleanup = () => {
        if (removed) return;
        removed = true;
        try {
          overlay.classList.remove('pt-enter');
          overlay.classList.add('pt-exit');
        } catch (e) {}
        // remove DOM and blur after exit animation
        setTimeout(() => {
          try { overlay.remove(); } catch (e) {}
          try { root.classList.remove('site-blur'); } catch (e) {}
        }, 420);
        if (fallbackTimer) clearTimeout(fallbackTimer);
      };

      // Ensure we always cleanup even if router.push behaves unexpectedly
      fallbackTimer = setTimeout(() => {
        cleanup();
      }, 1400);

      // Attempt navigation and cleanup when done or on error
      Promise.resolve(router.push(href)).then(() => {
        // small delay to allow new content to paint
        setTimeout(cleanup, 260);
      }).catch(() => {
        cleanup();
      });
    } catch (err) {
      try { router.push(href); } catch (e) {}
    }
  }

  return (
    <>
    <div className={navs.navbar}>
  <Link href="/" className="cursor-target" onClick={(e) => { e.preventDefault(); navigateWithTransition('/'); }}>{'TheYash'}</Link>
    <ul className={navs.nav__list}>
  <li><Link href="/#about" className="cursor-target" onClick={(e) => { e.preventDefault(); navigateWithTransition('/#about'); }}>About</Link></li>
  <li><Link href="/projects" className="cursor-target" onClick={(e) => { e.preventDefault(); navigateWithTransition('/projects'); }}>Projects</Link></li>
  <li><Link href="/contact" className="cursor-target" onClick={(e) => { e.preventDefault(); navigateWithTransition('/contact'); }}>Contact</Link></li>
        </ul>
        <button id={navs.hire_button} className="cursor-target" onClick={openHireMe}>Hire me</button>
        </div>
        {/* HireMe modal is rendered globally by HireMePortal */}
    </>
  )
}

export default Navbar;
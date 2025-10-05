'use client';

import { Home, User, Briefcase, Mail } from 'lucide-react';
import { TubelightNavbar } from './ui/tubelight-navbar';
import TargetCursor from './ui/target-cursor';

export function GlobalNav() {
  const navItems = [
    // { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/#about', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  return (
    <>
      <TargetCursor />
      <TubelightNavbar items={navItems} />
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/TargetCursor.module.css';

export default function TargetCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const requestRef = useRef();
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      
      // Check if hovering over clickable element
      const target = e.target;
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsPointer(!!isClickable);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth animation loop
    const animate = () => {
      const dx = targetPosition.current.x - currentPosition.current.x;
      const dy = targetPosition.current.y - currentPosition.current.y;
      
      // Smooth easing
      currentPosition.current.x += dx * 0.15;
      currentPosition.current.y += dy * 0.15;
      
      setPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`${styles.cursor} ${isPointer ? styles.cursorPointer : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Outer ring/glow */}
      <div
        className={`${styles.cursorRing} ${isPointer ? styles.cursorRingPointer : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}

  "use client";

import React, { useEffect } from 'react';
import styles from '../styles/Toast.module.css';

export default function Toast({ id, message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(id), duration);
    return () => clearTimeout(t);
  }, [id, duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

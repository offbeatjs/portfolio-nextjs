import React from 'react';
import styles from "../styles/HireMe.module.css";

const HireMe = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true">

        {/* macOS Title Bar */}
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <button className={`${styles.dot} ${styles.red}`}    onClick={onClose} aria-label="Close" />
            <span   className={`${styles.dot} ${styles.yellow}`} />
            <span   className={`${styles.dot} ${styles.green}`}  />
          </div>
          <span className={styles.windowTitle}>hire_me.terminal</span>
          <div style={{ width: 52 }} />
        </div>

        {/* Terminal Content */}
        <div className={styles.modalContent}>
          <div className={styles.terminalHeader}>
            <span className={styles.prompt}>❯</span>
            <span className={styles.codeKeyword}>function </span>
            <span className={styles.codeHighlight}>hireMe</span>
            <span className={styles.codePunct}>()</span>
            <span className={styles.codePunct}> {'{'}</span>
            <span className={styles.terminalCursor} />
          </div>
          {children}
        </div>

      </div>
    </div>
  );
};

export default HireMe;

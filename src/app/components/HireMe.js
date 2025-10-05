import React from 'react';
import styles from "../styles/HireMe.module.css";

const HireMe = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* macOS Window Title */}
        <div className={styles.windowTitle}>hire_me.terminal</div>
        
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}></button>
        
        {/* Terminal Content */}
        <div className={styles.modalContent}>
          <div className={styles.terminalHeader}>
            <span className={styles.codeKeyword}>function</span>{' '}
            <span className={styles.codeHighlight}>hireMe</span>() {'{'}
            <span className={styles.terminalCursor}></span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default HireMe;
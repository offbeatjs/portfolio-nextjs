"use client";

import React, { useEffect, useState, useRef } from "react";
import HireMe from "./HireMe";
import styles from "../styles/HireMe.module.css";

export default function HireMePortal() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast,        setToast]        = useState(null); // { msg, ok }
  const formRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-hire-me", handler);
    return () => window.removeEventListener("open-hire-me", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen]);

  function showToast(msg, ok) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 5000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    const data = {
      name:    fd.get("name"),
      email:   fd.get("email"),
      project: fd.get("project"),
      budget:  fd.get("budget"),
    };
    try {
      const res    = await fetch("/api/hire-me", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.ok) {
        setIsOpen(false);
        formRef.current?.reset();
        showToast("Request sent — I'll reply within 24h.", true);
      } else {
        showToast(result.message || "Something went wrong. Try emailing me directly.", false);
      }
    } catch {
      showToast("Network error. Email me at the.yashh@icloud.com", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HireMe isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form ref={formRef} onSubmit={handleSubmit}>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input type="text" name="name" placeholder="John Doe" required disabled={isSubmitting} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email / Discord / Telegram</label>
            <input type="text" name="email" placeholder="your@email.com or @handle" required disabled={isSubmitting} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Project Brief</label>
            <textarea name="project" rows={4} placeholder="What are you building? Goals, timeline…" required disabled={isSubmitting} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Budget <span style={{ color: '#4a4a4a', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <input type="text" name="budget" placeholder="e.g. $200 – $2000" disabled={isSubmitting} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "execute request"}
          </button>

          <div className={styles.terminalFooter}>
            {`// I'll get back to you within 12–24 hours`}
          </div>

        </form>
      </HireMe>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px",
          background: "rgba(28,28,30,0.96)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${toast.ok ? "rgba(40,201,65,0.25)" : "rgba(255,95,87,0.25)"}`,
          borderRadius: 9,
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
          color: toast.ok ? "#28c941" : "#ff5f57",
          fontSize: 13,
          fontFamily: "'SF Mono','Menlo',monospace",
          maxWidth: 340,
          animation: "hmIn 0.22s ease-out",
        }}>
          <span style={{ fontSize: 15 }}>{toast.ok ? "✓" : "✕"}</span>
          <span style={{ color: toast.ok ? "#a7f3d0" : "#ffaaaa" }}>{toast.msg}</span>
          {!toast.ok && (
            <a href="mailto:the.yashh@icloud.com"
              style={{ color: "#007acc", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 4 }}>
              Email me
            </a>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes hmIn {
          from { transform: translateX(30px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

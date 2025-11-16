"use client";

import React, { useEffect, useState, useRef } from "react";
import HireMe from "./HireMe";

export default function HireMePortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const formRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-hire-me", handler);
    return () => window.removeEventListener("open-hire-me", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      project: formData.get("project"),
      budget: formData.get("budget"),
    };

    try {
      const response = await fetch("/api/hire-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        setIsOpen(false);
        setShowSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessage(result.message || "Failed to send request. Please try emailing me instead.");
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      setErrorMessage("Network error. Please email me directly at the.yashh@icloud.com");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HireMe isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="formLabel">Your Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="John Doe" 
              required 
              disabled={isSubmitting}
            />
          </div>

          <div className="formGroup">
            <label className="formLabel">Email Address / Discord / Telegram</label>
            <input 
              type="text" 
              name="email"
              placeholder="your.email@domain.com or @the.yash" 
              required 
              disabled={isSubmitting}
            />
          </div>

          <div className="formGroup">
            <label className="formLabel">Project Brief</label>
            <textarea
              name="project"
              placeholder="Describe your project requirements, goals, and timeline..."
              required
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="formGroup">
            <label className="formLabel">Budget Range (Optional)</label>
            <input 
              type="text" 
              name="budget"
              placeholder="e.g., $50 - $5000" 
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit Request"}
          </button>
        </form>

        <div
          style={{ marginTop: "16px", fontSize: "12px", color: "#6a9955", fontFamily: "monospace" }}
        >
          <span className="codeComment">{`// I'll get back to you within 12-24 hours`}</span>
        </div>
      </HireMe>

      {/* Success Notification - macOS style */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
            background: "rgba(30, 35, 50, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "16px 20px",
            minWidth: "320px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #5b8cff, #8b5cf0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#eaf2ff", marginBottom: "4px" }}>
                Request Sent Successfully!
              </div>
              <div style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)", lineHeight: 1.4 }}>
                I&apos;ll get back to you within 12-24 hours.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification with Email Button */}
      {showError && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
            background: "rgba(30, 35, 50, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,100,100,0.3)",
            borderRadius: "12px",
            padding: "16px 20px",
            minWidth: "320px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff5b5b, #ff8b8b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              ✕
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#eaf2ff", marginBottom: "4px" }}>
                Request Failed
              </div>
              <div style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)", lineHeight: 1.4, marginBottom: "12px" }}>
                {errorMessage}
              </div>
              <a
                href="mailto:the.yashh@icloud.com"
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  background: "linear-gradient(90deg,#5b8cff,#8b5cf0)",
                  color: "#ffffff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                📧 Email Me Instead
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

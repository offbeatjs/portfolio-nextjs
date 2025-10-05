"use client";

import React, { useEffect, useState } from "react";
import HireMe from "./HireMe";

export default function HireMePortal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-hire-me", handler);
    return () => window.removeEventListener("open-hire-me", handler);
  }, []);

  return (
    <HireMe isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {/* Use the same form fields as Navbar to keep behavior consistent */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        <div className="formGroup">
          <label className="formLabel">Client Name</label>
          <input type="text" placeholder="Enter your full name..." required />
        </div>

        <div className="formGroup">
          <label className="formLabel">Email Address</label>
          <input type="email" placeholder="your.email@domain.com" required />
        </div>

        <div className="formGroup">
          <label className="formLabel">Project Brief</label>
          <textarea
            placeholder="Describe your project requirements, goals, and timeline..."
            required
            rows={4}
          />
        </div>

        <div className="formGroup">
          <label className="formLabel">Budget Range</label>
          <input type="text" placeholder="e.g., $5,000 - $10,000" />
        </div>

        <button type="submit">Submit Request</button>
      </form>

      <div
        style={{ marginTop: "16px", fontSize: "12px", color: "#6a9955", fontFamily: "monospace" }}
      >
        <span className="codeComment">// I'll get back to you within 24 hours</span>
      </div>
    </HireMe>
  );
}

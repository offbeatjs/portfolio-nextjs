"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function HireMeLauncher({ className }) {
  const openHireMe = () => {
    try {
      const evt = new CustomEvent("open-hire-me");
      window.dispatchEvent(evt);
    } catch {}
  };

  return (
    <button
      aria-haspopup="dialog"
      onClick={openHireMe}
      className={cn(
        "group fixed top-6 right-6 z-[1200] rounded-2xl border backdrop-blur-xl cursor-target",
        "transition-all duration-300",
        className
      )}
      style={{
        borderColor: "rgba(255,255,255,0.18)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        boxShadow:
          "0 10px 35px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        color: "var(--foreground)",
        padding: "10px 14px",
      }}
    >
      <span
        className="relative z-10 font-semibold"
        style={{
          textShadow:
            "0 0 10px rgba(255,255,255,0.35), 0 0 20px rgba(255,255,255,0.2)",
        }}
      >
        Hire me
      </span>
      {/* glowing liquid border */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "0 0 0 2px rgba(255,255,255,0.35), 0 0 30px rgba(255,255,255,0.35)",
          pointerEvents: "none",
        }}
      />
      {/* hover ring */}
      <span
        aria-hidden
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(120px 40px at 90% 0, rgba(255,255,255,0.25), transparent 60%)",
          filter: "blur(6px)",
        }}
      />
    </button>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 30, height: 30 }} />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="cursor-target"
      style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 14, color: "rgba(200,220,255,0.5)",
        transition: "color 0.15s, background 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = "rgba(200,220,255,0.9)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,220,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
    >
      {isDark ? "☀︎" : "☽"}
    </button>
  );
}

export function TubelightNavbar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const path = window.location.pathname;
    const match = items.find(i => i.url === path || i.url.startsWith(path + "#"));
    if (match) setActiveTab(match.name);
  }, [items]);

  return (
    <div className={cn("fixed top-5 left-1/2 -translate-x-1/2 z-[9998]", className)}>
      <div
        className="flex items-center backdrop-blur-xl rounded-2xl border"
        style={{
          background: "rgba(8, 12, 26, 0.75)",
          borderColor: "rgba(255,255,255,0.08)",
          padding: "6px 8px",
          gap: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className="cursor-target"
              style={{
                position: "relative",
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 14px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#fff" : "rgba(200,220,255,0.45)",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "rgba(200,220,255,0.8)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(200,220,255,0.45)"; }}
            >
              <Icon size={15} strokeWidth={2} />
              <span className="hidden sm:inline">{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 -z-10 rounded-[10px]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset",
                  }}
                >
                  {/* single tubelight beam above */}
                  <div style={{
                    position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                    width: "60%", height: 2, borderRadius: 1,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 0 12px 3px rgba(200,220,255,0.7), 0 0 30px 8px rgba(160,190,255,0.3)",
                  }} />
                </motion.div>
              )}
            </Link>
          );
        })}

        <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)", margin: "0 4px", flexShrink: 0 }} />
        <ThemeToggle />
      </div>
    </div>
  );
}

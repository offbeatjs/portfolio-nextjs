"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function TubelightNavbar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-8 left-1/2 -translate-x-1/2 z-[9998]",
        className,
      )}
    >
      <div 
        className="flex items-center gap-4 backdrop-blur-xl rounded-full shadow-2xl border"
        style={{
          background: 'rgba(10, 15, 30, 0.7)',
          borderColor: 'rgba(110, 166, 255, 0.15)',
          padding: '12px 20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(110, 166, 255, 0.1)',
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
              className={cn(
                "relative cursor-pointer cursor-target font-bold rounded-full transition-all duration-300",
                "flex items-center gap-3",
                isActive 
                  ? "text-white px-10 py-4 text-lg" 
                  : "text-gray-400 hover:text-gray-200 px-8 py-3.5 text-base hover:bg-white/5",
              )}
              style={{
                textShadow: isActive ? '0 0 20px rgba(110, 166, 255, 0.5)' : 'none',
              }}
            >
              <Icon size={isActive ? 22 : 20} strokeWidth={2.5} className={isActive ? "text-blue-300" : ""} />
              <span className={isActive ? "block" : "hidden md:block"}>{item.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
                    boxShadow: '0 0 50px rgba(255, 255, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Tubelight glow effect on top */}
                  <div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-t-full"
                    style={{
                      width: '80%',
                      height: '10px',
                      background: 'linear-gradient(to bottom, #ffffff, transparent)',
                      boxShadow: '0 -15px 60px rgba(255, 255, 255, 0.8), 0 -8px 35px rgba(255, 255, 255, 1)',
                    }}
                  >
                    <div 
                      className="absolute w-full h-20 -top-10 left-0 rounded-full blur-2xl"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.7) 0%, transparent 70%)',
                      }}
                    />
                    <div 
                      className="absolute w-full h-16 -top-8 left-1/2 -translate-x-1/2 rounded-full blur-xl"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
                      }}
                    />
                    <div 
                      className="absolute w-3/4 h-12 -top-6 left-1/2 -translate-x-1/2 rounded-full blur-lg"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

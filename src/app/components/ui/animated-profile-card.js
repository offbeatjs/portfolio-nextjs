"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { cn } from "@/lib/utils";
import { forwardRef, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const IdentityCardBody = forwardRef(
  (
    {
      fullName,
      place,
      about,
      avatarUrl,
      avatarText,
      scheme = "plain",
      socials = [],
      displayAvatar = true,
      titleCss,
      cardCss,
      descClass,
      bioClass,
      footerClass,
      className,
      ...rest
    },
    ref
  ) => {
    const isAccent = scheme === "accented";

    return (
      <Card
        ref={ref}
        className={cn(
          "flex flex-col rounded-3xl border-0 shadow-2xl backdrop-blur-sm",
          isAccent
            ? "text-[var(--on-accent-foreground)]"
            : "bg-card/95 text-card-foreground",
          className
        )}
        style={{ padding: "48px 40px", ...(cardCss || {}) }}
        {...rest}
      >
        <CardHeader className="p-0">
          <div
            style={{
              height: "var(--avatar-h)",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {displayAvatar && (
              <Avatar
                className="ring-2 ring-offset-4 ring-offset-card shadow-lg"
                style={
                  {
                    "--tw-ring-color": "var(--accent-color)",
                    height: "var(--avatar-h)",
                    width: "var(--avatar-h)",
                  }
                }
              >
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{avatarText}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <CardDescription
            className={cn(
              "text-left text-xs font-semibold tracking-widest uppercase",
              !isAccent && "text-muted-foreground",
              descClass
            )}
            style={{
              letterSpacing: "0.15em",
              marginTop: "var(--desc-mt)",
              ...(isAccent ? { color: "var(--on-accent-muted-foreground)" } : {}),
            }}
          >
            {place}
          </CardDescription>
          <CardTitle
            className="text-4xl text-left font-semibold tracking-tight"
            style={{
              ...(isAccent ? { color: "var(--on-accent-foreground)" } : {}),
              ...titleCss,
              marginTop: "var(--title-mt)",
              marginBottom: "var(--title-mb)",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            {fullName}
          </CardTitle>

          {/* Status banner between name and description */}
          <div style={{ marginTop: 8, marginBottom: 16 }}>
            <img
              src="https://discord.c99.nl/widget/theme-3/848724317416325160.png"
              alt="Discord status banner"
              style={{
                display: "block",
                width: "100 %",
                height: "auto",
                borderRadius: 12,
                border: "1px solid var(--border)",
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="flex-grow p-0" style={{ marginTop: "var(--content-mt)" }}>
          <p
            className={cn(
              "text-[15px] leading-relaxed text-left",
              !isAccent && "text-foreground/90",
              bioClass
            )}
            style={isAccent ? { opacity: 0.95, lineHeight: "1.8", fontWeight: 400 } : { lineHeight: "1.8", fontWeight: 400 }}
          >
            {about}
          </p>
        </CardContent>

        {socials.length > 0 && (
          <CardFooter className={cn("p-0", footerClass)} style={{ marginTop: "var(--footer-mt)" }}>
            <div
              className={cn(
                "flex items-center gap-4",
                !isAccent && "text-muted-foreground"
              )}
              style={
                isAccent
                  ? { color: "var(--on-accent-muted-foreground)" }
                  : undefined
              }
            >
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-all duration-300 hover:scale-110",
                    isAccent ? "hover:opacity-75" : "hover:text-foreground"
                  )}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
IdentityCardBody.displayName = "IdentityCardBody";

// ------------------ Animated Container ------------------

export const RevealCardContainer = forwardRef(
  (
    {
      base,
      overlay,
      accent = "var(--primary)",
      textOnAccent = "#fff",
      mutedOnAccent = "rgba(255,255,255,0.8)",
      className,
      ...rest
    },
    ref
  ) => {
    const holderRef = useRef(null);
    const overlayRef = useRef(null);
  const { resolvedTheme } = useTheme();

    const assignRef = useCallback(
      (el) => {
        holderRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );

  const startClip = "circle(var(--reveal-radius) at var(--reveal-x) var(--reveal-y))";

    useGSAP(() => {
      gsap.set(overlayRef.current, { clipPath: startClip });
    }, { scope: holderRef });

    // Hover reveal disabled per request

    return (
      <div
        ref={assignRef}
  // hover handlers removed
        style={{
          "--accent-color": accent,
          "--on-accent-foreground": textOnAccent,
          "--on-accent-muted-foreground": mutedOnAccent,
          // layout tokens shared by base and overlay
          "--avatar-h": "80px",
          "--desc-mt": "32px",
          "--title-mt": "16px",
          "--title-mb": "32px",
          "--content-mt": "32px",
          "--footer-mt": "40px",
          // reveal tokens
          "--reveal-radius": "50px",
          "--reveal-x": "64px",
          "--reveal-y": "64px",
          border: "2px solid var(--accent-color)",
          padding: "12px",
        }}
        className={cn(
          "relative w-[360px] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500",
          className
        )}
        {...rest}
      >
        <div>{base}</div>
        <div
          ref={overlayRef}
          className={cn("absolute inset-0 h-full w-full")}
        >
          {overlay}
        </div>
      </div>
    );
  }
);
RevealCardContainer.displayName = "RevealCardContainer";

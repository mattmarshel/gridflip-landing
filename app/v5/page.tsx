"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Grid3X3, Globe, Shield, Trophy } from "lucide-react";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#FAFAF9",
  text: "#1A1A2E",
  muted: "#6B7280",
  tileLight: "#FFFFFF",
  tileDark: "#1A1A2E",
  gridBg: "#F0F0F0",

  heroAccent: "#4A6CF7",
  howAccent: "#2E86C1",
  forestAccent: "#2D6A4F",
  ctaAccent: "#AB47BC",
};

/* ------------------------------------------------------------------ */
/*  Spring / animation constants                                       */
/* ------------------------------------------------------------------ */

const SPRING = { type: "spring" as const, stiffness: 250, damping: 22 };
const STAGGER = 0.1;

/* ------------------------------------------------------------------ */
/*  Responsive hook                                                    */
/* ------------------------------------------------------------------ */

function useMediaMin(breakpoint: number) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return matches;
}

/* ------------------------------------------------------------------ */
/*  ScrollReveal                                                       */
/* ------------------------------------------------------------------ */

function ScrollReveal({
  children,
  className,
  delay = 0,
  scaleIn = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scaleIn?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 30,
        scale: scaleIn ? 0.9 : 1,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: scaleIn ? 0.9 : 1 }
      }
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Grid: 3x3 Explainer                                           */
/* ------------------------------------------------------------------ */

function ExplainerGrid({ grid, accentColor }: { grid: number[][]; accentColor: string }) {
  return (
    <div className="inline-grid grid-cols-3 gap-1.5">
      {grid.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-lg"
          style={{
            width: 36,
            height: 36,
            backgroundColor: on ? accentColor : C.tileLight,
            border: on ? "none" : `1px solid ${C.gridBg}`,
            boxShadow: on ? `0 0 12px ${accentColor}33` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Grid: 4x4 World                                               */
/* ------------------------------------------------------------------ */

function WorldGrid({ pattern, color }: { pattern: number[][]; color: string }) {
  return (
    <div className="inline-grid grid-cols-4 gap-1.5">
      {pattern.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            width: 26,
            height: 26,
            backgroundColor: on ? color : C.gridBg,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature icon map                                                   */
/* ------------------------------------------------------------------ */

const featureIcons = [Grid3X3, Globe, Shield, Trophy];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DynamicCanvas() {
  const isDesktop = useMediaMin(640);
  const tileSize = isDesktop ? 56 : 42;

  return (
    <div style={{ backgroundColor: C.bg, color: C.text }}>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        className="relative flex min-h-dvh flex-col items-center justify-center px-4"
        style={{ borderTop: `3px solid ${C.heroAccent}` }}
      >
        <div className="flex flex-col items-center gap-10">
          {/* Oversized heading */}
          <motion.h1
            className="text-center font-black uppercase tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              color: C.text,
              fontSize: isDesktop ? "6rem" : "3.5rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
          >
            GRID{" "}
            <span style={{ color: C.heroAccent }}>FLIP</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl text-center"
            style={{
              fontFamily: "var(--font-nunito-sans)",
              color: C.muted,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.15 }}
          >
            Flip tiles. Solve the grid. Master the worlds.
          </motion.p>

          {/* Interactive Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING, delay: 0.25 }}
          >
            <InteractiveGrid
              tileSize={tileSize}
              gap={isDesktop ? 8 : 6}
              showHint
              lightColor={C.tileLight}
              darkColor={C.tileDark}
              gridBgColor={C.gridBg}
            />
          </motion.div>

          {/* App Store badge */}
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...SPRING, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              width={160}
              height={53}
              priority
            />
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-0.5 h-10 rounded-full"
            style={{ backgroundColor: C.heroAccent }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section
        className="px-4 py-24 sm:py-32"
        style={{ borderTop: `3px solid ${C.howAccent}` }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Section label */}
          <ScrollReveal>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{
                fontFamily: "var(--font-nunito-sans)",
                color: C.howAccent,
                letterSpacing: "0.15em",
              }}
            >
              How It Works
            </p>
          </ScrollReveal>

          {/* Section heading */}
          <ScrollReveal delay={STAGGER} scaleIn>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-16"
              style={{
                fontFamily: "var(--font-syne)",
                color: C.text,
                lineHeight: 1.05,
              }}
            >
              One Tap,{" "}
              <span style={{ color: C.howAccent }}>Five Tiles</span>
            </h2>
          </ScrollReveal>

          {/* Step cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid }, i) => (
              <ScrollReveal key={title} delay={i * STAGGER + 0.2}>
                <div
                  className="relative flex flex-col items-center gap-6 rounded-2xl p-8 transition-all duration-300"
                  style={{
                    backgroundColor: C.tileLight,
                    borderLeft: `4px solid ${C.howAccent}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 8px 24px ${C.howAccent}22`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                  }}
                >
                  {/* Step number */}
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-syne)",
                      backgroundColor: C.howAccent,
                      color: "#FFFFFF",
                    }}
                  >
                    {step}
                  </span>

                  <ExplainerGrid grid={grid} accentColor={C.howAccent} />

                  <div className="text-center">
                    <p
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: C.text,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{
                        fontFamily: "var(--font-nunito-sans)",
                        color: C.muted,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WORLDS                                                      */}
      {/* ============================================================ */}
      <section
        className="px-4 py-24 sm:py-32"
        style={{
          borderTop: `3px solid ${worlds[0].color}`,
          background: `linear-gradient(180deg, ${C.bg} 0%, #F5F5F4 100%)`,
        }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Section label */}
          <ScrollReveal>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{
                fontFamily: "var(--font-nunito-sans)",
                color: C.muted,
                letterSpacing: "0.15em",
              }}
            >
              The Journey
            </p>
          </ScrollReveal>

          {/* Section heading */}
          <ScrollReveal delay={STAGGER} scaleIn>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-16"
              style={{
                fontFamily: "var(--font-syne)",
                color: C.text,
                lineHeight: 1.05,
              }}
            >
              8 Worlds to{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${worlds[0].color}, ${worlds[3].color}, ${worlds[6].color})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Master
              </span>
            </h2>
          </ScrollReveal>

          {/* Desktop: 2-column grid (taller cards) */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * STAGGER}>
                <div
                  className="flex items-center gap-6 rounded-2xl p-8 transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: C.tileLight,
                    borderLeft: `4px solid ${w.color}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 8px 24px ${w.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                  }}
                >
                  <div className="shrink-0">
                    <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  </div>
                  <div>
                    <p
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{
                        fontFamily: "var(--font-nunito-sans)",
                        color: C.muted,
                      }}
                    >
                      {w.subtitle}
                    </p>
                    {/* Color dot indicator */}
                    <div
                      className="mt-3 h-1 w-10 rounded-full"
                      style={{ backgroundColor: w.color }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="flex flex-col gap-4 sm:hidden">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * 0.06}>
                <div
                  className="flex items-center gap-5 rounded-2xl p-6"
                  style={{
                    backgroundColor: C.tileLight,
                    borderLeft: `4px solid ${w.color}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="shrink-0">
                    <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  </div>
                  <div>
                    <p
                      className="text-base font-bold"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-sm"
                      style={{
                        fontFamily: "var(--font-nunito-sans)",
                        color: C.muted,
                      }}
                    >
                      {w.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES                                                    */}
      {/* ============================================================ */}
      <section
        className="px-4 py-24 sm:py-32"
        style={{ borderTop: `3px solid ${C.forestAccent}` }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Section label */}
          <ScrollReveal>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{
                fontFamily: "var(--font-nunito-sans)",
                color: C.forestAccent,
                letterSpacing: "0.15em",
              }}
            >
              Crafted Details
            </p>
          </ScrollReveal>

          {/* Section heading */}
          <ScrollReveal delay={STAGGER} scaleIn>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-16"
              style={{
                fontFamily: "var(--font-syne)",
                color: C.text,
                lineHeight: 1.05,
              }}
            >
              Built for{" "}
              <span style={{ color: C.forestAccent }}>Focus</span>
            </h2>
          </ScrollReveal>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ label }, i) => {
              const Icon = featureIcons[i];
              return (
                <ScrollReveal key={label} delay={i * STAGGER + 0.1}>
                  <div
                    className="flex items-center gap-6 rounded-2xl p-7 transition-all duration-300"
                    style={{
                      backgroundColor: C.tileLight,
                      borderLeft: `4px solid ${C.forestAccent}`,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = `0 8px 24px ${C.forestAccent}22`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                    }}
                  >
                    {/* Large colored circle behind icon */}
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full"
                      style={{
                        width: 64,
                        height: 64,
                        backgroundColor: `${C.forestAccent}14`,
                      }}
                    >
                      <Icon
                        size={28}
                        strokeWidth={1.8}
                        style={{ color: C.forestAccent }}
                      />
                    </div>
                    <p
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: C.text,
                      }}
                    >
                      {label}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA + FOOTER                                                */}
      {/* ============================================================ */}
      <section
        className="px-4 pb-16 pt-24 sm:pt-32"
        style={{ borderTop: `3px solid ${C.ctaAccent}` }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          {/* Section label */}
          <ScrollReveal>
            <p
              className="text-sm font-semibold uppercase tracking-widest text-center"
              style={{
                fontFamily: "var(--font-nunito-sans)",
                color: C.ctaAccent,
                letterSpacing: "0.15em",
              }}
            >
              Begin
            </p>
          </ScrollReveal>

          {/* Oversized CTA heading */}
          <ScrollReveal delay={STAGGER} scaleIn>
            <h2
              className="text-center text-5xl sm:text-6xl lg:text-7xl font-black"
              style={{
                fontFamily: "var(--font-syne)",
                color: C.text,
                lineHeight: 1.05,
              }}
            >
              Ready to{" "}
              <span style={{ color: C.ctaAccent }}>play?</span>
            </h2>
          </ScrollReveal>

          {/* App Store badge */}
          <ScrollReveal delay={STAGGER * 2}>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={200}
                height={67}
              />
            </motion.a>
          </ScrollReveal>

          {/* World color strip */}
          <ScrollReveal delay={STAGGER * 3} className="flex items-center gap-1.5">
            {worlds.map((w, i) => (
              <motion.div
                key={w.color}
                className="rounded-full"
                style={{
                  width: 28,
                  height: 6,
                  backgroundColor: w.color,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.8, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  ...SPRING,
                  delay: 0.4 + i * 0.06,
                }}
              />
            ))}
          </ScrollReveal>
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-20 max-w-5xl">
          <div
            className="h-px w-full mb-8"
            style={{ backgroundColor: `${C.ctaAccent}30` }}
          />
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-6 text-sm"
              style={{ fontFamily: "var(--font-nunito-sans)" }}
            >
              <Link
                href="/privacy"
                className="underline-offset-4 transition-colors duration-300 hover:underline"
                style={{ color: C.muted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.muted;
                }}
              >
                Privacy Policy
              </Link>
              <span style={{ color: `${C.ctaAccent}40` }}>|</span>
              <Link
                href="/terms"
                className="underline-offset-4 transition-colors duration-300 hover:underline"
                style={{ color: C.muted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.muted;
                }}
              >
                Terms of Use
              </Link>
            </div>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-nunito-sans)",
                color: `${C.muted}99`,
              }}
            >
              &copy; {new Date().getFullYear()} GridFlip. All rights reserved.
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
}

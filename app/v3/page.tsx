"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

/* ─── Constants ──────────────────────────────────────────── */

const COLORS = {
  bg: "#FAFBFC",
  text: "#171923",
  secondary: "#64748B",
  accent: "#0EA5E9",
  white: "#FFFFFF",
  border: "#E2E8F0",
  gridBg: "#F1F5F9",
} as const;

const EASE_SMOOTH = [0.25, 0.1, 0.25, 1.0] as const;
const DURATION = 0.4;

/* ─── Scroll Reveal ──────────────────────────────────────── */

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: DURATION, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Mini Grid Components ───────────────────────────────── */

function ExplainerGrid({
  grid,
  color,
}: {
  grid: number[][];
  color: string;
}) {
  return (
    <div className="inline-grid grid-cols-3 gap-1">
      {grid.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-md"
          style={{
            width: 28,
            height: 28,
            backgroundColor: on ? color : COLORS.white,
            border: on ? "none" : `1px solid ${COLORS.border}`,
          }}
        />
      ))}
    </div>
  );
}

function WorldGrid({
  pattern,
  color,
}: {
  pattern: number[][];
  color: string;
}) {
  return (
    <div className="inline-grid grid-cols-4 gap-1">
      {pattern.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            width: 20,
            height: 20,
            backgroundColor: on ? color : COLORS.white,
            border: on ? "none" : `1px solid ${COLORS.border}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Responsive Hook ────────────────────────────────────── */

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

/* ─── Page ───────────────────────────────────────────────── */

export default function GeometricPrecision() {
  const isDesktop = useMediaMin(768);
  const tileSize = isDesktop ? 56 : 44;

  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="min-h-dvh flex items-center justify-center px-6"
        style={{ backgroundColor: COLORS.bg }}
      >
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
            {/* Grid - Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION, ease: EASE_SMOOTH }}
              className="shrink-0"
            >
              <InteractiveGrid
                tileSize={tileSize}
                gap={6}
                showHint
                lightColor={COLORS.white}
                darkColor={COLORS.accent}
                gridBgColor={COLORS.gridBg}
              />
            </motion.div>

            {/* Text - Right */}
            <motion.div
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, delay: 0.15, ease: EASE_SMOOTH }}
            >
              <h1
                className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
                style={{
                  fontFamily: "var(--font-plus-jakarta-sans)",
                  color: COLORS.text,
                  lineHeight: 1.05,
                }}
              >
                Grid Flip
              </h1>
              <p
                className="mt-4 text-lg sm:text-xl max-w-md"
                style={{
                  fontFamily: "var(--font-manrope)",
                  color: COLORS.secondary,
                  lineHeight: 1.6,
                }}
              >
                Flip tiles. Solve the grid. A minimalist puzzle game
                built for focus and precision.
              </p>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: DURATION, ease: EASE_SMOOTH }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src="/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={53}
                  priority
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}` }} />
      </div>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: COLORS.bg }}>
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                fontFamily: "var(--font-plus-jakarta-sans)",
                color: COLORS.text,
              }}
            >
              One Tap, Five Tiles
            </h2>
            <p
              className="mt-3 text-base max-w-lg"
              style={{
                fontFamily: "var(--font-manrope)",
                color: COLORS.secondary,
              }}
            >
              Each tap flips a tile and its orthogonal neighbors. Simple to learn, deeply satisfying to master.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-0 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid, color }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div
                  className="flex flex-col items-center gap-5 p-8 sm:p-10"
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    marginLeft: i > 0 && isDesktop ? -1 : 0,
                    marginTop: i > 0 && !isDesktop ? -1 : 0,
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: COLORS.accent,
                      color: COLORS.white,
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    {step}
                  </span>
                  <ExplainerGrid grid={grid} color={COLORS.accent} />
                  <div className="text-center">
                    <p
                      className="text-base font-semibold"
                      style={{
                        fontFamily: "var(--font-plus-jakarta-sans)",
                        color: COLORS.text,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        color: COLORS.secondary,
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

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}` }} />
      </div>

      {/* ── Worlds ────────────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: COLORS.bg }}>
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                fontFamily: "var(--font-plus-jakarta-sans)",
                color: COLORS.text,
              }}
            >
              8 Worlds to Master
            </h2>
            <p
              className="mt-3 text-base max-w-lg"
              style={{
                fontFamily: "var(--font-manrope)",
                color: COLORS.secondary,
              }}
            >
              From peaceful plains to the summit. Each world introduces new patterns and challenges.
            </p>
          </ScrollReveal>

          {/* Desktop: 4x2 grid */}
          <div className="mt-16 hidden gap-4 sm:grid sm:grid-cols-4">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * 0.05}>
                <motion.div
                  className="flex flex-col items-center gap-4 p-6 transition-colors duration-300"
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    cursor: "default",
                  }}
                  whileHover={{
                    borderColor: COLORS.accent,
                    transition: { duration: 0.2 },
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-plus-jakarta-sans)",
                        color: COLORS.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        color: COLORS.secondary,
                      }}
                    >
                      {w.subtitle}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4 sm:hidden">
            {worlds.map((w, i) => (
              <ScrollReveal
                key={w.name}
                delay={i * 0.05}
                className="shrink-0 snap-center"
              >
                <div
                  className="flex w-48 flex-col items-center gap-4 p-5"
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-plus-jakarta-sans)",
                        color: COLORS.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        color: COLORS.secondary,
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

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}` }} />
      </div>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: COLORS.bg }}>
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              style={{
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                backgroundColor: COLORS.white,
                overflow: "hidden",
              }}
            >
              {features.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 px-6 py-10 text-center"
                  style={{
                    borderLeft:
                      i > 0 && isDesktop
                        ? `1px solid ${COLORS.border}`
                        : "none",
                    borderTop:
                      i > 0 && !isDesktop
                        ? `1px solid ${COLORS.border}`
                        : "none",
                  }}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    style={{ color: COLORS.accent }}
                  />
                  <p
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-plus-jakarta-sans)",
                      color: COLORS.text,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}` }} />
      </div>

      {/* ── CTA + Footer ─────────────────────────────────── */}
      <section className="px-6 pb-12 pt-24" style={{ backgroundColor: COLORS.bg }}>
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-8">
          <ScrollReveal>
            <h2
              className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                fontFamily: "var(--font-plus-jakarta-sans)",
                color: COLORS.text,
              }}
            >
              Ready to play?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              className="text-center text-base max-w-md"
              style={{
                fontFamily: "var(--font-manrope)",
                color: COLORS.secondary,
              }}
            >
              Download GridFlip and start solving. No ads, no timers -- just you and the grid.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={180}
                height={60}
              />
            </motion.a>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-20 max-w-7xl pt-8">
          <div
            style={{ borderTop: `1px solid ${COLORS.border}` }}
            className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-between"
          >
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-manrope)",
                color: COLORS.secondary,
              }}
            >
              &copy; {new Date().getFullYear()} GridFlip. All rights reserved.
            </p>
            <div
              className="flex items-center gap-6 text-sm"
              style={{
                fontFamily: "var(--font-manrope)",
                color: COLORS.secondary,
              }}
            >
              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:underline underline-offset-4"
                style={{ color: COLORS.secondary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.text)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.secondary)
                }
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-200 hover:underline underline-offset-4"
                style={{ color: COLORS.secondary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.text)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.secondary)
                }
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

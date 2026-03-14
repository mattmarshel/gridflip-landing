"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

/* ─── Colors ─────────────────────────────────────────────── */

const CREAM = "#FAF5EE";
const ESPRESSO = "#3D2B1F";
const TERRACOTTA = "#C65D3E";
const SAGE = "#7B9E6B";
const GRID_BG = "#E8DFD2";

/* ─── Spring Config ──────────────────────────────────────── */

const organicSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 18,
};

/* ─── Scroll Reveal ──────────────────────────────────────── */

function ScrollReveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ ...organicSpring, delay }}
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
    <div className="inline-grid grid-cols-3 gap-1.5">
      {grid.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-lg"
          style={{
            width: 36,
            height: 36,
            backgroundColor: on ? color : CREAM,
            boxShadow: on
              ? "0 2px 6px rgba(198,93,62,0.25)"
              : "inset 0 0 0 1.5px rgba(61,43,31,0.1)",
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
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            backgroundColor: on ? color : CREAM,
            boxShadow: on
              ? "none"
              : "inset 0 0 0 1px rgba(61,43,31,0.08)",
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

export default function WarmAnalogPage() {
  const isDesktop = useMediaMin(768);
  const tileSize = isDesktop ? 56 : 44;

  // Stagger offsets for world cards to create organic layout
  const staggerOffsets = [0, 24, 8, 32, 16, 40, 4, 28];

  return (
    <div style={{ backgroundColor: CREAM, color: ESPRESSO }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative min-h-dvh px-4 py-16"
        style={{ backgroundColor: CREAM }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16 md:pt-24">
          {/* Grid - Left on desktop */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...organicSpring, delay: 0.1 }}
          >
            <InteractiveGrid
              tileSize={tileSize}
              gap={isDesktop ? 8 : 6}
              showHint
              lightColor={CREAM}
              darkColor={TERRACOTTA}
              gridBgColor={GRID_BG}
            />
          </motion.div>

          {/* Text + CTA - Right on desktop */}
          <motion.div
            className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...organicSpring, delay: 0.3 }}
          >
            <h1
              className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: ESPRESSO,
                letterSpacing: "-0.02em",
              }}
            >
              Grid
              <br />
              <span style={{ color: TERRACOTTA }}>Flip</span>
            </h1>

            <p
              className="max-w-md text-xl leading-relaxed sm:text-2xl"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "rgba(61,43,31,0.7)",
              }}
            >
              Flip tiles. Solve the grid. A puzzle game that&apos;s easy to
              learn and endlessly satisfying.
            </p>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={organicSpring}
              className="mt-2 block"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={180}
                height={60}
                priority
              />
            </motion.a>

            <div className="mt-4 flex items-center gap-3">
              {worlds.slice(0, 4).map((w, i) => (
                <motion.div
                  key={w.name}
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: w.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6 + i * 0.08,
                    ...organicSpring,
                  }}
                />
              ))}
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "rgba(61,43,31,0.4)",
                }}
              >
                +4 more worlds
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(61,43,31,0.3)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black sm:text-5xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: ESPRESSO,
              }}
            >
              One Tap, Five Tiles
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-center text-lg"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "rgba(61,43,31,0.6)",
              }}
            >
              Simple to understand, endlessly deep to master.
            </p>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid }, i) => (
              <ScrollReveal key={title} delay={i * 0.15}>
                <motion.div
                  className="flex flex-col items-center gap-5 rounded-3xl p-8"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(61,43,31,0.06)",
                    border: "1px solid rgba(61,43,31,0.06)",
                  }}
                  whileHover={{ y: -4, rotate: i === 1 ? 0 : i === 0 ? 1 : -1 }}
                  transition={organicSpring}
                >
                  {/* Step number in terracotta circle */}
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: TERRACOTTA,
                      color: CREAM,
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.1rem",
                    }}
                  >
                    {step}
                  </span>

                  <ExplainerGrid grid={grid} color={step === 3 ? ESPRESSO : TERRACOTTA} />

                  <div className="text-center">
                    <p
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        color: ESPRESSO,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "rgba(61,43,31,0.6)",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Worlds Showcase ───────────────────────────────── */}
      <section
        className="px-4 py-24"
        style={{
          backgroundColor: "#F3ECE2",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black sm:text-5xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: ESPRESSO,
              }}
            >
              8 Worlds to Master
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-center text-lg"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "rgba(61,43,31,0.55)",
              }}
            >
              Each world brings new patterns and challenges.
            </p>
          </ScrollReveal>

          {/* Desktop: staggered 4x2 grid */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-4">
            {worlds.map((w, i) => (
              <ScrollReveal
                key={w.name}
                delay={i * 0.08}
                style={{ paddingTop: isDesktop ? staggerOffsets[i] : 0 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-4 rounded-3xl p-6"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 16px rgba(61,43,31,0.06)",
                    border: "1px solid rgba(61,43,31,0.05)",
                  }}
                  whileHover={{
                    y: -6,
                    rotate: i % 2 === 0 ? 2 : -2,
                    scale: 1.03,
                  }}
                  transition={organicSpring}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        color: ESPRESSO,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "rgba(61,43,31,0.5)",
                      }}
                    >
                      {w.subtitle}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: horizontal scroll carousel */}
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
            {worlds.map((w, i) => (
              <ScrollReveal
                key={w.name}
                delay={i * 0.06}
                className="shrink-0 snap-center"
              >
                <motion.div
                  className="flex w-48 flex-col items-center gap-4 rounded-3xl p-6"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 16px rgba(61,43,31,0.06)",
                    border: "1px solid rgba(61,43,31,0.05)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={organicSpring}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        color: ESPRESSO,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "rgba(61,43,31,0.5)",
                      }}
                    >
                      {w.subtitle}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="px-4 py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black sm:text-4xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: ESPRESSO,
              }}
            >
              Crafted with Care
            </h2>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, label }, i) => {
              // Alternate between terracotta and sage for icons
              const iconColor = i % 2 === 0 ? TERRACOTTA : SAGE;

              return (
                <ScrollReveal key={label} delay={i * 0.1}>
                  <motion.div
                    className="flex flex-col items-center gap-4 rounded-3xl p-8 text-center"
                    style={{
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 4px 16px rgba(61,43,31,0.05)",
                      border: "1px solid rgba(61,43,31,0.05)",
                    }}
                    whileHover={{
                      y: -4,
                      rotate: i % 2 === 0 ? 1.5 : -1.5,
                    }}
                    transition={organicSpring}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor:
                          i % 2 === 0
                            ? "rgba(198,93,62,0.1)"
                            : "rgba(123,158,107,0.12)",
                      }}
                    >
                      <Icon
                        size={28}
                        strokeWidth={1.5}
                        style={{ color: iconColor }}
                      />
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: ESPRESSO,
                      }}
                    >
                      {label}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA + Footer ──────────────────────────────────── */}
      <section
        className="px-4 pb-12 pt-24"
        style={{ backgroundColor: "#F3ECE2" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
          <ScrollReveal>
            <h2
              className="text-center text-4xl font-black sm:text-5xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: ESPRESSO,
              }}
            >
              Ready to play?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              className="max-w-md text-center text-lg"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "rgba(61,43,31,0.6)",
              }}
            >
              200+ puzzles. 8 worlds. Zero ads. Pick it up for a minute or get
              lost for an hour.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={organicSpring}
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

          {/* World color dots */}
          <div className="flex items-center gap-3">
            {worlds.map((w, i) => (
              <motion.div
                key={w.color}
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: w.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.06,
                  ...organicSpring,
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(61,43,31,0.1)" }}
        >
          <div
            className="flex items-center gap-4 text-sm"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <Link
              href="/privacy"
              className="underline-offset-4 transition-opacity hover:underline"
              style={{ color: "rgba(61,43,31,0.5)" }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(61,43,31,0.2)" }}>|</span>
            <Link
              href="/terms"
              className="underline-offset-4 transition-opacity hover:underline"
              style={{ color: "rgba(61,43,31,0.5)" }}
            >
              Terms of Use
            </Link>
          </div>
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-outfit)",
              color: "rgba(61,43,31,0.35)",
            }}
          >
            &copy; {new Date().getFullYear()} GridFlip. All rights reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}

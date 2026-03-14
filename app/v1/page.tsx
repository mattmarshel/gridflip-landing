"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

/* ─── Colors ─────────────────────────────────────────────── */

const C = {
  bg: "#0A0A0F",
  text: "#F0EDE8",
  gold: "#C9A84C",
  card: "#161620",
  gridBg: "#1A1A24",
  textMuted: "rgba(240, 237, 232, 0.5)",
  borderGold: "rgba(201, 168, 76, 0.25)",
  borderGoldHover: "rgba(201, 168, 76, 0.5)",
};

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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Mini Grid Components ───────────────────────────────── */

function ExplainerGrid({
  grid,
}: {
  grid: number[][];
}) {
  return (
    <div className="inline-grid grid-cols-3 gap-1.5">
      {grid.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-lg"
          style={{
            width: 32,
            height: 32,
            backgroundColor: on ? C.gold : C.text,
            boxShadow: on
              ? "0 0 12px rgba(201, 168, 76, 0.3)"
              : "none",
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
            width: 22,
            height: 22,
            backgroundColor: on ? color : "rgba(240, 237, 232, 0.12)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Number ─────────────────────────────────────── */

function SectionNumber({ number }: { number: string }) {
  return (
    <span
      className="pointer-events-none select-none absolute -left-2 -top-8 sm:-left-6 sm:-top-12 text-7xl sm:text-9xl font-bold"
      style={{
        fontFamily: "var(--font-playfair-display)",
        color: "rgba(201, 168, 76, 0.07)",
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {number}
    </span>
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

export default function MidnightEditorial() {
  const isDesktop = useMediaMin(640);
  const tileSize = isDesktop ? 60 : 44;

  return (
    <div style={{ backgroundColor: C.bg, color: C.text }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <InteractiveGrid
              tileSize={tileSize}
              gap={isDesktop ? 8 : 6}
              showHint
              lightColor={C.text}
              darkColor={C.gold}
              gridBgColor={C.gridBg}
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h1
              className="text-5xl sm:text-7xl font-bold tracking-widest"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: C.text,
                letterSpacing: "0.2em",
              }}
            >
              GRID FLIP
            </h1>
            <p
              className="text-lg sm:text-xl"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: C.textMuted,
                letterSpacing: "0.08em",
              }}
            >
              Flip tiles. Solve the grid.
            </p>
          </motion.div>

          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ backgroundColor: C.gold }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="px-4 py-28 sm:py-36">
        <div className="relative mx-auto max-w-4xl">
          <SectionNumber number="01" />

          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: C.gold,
                letterSpacing: "0.2em",
              }}
            >
              How It Works
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-16" delay={0.1}>
            <h2
              className="text-3xl sm:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: C.text,
              }}
            >
              One Tap, Five Tiles
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid }, i) => (
              <ScrollReveal key={title} delay={i * 0.15}>
                <div
                  className="relative flex flex-col items-center gap-6 rounded-2xl p-8"
                  style={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.borderGold}`,
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-source-serif-4)",
                      backgroundColor: "transparent",
                      color: C.gold,
                      border: `1px solid ${C.gold}`,
                    }}
                  >
                    {step}
                  </span>
                  <ExplainerGrid grid={grid} />
                  <div className="text-center">
                    <p
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-playfair-display)",
                        color: C.text,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-1.5 text-sm"
                      style={{
                        fontFamily: "var(--font-source-serif-4)",
                        color: C.textMuted,
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

      {/* ── Thin gold divider ─────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="h-px w-full" style={{ backgroundColor: C.borderGold }} />
      </div>

      {/* ── Worlds Showcase ───────────────────────────────── */}
      <section className="px-4 py-28 sm:py-36">
        <div className="relative mx-auto max-w-4xl">
          <SectionNumber number="02" />

          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: C.gold,
                letterSpacing: "0.2em",
              }}
            >
              The Journey
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-16" delay={0.1}>
            <h2
              className="text-3xl sm:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: C.text,
              }}
            >
              8 Worlds to Master
            </h2>
          </ScrollReveal>

          {/* Desktop: 4-column grid */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-4">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * 0.08}>
                <div
                  className="group flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-300"
                  style={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.borderGold}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.borderGoldHover;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.borderGold;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-playfair-display)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-source-serif-4)",
                        color: C.textMuted,
                      }}
                    >
                      {w.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: horizontal scroll carousel */}
          <div
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {worlds.map((w, i) => (
              <ScrollReveal
                key={w.name}
                delay={i * 0.06}
                className="shrink-0 snap-center"
              >
                <div
                  className="flex w-48 flex-col items-center gap-4 rounded-2xl p-6"
                  style={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.borderGold}`,
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-playfair-display)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-source-serif-4)",
                        color: C.textMuted,
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

      {/* ── Thin gold divider ─────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="h-px w-full" style={{ backgroundColor: C.borderGold }} />
      </div>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="px-4 py-28 sm:py-36">
        <div className="relative mx-auto max-w-4xl">
          <SectionNumber number="03" />

          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: C.gold,
                letterSpacing: "0.2em",
              }}
            >
              Crafted Details
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-16" delay={0.1}>
            <h2
              className="text-3xl sm:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: C.text,
              }}
            >
              Built for Focus
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, label }, i) => (
              <ScrollReveal key={label} delay={i * 0.1}>
                <div
                  className="flex items-center gap-5 rounded-2xl p-6"
                  style={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.borderGold}`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "rgba(201, 168, 76, 0.1)",
                    }}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: C.gold }}
                    />
                  </div>
                  <p
                    className="text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-playfair-display)",
                      color: C.text,
                    }}
                  >
                    {label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thin gold divider ─────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="h-px w-full" style={{ backgroundColor: C.borderGold }} />
      </div>

      {/* ── CTA + Footer ──────────────────────────────────── */}
      <section className="px-4 pb-16 pt-28 sm:pt-36">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10">
          <SectionNumber number="04" />

          <ScrollReveal>
            <p
              className="text-sm font-medium uppercase tracking-widest text-center"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: C.gold,
                letterSpacing: "0.2em",
              }}
            >
              Begin
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className="text-center text-3xl sm:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: C.text,
              }}
            >
              Ready to play?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
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

          {/* World color dots */}
          <ScrollReveal delay={0.3} className="flex items-center gap-3">
            {worlds.map((w, i) => (
              <motion.div
                key={w.color}
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: w.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4 + i * 0.06,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}
          </ScrollReveal>
        </div>

        <footer className="mx-auto mt-20 max-w-4xl">
          <div
            className="h-px w-full mb-8"
            style={{ backgroundColor: C.borderGold }}
          />
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-6 text-sm"
              style={{
                fontFamily: "var(--font-source-serif-4)",
              }}
            >
              <Link
                href="/privacy"
                className="underline-offset-4 transition-opacity duration-300 hover:underline"
                style={{ color: C.textMuted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.textMuted;
                }}
              >
                Privacy Policy
              </Link>
              <span style={{ color: "rgba(201, 168, 76, 0.2)" }}>|</span>
              <Link
                href="/terms"
                className="underline-offset-4 transition-opacity duration-300 hover:underline"
                style={{ color: C.textMuted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.textMuted;
                }}
              >
                Terms of Use
              </Link>
            </div>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-source-serif-4)",
                color: "rgba(240, 237, 232, 0.3)",
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

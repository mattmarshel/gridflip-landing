"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Grid3X3, Globe, Shield, Trophy, ChevronDown } from "lucide-react";
import InteractiveGrid from "@/components/interactive-grid";

/* ─── Data ────────────────────────────────────────────────── */

const worlds = [
  { name: "Tutorial Plains", color: "#7FB069", subtitle: "Learn the basics" },
  { name: "Flip Forest", color: "#2D6A4F", subtitle: "Think ahead" },
  { name: "Cascade Canyon", color: "#D2691E", subtitle: "Chain your thinking" },
  {
    name: "Logic Lake",
    color: "#2E86C1",
    subtitle: "Calm waters, deep puzzles",
  },
  { name: "Mirror Mountain", color: "#2196A6", subtitle: "See the pattern" },
  { name: "Labyrinth Labs", color: "#00BCD4", subtitle: "Think bigger" },
  {
    name: "Chaos Cavern",
    color: "#AB47BC",
    subtitle: "Trust your instincts",
  },
  { name: "Mastery Summit", color: "#4A7C8A", subtitle: "The final ascent" },
];

// Fixed 4×4 patterns for world cards (1 = dark/world color, 0 = white)
const worldPatterns = [
  [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ],
  [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  [
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
  ],
  [
    [1, 0, 1, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 1],
  ],
  [
    [1, 1, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ],
];

const howItWorks = [
  {
    step: 1,
    title: "Tap",
    desc: "Tap any tile on the grid",
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    color: "#4A6CF7",
  },
  {
    step: 2,
    title: "Flip",
    desc: "It flips with its neighbors",
    grid: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "#4A6CF7",
  },
  {
    step: 3,
    title: "Solve",
    desc: "Make them all match",
    grid: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: "#1C1C1E",
  },
];

const features = [
  { icon: Grid3X3, label: "200+ Handcrafted Puzzles" },
  { icon: Globe, label: "8 Unique Worlds" },
  { icon: Shield, label: "No Ads, No Timers" },
  { icon: Trophy, label: "Game Center Leaderboards" },
];

/* ─── Scroll Reveal ───────────────────────────────────────── */

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Mini Grid Components ────────────────────────────────── */

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
            width: 32,
            height: 32,
            backgroundColor: on ? color : "#FFFFFF",
            boxShadow: on ? "none" : "inset 0 0 0 1.5px rgba(0,0,0,0.06)",
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
            backgroundColor: on ? color : "#FFFFFF",
            boxShadow: on ? "none" : "inset 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Responsive Hook ─────────────────────────────────────── */

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

/* ─── Page ────────────────────────────────────────────────── */

export default function Home() {
  const isDesktop = useMediaMin(640);
  const tileSize = isDesktop ? 64 : 48;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center bg-gf-bg px-4">
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <InteractiveGrid tileSize={tileSize} />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h1
              className="text-4xl font-black text-gf-dark sm:text-5xl"
              style={{ letterSpacing: "0.15em" }}
            >
              GRID FLIP
            </h1>
            <p className="text-lg font-semibold text-gf-text-secondary">
              Flip tiles. Solve the grid.
            </p>
          </motion.div>

          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
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

        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              className="text-gf-text-secondary"
              size={28}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black text-gf-dark sm:text-4xl"
              style={{ letterSpacing: "0.05em" }}
            >
              One Tap, Five Tiles
            </h2>
          </ScrollReveal>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid, color }, i) => (
              <ScrollReveal key={title} delay={i * 0.12}>
                <div
                  className="flex flex-col items-center gap-5 rounded-[20px] bg-gf-bg p-8"
                  style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gf-accent text-sm font-bold text-white">
                    {step}
                  </span>
                  <ExplainerGrid grid={grid} color={color} />
                  <div className="text-center">
                    <p className="text-lg font-bold text-gf-dark">{title}</p>
                    <p className="mt-1 text-sm text-gf-text-secondary">
                      {desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Worlds Showcase ───────────────────────────────── */}
      <section className="bg-gf-bg px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black text-gf-dark sm:text-4xl"
              style={{ letterSpacing: "0.05em" }}
            >
              8 Worlds to Master
            </h2>
          </ScrollReveal>

          {/* Desktop: 4×2 grid */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-4">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * 0.06}>
                <div
                  className="flex flex-col items-center gap-4 rounded-[20px] bg-white p-6 transition-transform duration-200 hover:-translate-y-1"
                  style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p className="text-sm font-bold text-gf-dark">{w.name}</p>
                    <p className="mt-0.5 text-xs text-gf-text-secondary">
                      {w.subtitle}
                    </p>
                  </div>
                </div>
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
                <div
                  className="flex w-[200px] flex-col items-center gap-4 rounded-[20px] bg-white p-6"
                  style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p className="text-sm font-bold text-gf-dark">{w.name}</p>
                    <p className="mt-0.5 text-xs text-gf-text-secondary">
                      {w.subtitle}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <Icon
                  className="text-gf-accent"
                  size={32}
                  strokeWidth={1.5}
                />
                <p className="font-bold text-gf-dark">{label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA + Footer ──────────────────────────────────── */}
      <section className="bg-gf-bg px-4 pb-12 pt-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
          <ScrollReveal>
            <h2
              className="text-center text-3xl font-black text-gf-dark sm:text-4xl"
              style={{ letterSpacing: "0.05em" }}
            >
              Ready to play?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
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
                  delay: 0.2 + i * 0.05,
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              />
            ))}
          </div>
        </div>

        <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-3 border-t border-gf-card pt-8">
          <div className="flex items-center gap-4 text-sm text-gf-text-secondary">
            <Link
              href="/privacy"
              className="underline-offset-4 transition-colors hover:text-gf-dark hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-gf-card">|</span>
            <Link
              href="/terms"
              className="underline-offset-4 transition-colors hover:text-gf-dark hover:underline"
            >
              Terms of Use
            </Link>
          </div>
          <p className="text-xs text-gf-text-secondary/60">
            &copy; {new Date().getFullYear()} GridFlip. All rights reserved.
          </p>
        </footer>
      </section>
    </>
  );
}

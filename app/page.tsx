"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

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
            boxShadow: on ? "none" : "inset 0 0 0 1.5px rgba(0,0,0,0.08)",
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
  const tileSize = isDesktop ? 56 : 44;

  return (
    <div style={{ fontFamily: "var(--font-outfit), sans-serif", backgroundColor: "#FAFAFA" }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
          {/* Text side */}
          <motion.div
            className="flex flex-col items-center gap-5 sm:items-start sm:flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              className="text-5xl font-black sm:text-7xl"
              style={{
                letterSpacing: "0.12em",
                color: "#1C1C1E",
              }}
            >
              GRID FLIP
            </h1>
            <p
              className="text-center text-lg font-semibold sm:text-left sm:text-xl"
              style={{ color: "#6B6B70" }}
            >
              Flip tiles. Solve the grid.
            </p>

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
              className="mt-2 block"
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

          {/* Card with InteractiveGrid */}
          <motion.div
            className="glass-float sm:flex-1"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                backgroundColor: "#F2F2F7",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <InteractiveGrid
                tileSize={tileSize}
                lightColor="#FFFFFF"
                darkColor="#1C1C1E"
                gridBgColor="#E5E5EA"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
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
              style={{ color: "#C7C7CC" }}
              size={28}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="px-4 py-24" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black sm:text-4xl"
              style={{ letterSpacing: "0.05em", color: "#1C1C1E" }}
            >
              One Tap, Five Tiles
            </h2>
          </ScrollReveal>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {howItWorks.map(({ step, title, desc, grid }, i) => (
              <ScrollReveal key={title} delay={i * 0.12}>
                <div
                  className="soft-card flex flex-col items-center gap-5 rounded-3xl p-8"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: "#1C1C1E", color: "#FFFFFF" }}
                  >
                    {step}
                  </span>
                  <ExplainerGrid grid={grid} color="#1C1C1E" />
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: "#1C1C1E" }}>{title}</p>
                    <p className="mt-1 text-sm" style={{ color: "#8E8E93" }}>
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
      <section className="px-4 py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16">
            <h2
              className="text-center text-3xl font-black sm:text-4xl"
              style={{ letterSpacing: "0.05em", color: "#1C1C1E" }}
            >
              8 Worlds to Master
            </h2>
          </ScrollReveal>

          {/* Desktop: 4x2 grid */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-4">
            {worlds.map((w, i) => (
              <ScrollReveal key={w.name} delay={i * 0.06}>
                <div
                  className="soft-card flex flex-col items-center gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p className="text-sm font-bold" style={{ color: "#1C1C1E" }}>{w.name}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "#8E8E93" }}>
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
                  className="soft-card flex w-[200px] flex-col items-center gap-4 rounded-3xl p-6"
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p className="text-sm font-bold" style={{ color: "#1C1C1E" }}>{w.name}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "#8E8E93" }}>
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
      <section className="px-4 py-24" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <Icon
                  style={{ color: "#1C1C1E" }}
                  size={32}
                  strokeWidth={1.5}
                />
                <p className="font-bold" style={{ color: "#1C1C1E" }}>{label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA + Footer ──────────────────────────────────── */}
      <section className="px-4 pb-12 pt-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
          <ScrollReveal>
            <h2
              className="text-center text-3xl font-black sm:text-4xl"
              style={{ letterSpacing: "0.05em", color: "#1C1C1E" }}
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

        <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-3 border-t pt-8" style={{ borderColor: "#E5E5EA" }}>
          <div className="flex items-center gap-4 text-sm" style={{ color: "#8E8E93" }}>
            <Link
              href="/privacy"
              className="underline-offset-4 transition-colors hover:underline"
              style={{ color: "#8E8E93" }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "#D1D1D6" }}>|</span>
            <Link
              href="/terms"
              className="underline-offset-4 transition-colors hover:underline"
              style={{ color: "#8E8E93" }}
            >
              Terms of Use
            </Link>
          </div>
          <p className="text-xs" style={{ color: "#C7C7CC" }}>
            &copy; {new Date().getFullYear()} GridFlip. All rights reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}

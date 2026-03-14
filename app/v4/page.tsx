"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InteractiveGrid from "@/components/interactive-grid";
import { worlds, worldPatterns, howItWorks, features } from "@/lib/landing-data";

/* ─── Colors ─────────────────────────────────────────────── */

const C = {
  bgFrom: "#F0EAFF",
  bgTo: "#FFF0F3",
  text: "#2D2B55",
  textSecondary: "#8B85A8",
  accent: "#7C3AED",
  accentPink: "#EC4899",
  glassWhite: "rgba(255, 255, 255, 0.4)",
  glassBorder: "rgba(255, 255, 255, 0.6)",
  glassWhiteStrong: "rgba(255, 255, 255, 0.5)",
  tileLight: "#FFFFFF",
  tileDark: "#7C3AED",
  gridBg: "rgba(255, 255, 255, 0.3)",
};

/* ─── Scroll Reveal (floaty spring) ──────────────────────── */

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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.95, y: 30 }
      }
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Mini Grid Components ───────────────────────────────── */

function ExplainerGrid({ grid }: { grid: number[][] }) {
  return (
    <div className="inline-grid grid-cols-3 gap-1.5">
      {grid.flat().map((on, i) => (
        <div
          key={i}
          className="rounded-lg"
          style={{
            width: 32,
            height: 32,
            backgroundColor: on ? C.accent : C.tileLight,
            boxShadow: on ? "0 0 14px rgba(124, 58, 237, 0.35)" : "none",
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
            backgroundColor: on ? color : "rgba(255, 255, 255, 0.5)",
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

/* ─── Floating Blob Component ────────────────────────────── */

function FloatingBlob({
  size,
  color,
  initialX,
  initialY,
  duration,
  xKeyframes,
  yKeyframes,
}: {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  xKeyframes: number[];
  yKeyframes: number[];
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        opacity: 0.5,
        left: initialX,
        top: initialY,
      }}
      animate={{
        x: xKeyframes,
        y: yKeyframes,
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function SoftPastelGradient() {
  const isDesktop = useMediaMin(640);
  const tileSize = isDesktop ? 60 : 44;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${C.bgFrom} 0%, ${C.bgTo} 100%)`,
        color: C.text,
        minHeight: "100dvh",
      }}
    >
      {/* ── Global Floating Blobs ─────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <FloatingBlob
          size={500}
          color="rgba(124, 58, 237, 0.15)"
          initialX={-100}
          initialY={100}
          duration={25}
          xKeyframes={[0, 120, -60, 80, 0]}
          yKeyframes={[0, 80, 160, 40, 0]}
        />
        <FloatingBlob
          size={400}
          color="rgba(236, 72, 153, 0.12)"
          initialX={600}
          initialY={300}
          duration={30}
          xKeyframes={[0, -100, 60, -80, 0]}
          yKeyframes={[0, 120, -40, 100, 0]}
        />
        <FloatingBlob
          size={350}
          color="rgba(167, 139, 250, 0.14)"
          initialX={200}
          initialY={800}
          duration={22}
          xKeyframes={[0, 80, -120, 40, 0]}
          yKeyframes={[0, -60, 80, -100, 0]}
        />
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
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

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.3,
            }}
          >
            <h1
              className="text-5xl sm:text-7xl font-bold tracking-widest"
              style={{
                fontFamily: "var(--font-dm-sans)",
                background: `linear-gradient(135deg, ${C.accent}, ${C.accentPink})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.15em",
              }}
            >
              GRID FLIP
            </h1>
            <p
              className="text-lg sm:text-xl"
              style={{
                fontFamily: "var(--font-sora)",
                color: C.textSecondary,
                letterSpacing: "0.06em",
              }}
            >
              Flip tiles. Solve the grid.
            </p>
          </motion.div>

          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.6,
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ backgroundColor: C.accent }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="relative px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-sora)",
                color: C.accent,
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
                fontFamily: "var(--font-dm-sans)",
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
                    background: C.glassWhite,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${C.glassBorder}`,
                    boxShadow: "0 8px 32px rgba(124, 58, 237, 0.08)",
                  }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      backgroundColor: C.accent,
                      color: "#FFFFFF",
                    }}
                  >
                    {step}
                  </span>
                  <ExplainerGrid grid={grid} />
                  <div className="text-center">
                    <p
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        color: C.text,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      className="mt-1.5 text-sm"
                      style={{
                        fontFamily: "var(--font-sora)",
                        color: C.textSecondary,
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

      {/* ── Soft divider ─────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.accent}30, transparent)`,
          }}
        />
      </div>

      {/* ── Worlds Showcase ───────────────────────────────── */}
      <section className="relative px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-sora)",
                color: C.accent,
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
                fontFamily: "var(--font-dm-sans)",
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
                  className="group flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-300 cursor-default"
                  style={{
                    background: C.glassWhite,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${C.glassBorder}`,
                    boxShadow: `0 8px 32px ${w.color}30`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = `0 16px 48px ${w.color}40`;
                    el.style.background = C.glassWhiteStrong;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = `0 8px 32px ${w.color}30`;
                    el.style.background = C.glassWhite;
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-sora)",
                        color: C.textSecondary,
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
                    background: C.glassWhite,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${C.glassBorder}`,
                    boxShadow: `0 8px 32px ${w.color}30`,
                  }}
                >
                  <WorldGrid pattern={worldPatterns[i]} color={w.color} />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        color: C.text,
                      }}
                    >
                      {w.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-sora)",
                        color: C.textSecondary,
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

      {/* ── Soft divider ─────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.accent}30, transparent)`,
          }}
        />
      </div>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="relative px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="mb-4">
            <p
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-sora)",
                color: C.accent,
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
                fontFamily: "var(--font-dm-sans)",
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
                    background: C.glassWhite,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${C.glassBorder}`,
                    boxShadow: "0 8px 32px rgba(124, 58, 237, 0.06)",
                  }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(236, 72, 153, 0.1))",
                    }}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: C.accent }}
                    />
                  </div>
                  <p
                    className="text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
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

      {/* ── Soft divider ─────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.accent}30, transparent)`,
          }}
        />
      </div>

      {/* ── CTA + Footer ──────────────────────────────────── */}
      <section className="relative px-4 pb-16 pt-28 sm:pt-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
          <ScrollReveal>
            <p
              className="text-sm font-medium uppercase tracking-widest text-center"
              style={{
                fontFamily: "var(--font-sora)",
                color: C.accent,
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
                fontFamily: "var(--font-dm-sans)",
                background: `linear-gradient(135deg, ${C.accent}, ${C.accentPink})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
                whileInView={{ opacity: 0.8, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.4 + i * 0.06,
                }}
              />
            ))}
          </ScrollReveal>
        </div>

        <footer className="mx-auto mt-20 max-w-4xl">
          <div
            className="h-px w-full mb-8"
            style={{
              background: `linear-gradient(90deg, transparent, ${C.accent}30, transparent)`,
            }}
          />
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-6 text-sm"
              style={{
                fontFamily: "var(--font-sora)",
              }}
            >
              <Link
                href="/privacy"
                className="underline-offset-4 transition-all duration-300 hover:underline"
                style={{ color: C.textSecondary }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    C.textSecondary;
                }}
              >
                Privacy Policy
              </Link>
              <span style={{ color: "rgba(124, 58, 237, 0.25)" }}>|</span>
              <Link
                href="/terms"
                className="underline-offset-4 transition-all duration-300 hover:underline"
                style={{ color: C.textSecondary }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    C.textSecondary;
                }}
              >
                Terms of Use
              </Link>
            </div>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-sora)",
                color: "rgba(45, 43, 85, 0.4)",
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import InteractiveGrid from "@/components/interactive-grid";

const worldColors = [
  "#7FB069",
  "#2D6A4F",
  "#D2691E",
  "#2E86C1",
  "#2196A6",
  "#00BCD4",
  "#AB47BC",
  "#4A7C8A",
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <main className="flex flex-col items-center gap-8 py-12">
        {/* Interactive Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <InteractiveGrid />
        </motion.div>

        {/* Title + Tagline */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1
            className="text-4xl font-bold tracking-[0.2em] text-gf-dark sm:text-5xl"
            style={{ letterSpacing: "0.2em" }}
          >
            GRID FLIP
          </h1>
          <p className="text-lg text-gf-text-secondary">
            Flip tiles. Solve the grid.
          </p>
        </motion.div>

        {/* App Store Badge */}
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
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

        {/* World Colors Strip */}
        <div className="flex items-center gap-3">
          {worldColors.map((color, i) => (
            <motion.div
              key={color}
              className="rounded-full"
              style={{
                width: 12,
                height: 12,
                backgroundColor: color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.05,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 pb-8 pt-4">
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
    </div>
  );
}

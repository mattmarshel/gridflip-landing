"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const GRID_SIZE = 5;
const STAGGER_MS = 35;

// Manhattan distance between two grid positions
function manhattan(r1: number, c1: number, r2: number, c2: number) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

// Get affected tiles (target + orthogonal neighbors)
function getAffectedTiles(row: number, col: number) {
  const tiles: [number, number][] = [[row, col]];
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of dirs) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
      tiles.push([nr, nc]);
    }
  }
  return tiles;
}

// Initialize random board state
function createInitialBoard(): boolean[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => Math.random() > 0.5)
  );
}

interface TileCellProps {
  isLight: boolean;
  size: number;
  flipKey: number;
  delay: number;
}

function TileCell({ isLight, size, flipKey, delay }: TileCellProps) {
  const controls = useAnimation();
  const prevFlipKey = useRef(flipKey);
  const prevIsLight = useRef(isLight);

  useEffect(() => {
    if (flipKey !== prevFlipKey.current) {
      prevFlipKey.current = flipKey;
      prevIsLight.current = isLight;

      // Run the two-phase flip animation
      const animate = async () => {
        // Phase 1: rotate to 90° (tile becomes edge-on, invisible)
        await controls.start({
          rotateY: 90,
          transition: { duration: 0.175, ease: "easeIn", delay },
        });
        // At midpoint, the component has already re-rendered with new color
        // Phase 2: rotate from 90° to 0° to reveal new face
        await controls.start({
          rotateY: 0,
          transition: { duration: 0.175, ease: "easeOut" },
        });
      };
      animate();
    } else {
      prevIsLight.current = isLight;
    }
  }, [flipKey, isLight, controls, delay]);

  return (
    <div className="perspective-600" style={{ width: size, height: size }}>
      <motion.button
        animate={controls}
        className="preserve-3d relative w-full h-full cursor-pointer border-0 p-0 outline-none"
        style={{
          borderRadius: 16,
          backgroundColor: isLight ? "#FFFFFF" : "#1C1C1E",
          boxShadow: isLight
            ? "0 2px 8px rgba(0, 0, 0, 0.06)"
            : "0 2px 8px rgba(0, 0, 0, 0.15)",
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}

interface InteractiveGridProps {
  tileSize?: number;
  gap?: number;
  showHint?: boolean;
}

export default function InteractiveGrid({
  tileSize = 56,
  gap = 8,
  showHint: showHintProp = true,
}: InteractiveGridProps) {
  const [board, setBoard] = useState<boolean[][]>(createInitialBoard);
  const [flipKeys, setFlipKeys] = useState<number[][]>(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => 0)
    )
  );
  const [delays, setDelays] = useState<number[][]>(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => 0)
    )
  );
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hintReady, setHintReady] = useState(false);

  const handleTap = useCallback(
    (row: number, col: number) => {
      const affected = getAffectedTiles(row, col);

      setBoard((prev) => {
        const next = prev.map((r) => [...r]);
        for (const [r, c] of affected) {
          next[r][c] = !next[r][c];
        }
        return next;
      });

      setDelays((prev) => {
        const next = prev.map((r) => [...r]);
        for (const [r, c] of affected) {
          const dist = manhattan(row, col, r, c);
          next[r][c] = dist * STAGGER_MS / 1000;
        }
        return next;
      });

      setFlipKeys((prev) => {
        const next = prev.map((r) => [...r]);
        for (const [r, c] of affected) {
          next[r][c] = prev[r][c] + 1;
        }
        return next;
      });
    },
    []
  );

  // Auto-play: tap random tile every 1.2s
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      handleTap(row, col);
    }, 1200);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleTap]);

  // Show hint after 2s
  useEffect(() => {
    const timer = setTimeout(() => setHintReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }
  }, [hasInteracted]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="grid relative"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${tileSize}px)`,
          gap: `${gap}px`,
          padding: `${gap}px`,
          borderRadius: 24,
          backgroundColor: "#E5E5EA",
        }}
        onClick={stopAutoPlay}
      >
        {board.map((row, r) =>
          row.map((isLight, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleTap(r, c)}
            >
              <TileCell
                isLight={isLight}
                size={tileSize}
                flipKey={flipKeys[r][c]}
                delay={delays[r][c]}
              />
            </div>
          ))
        )}
      </div>
      <motion.p
        className="text-gf-text-secondary text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHintProp && hintReady && !hasInteracted ? 0.7 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Tap a tile
      </motion.p>
    </div>
  );
}

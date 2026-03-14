import { Grid3X3, Globe, Shield, Trophy } from "lucide-react";

export const worlds = [
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
export const worldPatterns = [
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

export const howItWorks = [
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

export const features = [
  { icon: Grid3X3, label: "150+ Handcrafted Puzzles" },
  { icon: Globe, label: "8 Unique Worlds" },
  { icon: Shield, label: "No Ads, No Timers" },
  { icon: Trophy, label: "Game Center Leaderboards" },
];

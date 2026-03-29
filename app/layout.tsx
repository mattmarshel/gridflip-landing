import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Playfair_Display,
  Source_Serif_4,
  Fraunces,
  Outfit,
  Plus_Jakarta_Sans,
  Manrope,
  DM_Sans,
  Sora,
  Syne,
  Nunito_Sans,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// V1: Midnight Editorial
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  display: "swap",
});

// V2: Warm Analog
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// V3: Geometric Precision
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// V4: Soft Pastel Gradient
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

// V5: Dynamic Canvas
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F2F2F7",
};

export const metadata: Metadata = {
  title: "GridFlip — Flip tiles. Solve the grid.",
  description:
    "A beautiful puzzle game where you flip tiles to solve the grid. Available on the App Store.",
  icons: {
    icon: "/gridflip-favicon.svg",
    shortcut: "/gridflip-favicon.svg",
    apple: "/gridflip-favicon.svg",
  },
  openGraph: {
    title: "GridFlip — Flip tiles. Solve the grid.",
    description:
      "A beautiful puzzle game where you flip tiles to solve the grid. Available on the App Store.",
    type: "website",
    siteName: "GridFlip",
  },
  twitter: {
    card: "summary_large_image",
    title: "GridFlip — Flip tiles. Solve the grid.",
    description:
      "A beautiful puzzle game where you flip tiles to solve the grid. Available on the App Store.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="apple-itunes-app"
          content="app-id=6760097953, app-argument=https://apps.apple.com/us/app/gridflip-tile-puzzle-game/id6760097953"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${sourceSerif4.variable} ${fraunces.variable} ${outfit.variable} ${plusJakartaSans.variable} ${manrope.variable} ${dmSans.variable} ${sora.variable} ${syne.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

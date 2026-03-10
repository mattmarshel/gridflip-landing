import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GridFlip — Flip tiles. Solve the grid.",
  description:
    "A beautiful puzzle game where you flip tiles to solve the grid. Available on the App Store.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ChallengePage() {
  const params = useParams();
  const code = params.code as string;

  useEffect(() => {
    // Attempt custom scheme redirect (works if app is installed
    // but Universal Links haven't been set up yet)
    window.location.href = `gridflip://c/${code}`;
  }, [code]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2F2F7",
        fontFamily: "var(--font-outfit), system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Grid icon */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
            width: 72,
            height: 72,
          }}
        >
          {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((on, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                backgroundColor: on ? "#1C1C1E" : "#E5E5EA",
              }}
            />
          ))}
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1C1C1E",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          GridFlip Challenge
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "#6B6B70",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Someone challenged you to solve a puzzle!
          <br />
          Open this link in the GridFlip app to play.
        </p>

        {/* App Store badge */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 8,
          }}
        >
          <Image
            src="/app-store-badge.svg"
            alt="Download on the App Store"
            width={180}
            height={60}
            priority
          />
        </a>

        <p
          style={{
            fontSize: 13,
            color: "#8E8E93",
            margin: 0,
          }}
        >
          Already have GridFlip?{" "}
          <a
            href={`gridflip://c/${code}`}
            style={{
              color: "#4A6CF7",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Open in app
          </a>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Sora, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

// OLLIN type system (locked with the team). CSS variable names are kept stable
// so the Tailwind mapping (var(--font-display) / --font-instrument-sans /
// --font-space-mono) and every component stay untouched — only the faces change.

// Sora — the OLLIN display face: headlines, card titles, stat values, CTAs.
const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Work Sans — body copy and UI.
const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Space Mono — eyebrows, data labels, verification stamps (400 / 700 only).
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OLLIN — Intelligence meets action.",
  description:
    "OLLIN shows revenue teams which companies to pursue, why now, who to contact, and what to do next — then keeps every opportunity moving.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

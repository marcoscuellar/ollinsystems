import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Space Grotesk — the OLLIN display face. Ties the product back to the DOS
// house type system while keeping its own dark/mint identity.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Inter — body copy and UI.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// IBM Plex Mono — eyebrows, data labels, verification stamps.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${display.variable} ${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

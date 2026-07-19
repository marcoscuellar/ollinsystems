import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OLLIN — Intelligence in motion.",
  description: "OLLIN prepares the opportunity, builds the strategy, and keeps every next move in one connected system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

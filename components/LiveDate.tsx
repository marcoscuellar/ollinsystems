"use client";

import { useEffect, useState } from "react";

// The hero eyebrow — a live "WEEKDAY, MON DD · H:MM AM/PM" stamp in the user's
// own timezone. Rendered client-side (server time is UTC) and refreshed each
// minute. Blank until mounted to avoid an SSR/client hydration mismatch.
export default function LiveDate() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const date = d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
      const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      return `${date} · ${time}`.toUpperCase();
    };
    setLabel(fmt());
    const t = setInterval(() => setLabel(fmt()), 30_000);
    return () => clearInterval(t);
  }, []);

  return <span>{label || " "}</span>;
}

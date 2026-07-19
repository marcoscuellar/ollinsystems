import type { Config } from "tailwindcss";

/**
 * OLLIN — "Signal" brand system. Intelligence meets action.
 * Three real colors do all the work (sampled from the locked palette):
 *   Ink  #0A100E — dark surfaces + text on light
 *   Mint #64D99E — the accent. Action-only: next steps, verified, live signals.
 *   Mist #E3E9E7 — light surface + text on dark
 * Two supporting values: page bg #0A150F (greener ink, gives depth without
 * borders) and Paper #F9FEF9 (brightest pills on dark).
 * Inversion rule: every surface renders its children in the counter-colors.
 * Mint appears at most once per card.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A100E", // card/dark surface
        night: "#0A150F", // page background (slightly greener than ink)
        raised: "#101915", // raised dark surface (hover, nested)
        mint: {
          DEFAULT: "#64D99E",
          deep: "#35B779", // locked OLLIN hover / movement state
          tint: "rgba(100, 217, 158, 0.12)", // mint wash on dark
        },
        mist: "#E3E9E7", // light surface + primary text on dark
        paper: "#F9FEF9", // brightest — pills/chips on dark
        sage: "#A9B9B1", // secondary brand tone

        // Light workspace — dark chrome (sidebar/top bar) over a white content
        // area. Cards are white; separation comes from a soft ink-tinted
        // shadow, never pure-black. Text inverts to ink on these surfaces.
        lite: {
          DEFAULT: "#FFFFFF", // white card + content surface
          raised: "#F3F5F4", // hover / nested box on light
          line: "rgba(10, 16, 14, 0.09)", // hairline on light
          soft: "rgba(10, 16, 14, 0.16)", // dashed / stronger hairline
        },
        onlite: {
          DEFAULT: "#0A100E", // primary text on light
          soft: "rgba(10, 16, 14, 0.66)", // body text on light
          fog: "rgba(10, 16, 14, 0.55)", // secondary text on light
          faint: "rgba(10, 16, 14, 0.42)", // labels / eyebrows on light
        },

        // Legacy token names kept so shared components (login, demo toggle,
        // empty states) render correctly on the dark system without a rewrite.
        volt: "#64D99E",
        surface: "#101915",
        onink: {
          DEFAULT: "#E3E9E7",
          soft: "rgba(227, 233, 231, 0.72)",
          faint: "rgba(227, 233, 231, 0.45)",
          aqua: "#64D99E",
        },
        muted: {
          line: "rgba(227, 233, 231, 0.10)", // hairline on dark
          soft: "rgba(227, 233, 231, 0.22)",
          sage: "#A9B9B1",
          fog: "rgba(227, 233, 231, 0.55)", // secondary text on dark
          deep: "#E3E9E7",
        },
        tint: {
          mint: "rgba(100, 217, 158, 0.12)",
          line: "rgba(227, 233, 231, 0.10)",
          sage: "rgba(227, 233, 231, 0.22)",
          coral: "rgba(227, 233, 231, 0.08)",
        },
        coral: { text: "#E3E9E7" },
        slate: "rgba(227, 233, 231, 0.72)",
        olive: {
          DEFAULT: "#64D99E",
          deep: "#35B779",
        },
        // Status-only semantics: mint = verified/on-track, red = needs action.
        verified: {
          DEFAULT: "#64D99E",
          tint: "rgba(100, 217, 158, 0.14)",
          deep: "#64D99E",
        },
        alert: {
          DEFAULT: "#FF6B6B",
          tint: "rgba(255, 107, 107, 0.14)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"], // Inter / SF Pro
        body: ["var(--font-instrument-sans)", "system-ui", "sans-serif"], // Inter / SF Pro
        mono: ["var(--font-space-mono)", "monospace"], // SF Mono
      },
      borderRadius: {
        btn: "999px", // pills — the signature capsule device
        card: "24px",
        panel: "32px",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
        backdropIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        modalPop: {
          from: { opacity: "0", transform: "translateY(8px) scale(.98)" },
          to: { opacity: "1", transform: "none" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        rise: "rise .25s ease",
        backdropIn: "backdropIn .15s ease-out",
        modalPop: "modalPop .22s cubic-bezier(.34,1.2,.64,1)",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

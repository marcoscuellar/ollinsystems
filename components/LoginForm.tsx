"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OllinMark } from "@/components/icons";

type Mode = "signin" | "signup";

const intelligenceStages = [
  {
    number: "01",
    title: "Discover",
    copy: "Monitors company activity, hiring movement, market timing, role demand, and dated buying signals.",
  },
  {
    number: "02",
    title: "Verify",
    copy: "Re-checks source, recency, and evidence strength. Stale or unsupported signals are dropped before they reach the queue.",
  },
  {
    number: "03",
    title: "Resolve",
    copy: "Builds the account brief, validates relevant roles, and identifies the people connected to the opportunity.",
  },
  {
    number: "04",
    title: "Rank",
    copy: "Scores confidence, urgency, timing, and fit so Today surfaces the strongest next opportunity first.",
  },
  {
    number: "05",
    title: "Prepare",
    copy: "Turns the verified signal into an account-specific angle, contact path, and coordinated multi-touch campaign.",
  },
  {
    number: "06",
    title: "Move",
    copy: "Carries the evidence into Movement, records each outcome, and preserves the next action without losing context.",
  },
];

const proofRows = [
  ["HIRING VALIDATION", "3 roles confirmed", "VERIFIED"],
  ["ACTION WINDOW", "Aug–Oct planning", "CURRENT"],
  ["CONTACT GRAPH", "4 decision-makers", "RESOLVED"],
  ["OPPORTUNITY SCORE", "92 / 100", "HIGH"],
];

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finishSignedIn = async () => {
    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("That email and password don't match. Try again.");
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);

    if (mode === "signup") {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password, name: name.trim() }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Couldn't create that account.");
          setBusy(false);
          return;
        }
      } catch {
        setError("Something went wrong. Try again.");
        setBusy(false);
        return;
      }
    }

    try {
      await finishSignedIn();
    } catch {
      setError("Something went wrong. Try again.");
      setBusy(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-lite-line bg-night text-paper">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label="OLLIN home">
            <OllinMark size={32} />
            <span className="font-display text-[20px] font-bold tracking-[0.04em]">OLLIN</span>
          </a>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[10px] tracking-[0.12em] text-onink-faint sm:block">
              INTELLIGENCE IN MOTION
            </span>
            <a
              href="#access"
              className="rounded-btn bg-mist px-5 py-2.5 font-display text-[13px] font-bold text-ink transition-colors hover:bg-mint"
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="overflow-hidden border-b border-lite-line bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-12 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-onlite-faint">
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-mint-deep" />
              ONE SYSTEM · SIGNAL TO NEXT ACTION
            </div>
            <h1 className="max-w-[760px] font-display text-[52px] font-bold leading-[0.98] tracking-[-0.055em] text-ink sm:text-[72px] lg:text-[86px]">
              Know why now.
              <span className="block text-mint-deep">Then keep it moving.</span>
            </h1>
            <p className="mt-7 max-w-[680px] text-[18px] leading-[1.65] text-onlite-soft sm:text-[20px]">
              OLLIN continuously turns scattered market evidence into ranked, account-ready opportunities—then carries the same intelligence into every touch, follow-up, and outcome.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#access"
                className="rounded-btn bg-ink px-6 py-3.5 font-display text-[14px] font-bold text-paper transition-colors hover:bg-mint-deep hover:text-ink"
              >
                Enter OLLIN →
              </a>
              <a
                href="#intelligence"
                className="rounded-btn border border-lite-soft px-6 py-3.5 font-display text-[14px] font-bold text-ink transition-colors hover:border-ink"
              >
                See how intelligence is built
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-16 -z-0 rounded-full bg-mint-tint blur-3xl" />
            <div className="relative overflow-hidden rounded-panel bg-ink p-6 text-mist shadow-[0_28px_70px_-30px_rgba(10,16,14,.55)] sm:p-8">
              <div className="flex items-start justify-between gap-5 border-b border-muted-line pb-6">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.12em] text-mint">LIVE INTELLIGENCE BRIEF</div>
                  <h2 className="mt-3 font-display text-[27px] font-bold tracking-[-0.025em] text-paper">
                    Prairie Financial
                  </h2>
                  <p className="mt-1 text-[13px] text-onink-soft">Expansion signal · Cybersecurity hiring</p>
                </div>
                <div className="rounded-btn bg-mint px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-ink">
                  92% CONFIDENCE
                </div>
              </div>

              <div className="py-6">
                <div className="font-mono text-[10px] tracking-[0.12em] text-onink-faint">WHY NOW</div>
                <p className="mt-3 text-[16px] leading-[1.6] text-mist">
                  Three newly validated security roles align with an active planning window and a confirmed infrastructure expansion.
                </p>
              </div>

              <div className="overflow-hidden rounded-card bg-raised">
                {proofRows.map(([label, value, state]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[1fr_auto] gap-4 border-b border-muted-line px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <span className="font-mono text-[9px] tracking-[0.08em] text-onink-faint">{label}</span>
                    <span className="hidden text-[12px] text-mist sm:block">{value}</span>
                    <span className="font-mono text-[9px] tracking-[0.08em] text-mint">{state}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-card bg-mist px-5 py-4 text-ink">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.1em] text-onlite-faint">NEXT ACTION</div>
                  <div className="mt-1 font-display text-[14px] font-bold">Review prepared campaign</div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint font-bold">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="bg-night px-5 py-20 text-mist sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 border-b border-muted-line pb-12 lg:grid-cols-[.75fr_1.25fr]">
            <div className="font-mono text-[11px] tracking-[0.14em] text-mint">THE INTELLIGENCE SYSTEM</div>
            <div>
              <h2 className="font-display text-[40px] font-bold leading-[1.06] tracking-[-0.04em] text-paper sm:text-[56px]">
                Evidence in. Prepared movement out.
              </h2>
              <p className="mt-6 max-w-[780px] text-[17px] leading-[1.7] text-onink-soft">
                OLLIN does not stop at finding a company or summarizing a webpage. Its directed engine chain preserves source, date, confidence, and relevance as raw signals become an executable opportunity.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-muted-line md:grid-cols-2 xl:grid-cols-3">
            {intelligenceStages.map((stage) => (
              <article key={stage.number} className="min-h-[230px] bg-ink p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-mint">ENGINE {stage.number}</span>
                  <span className="h-2 w-2 rounded-full bg-mint" />
                </div>
                <h3 className="mt-10 font-display text-[25px] font-bold text-paper">{stage.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-onink-soft">{stage.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 font-mono text-[10px] tracking-[0.1em] text-onink-faint sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-card border border-muted-line px-5 py-4">SOURCE + TIMESTAMP</div>
            <div className="rounded-card border border-muted-line px-5 py-4">RECENCY + CONFIDENCE</div>
            <div className="rounded-card border border-muted-line px-5 py-4">ACCOUNT + CONTACT GRAPH</div>
            <div className="rounded-card border border-muted-line px-5 py-4">OUTCOME + NEXT ACTION</div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2">
          <div className="rounded-panel bg-white p-8 sm:p-12">
            <div className="font-mono text-[10px] tracking-[0.12em] text-onlite-faint">OLLIN INTELLIGENCE</div>
            <h2 className="mt-5 font-display text-[38px] font-bold tracking-[-0.035em] text-ink">Who. Why now. What matters.</h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-onlite-soft">
              Verified signals, hiring evidence, account context, contact paths, action windows, and a ranked recommendation—kept together as one intelligence record.
            </p>
          </div>
          <div className="rounded-panel bg-ink p-8 text-mist sm:p-12">
            <div className="font-mono text-[10px] tracking-[0.12em] text-mint">OLLIN MOVEMENT</div>
            <h2 className="mt-5 font-display text-[38px] font-bold tracking-[-0.035em] text-paper">The right action, already prepared.</h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-onink-soft">
              The verified signal becomes the opening angle. The account brief becomes the strategy. Each outcome updates the shared record and determines what happens next.
            </p>
          </div>
        </div>
      </section>

      <section id="access" className="bg-mist px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] text-onlite-faint">INTELLIGENCE MEETS MOVEMENT</div>
            <h2 className="mt-5 font-display text-[46px] font-bold leading-[1.03] tracking-[-0.045em] text-ink sm:text-[58px]">
              Start with the strongest signal.
            </h2>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.7] text-onlite-soft">
              Open OLLIN and your prepared queue, account context, and next actions are waiting in one system.
            </p>
          </div>

          <div className="rounded-panel bg-ink p-7 text-mist shadow-[0_24px_60px_-30px_rgba(10,16,14,.5)] sm:p-10">
            <div className="mb-2 font-mono text-[11px] tracking-[0.1em] text-mint">
              {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
            </div>
            <h3 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-paper">
              {mode === "signin" ? "Your queue is waiting." : "Let's set you up."}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-onink-soft">
              {mode === "signin"
                ? "Sign in with your email and password."
                : "Create your account and enter the system."}
            </p>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
              {mode === "signup" && (
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your first name"
                  autoComplete="given-name"
                  className="w-full rounded-[14px] border-[1.5px] border-muted-line bg-raised px-4 py-[13px] text-[16px] text-mist placeholder:text-onink-faint"
                />
              )}
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                className="w-full rounded-[14px] border-[1.5px] border-muted-line bg-raised px-4 py-[13px] text-[16px] text-mist placeholder:text-onink-faint"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={mode === "signup" ? "Create a password (8+ characters)" : "Your password"}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className="w-full rounded-[14px] border-[1.5px] border-muted-line bg-raised px-4 py-[13px] text-[16px] text-mist placeholder:text-onink-faint"
              />

              {error && <div className="rounded-[14px] bg-alert-tint px-3 py-2 text-[13px] text-alert">{error}</div>}

              <button
                type="submit"
                disabled={busy}
                className="mt-1 w-full rounded-btn border-none bg-mint px-6 py-[13px] font-display text-[15px] font-bold text-ink transition-colors hover:bg-mint-deep disabled:opacity-50"
              >
                {busy
                  ? mode === "signin"
                    ? "Signing in…"
                    : "Creating account…"
                  : mode === "signin"
                    ? "Sign in →"
                    : "Create account →"}
              </button>
            </form>

            <div className="mt-5 text-[13px] text-muted-fog">
              {mode === "signin" ? (
                <>
                  New here?{" "}
                  <button onClick={() => switchMode("signup")} className="font-semibold text-mint">
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => switchMode("signin")} className="font-semibold text-mint">
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-night px-5 py-8 text-mist sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-muted-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <OllinMark size={26} />
            <span className="font-display text-[16px] font-bold tracking-[0.04em] text-paper">OLLIN</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.11em] text-onink-faint">
            DISCOVER → VERIFY → UNDERSTAND → PREPARE → MOVE → CONVERT
          </p>
        </div>
      </footer>
    </main>
  );
}

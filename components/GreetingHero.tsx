import Link from "next/link";
import LiveDate from "@/components/LiveDate";
import { ArrowIcon } from "@/components/icons";

// The "Morning, {name}" brief — a personalized, dark hero card that opens the
// Today dashboard. Live date/time eyebrow, a one-line rundown of the overnight
// run, and the single obvious next move. Dark card floating on the white
// workspace with the same soft drop shadow as every other card.
export default function GreetingHero({
  name,
  demo,
  total,
  touchesDue,
  leftover,
  ctaHref,
}: {
  name: string;
  demo: boolean;
  total: number;
  touchesDue: number;
  leftover: number;
  ctaHref: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-card bg-ink px-8 py-9">
      {/* Soft mint glow, top-right — the one bit of warmth on the dark card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.16),transparent_70%)]"
      />
      <div className="relative">
        <div className="font-mono text-[11px] tracking-[0.16em] text-mint">
          <LiveDate />
        </div>

        <h1 className="mt-3 font-display text-[34px] font-bold leading-[1.08] tracking-[-0.01em] text-paper">
          Morning, {name}.{demo ? " Ready to move?" : ""}
        </h1>

        <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-onink-soft">
          {demo ? (
            <>
              Quick rundown: <b className="font-semibold text-paper">{total} accounts</b> ready and{" "}
              <b className="font-semibold text-paper">{touchesDue} touches</b> due today
              {leftover > 0 ? (
                <>
                  , plus <b className="font-semibold text-paper">{leftover}</b> left over from yesterday
                </>
              ) : null}
              . Start at the top. Remember — we got you.
            </>
          ) : (
            <>
              Your queue is clear. When Intelligence prepares an opportunity, Movement will hold the account —{" "}
              <b className="font-semibold text-paper">signal, offering, contacts, campaign</b>. You never
              decide where to begin.
            </>
          )}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-btn bg-mint px-6 py-[13px] font-display text-[15px] font-bold text-ink transition-colors hover:bg-mint-deep"
          >
            {demo ? "Start moving" : "Open Movement"}
            <ArrowIcon size={16} />
          </Link>
          {demo && (
            <span className="font-mono text-[11px] tracking-[0.06em] text-onink-faint">
              SIGNALS VERIFIED · 2+ SOURCES EACH
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Talent } from "@/lib/today";

// Bench-ready candidates rolling off assignments, matched to open reqs. Links
// out to the Redeploy engine. Availability is mint when ready now, coral when
// still rolling off. A browse-and-place surface, so it's white/Action rather
// than dark ink.
export default function TalentShowcaseCard({ talent }: { talent: Talent[] }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-lite-line bg-white p-6 shadow-[0_14px_35px_-28px_rgba(10,16,14,.4)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.16),transparent_70%)]"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-[17px] font-semibold text-onlite">Talent showcase</span>
          <Link
            href="/redeploy"
            className="font-mono text-[11px] text-onlite-faint underline underline-offset-2 transition-colors hover:text-mint-deep"
          >
            REDEPLOY →
          </Link>
        </div>
        <p className="mt-2 text-[13px] text-onlite-fog">
          Talent for this week — bench-ready candidates rolling off assignments, matched to open reqs.
        </p>
        <div className="mt-4 flex flex-col gap-[10px]">
          {talent.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between border-b border-lite-line pb-[10px] last:border-0 last:pb-0"
            >
              <div>
                <div className="text-[13.5px] font-semibold text-onlite">{t.name}</div>
                <div className="text-[12px] text-onlite-fog">{t.role}</div>
              </div>
              <span
                className={`font-mono text-[10px] tracking-[0.06em] ${t.rollingOff ? "text-alert" : "text-mint-deep"}`}
              >
                {t.availability}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { WEEK_BARS, WEEK_MAX, CLIENTS_THIS_WEEK, CLIENTS_LAST_WEEK } from "@/lib/today";

// New clients pulled week-over-week — a 7-day two-bar chart (last week muted,
// this week mint) with the running total and delta. Dark card on the white
// workspace.
export default function NewClientsGraph() {
  const delta = CLIENTS_THIS_WEEK - CLIENTS_LAST_WEEK;
  const deltaLabel = `${delta >= 0 ? "+" : ""}${delta}`;
  const h = (v: number) => `${Math.max(4, (v / WEEK_MAX) * 100)}%`;

  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.14),transparent_70%)]"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <Link
            href="/accounts"
            className="font-display text-[17px] font-semibold text-paper underline decoration-onink-faint/60 underline-offset-[3px] transition-colors hover:text-mint hover:decoration-mint"
          >
            New clients pulled by OLLIN OS
          </Link>
          <span className="font-mono text-[11px] text-onink-faint">THIS WEEK VS. LAST WEEK</span>
        </div>

        <div className="mt-2 flex items-baseline gap-[10px]">
          <span className="font-display text-[38px] font-bold text-paper">{CLIENTS_THIS_WEEK}</span>
          <span className="text-[13px] font-semibold text-mint">{deltaLabel}</span>
          <span className="text-[13px] text-onink-fog">vs {CLIENTS_LAST_WEEK} last week</span>
        </div>

        <div className="mt-6 grid h-[140px] grid-cols-7 items-end gap-3">
          {WEEK_BARS.map((d) => (
            <div key={d.label} className="flex h-full flex-col items-center justify-end gap-[6px]">
              <div className="flex h-full items-end gap-[3px]">
                <div
                  title={`Last week: ${d.lastVal}`}
                  className="w-[9px] rounded-[3px] bg-[rgba(227,233,231,0.18)]"
                  style={{ height: h(d.lastVal) }}
                />
                <div
                  title={`This week: ${d.thisVal}`}
                  className={`w-[9px] rounded-[3px] ${d.highlight ? "bg-mint" : "bg-mint-deep"}`}
                  style={{ height: h(d.thisVal) }}
                />
              </div>
              <span className="font-mono text-[9px] tracking-[0.06em] text-onink-faint">{d.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 font-mono text-[10px] tracking-[0.06em] text-onink-faint">
          <span className="flex items-center gap-[6px]">
            <span className="h-2 w-2 rounded-[2px] bg-[rgba(227,233,231,0.18)]" />
            LAST WEEK
          </span>
          <span className="flex items-center gap-[6px]">
            <span className="h-2 w-2 rounded-[2px] bg-mint" />
            THIS WEEK
          </span>
        </div>
      </div>
    </div>
  );
}

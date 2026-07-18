import EmptyState from "@/components/EmptyState";
import { isDemo } from "@/lib/demo";
import { HUNT_FEED } from "@/lib/ollin";

export default function HuntPage() {
  const demo = isDemo();
  const feed = demo ? HUNT_FEED : [];

  return (
    <div className="flex flex-col gap-4 px-[34px] py-8">
      {feed.length === 0 ? (
        <EmptyState
          title="No new signals yet"
          sub="OLLIN Intelligence scans for verified buying signals in your segments and ranks what's worth pursuing."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {feed.map((h) => (
            <div key={h.company} className="flex flex-col rounded-card bg-lite p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-[18px] font-bold text-onlite">{h.company}</div>
                  <div className="mt-[2px] text-[12px] text-onlite-fog">{h.industry} · {h.location}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-btn bg-lite-raised px-3 py-[4px] font-mono text-[10px] text-onlite-fog">
                    URGENCY {h.urgency}/10
                  </span>
                  <span className="font-mono text-[10px] text-onlite-faint">{h.window.toUpperCase()}</span>
                </div>
              </div>
              <div className="mt-4 border-t border-lite-line pt-4">
                <div className="font-mono text-[10px] tracking-[0.08em] text-onlite-faint">
                  {h.durability} · {h.pillar.toUpperCase()}
                </div>
                <p className="mt-1 text-[14px] font-semibold leading-[1.5] text-onlite">{h.signal}</p>
                <p className="mt-2 text-[13px] text-onlite-fog">
                  Emphasize: <span className="text-onlite-soft">{h.offering}</span>
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <button className="rounded-btn bg-mint px-4 py-[9px] font-display text-[12.5px] font-bold text-ink transition-colors hover:bg-mint-deep">
                  Build the brief
                </button>
                <button className="rounded-btn bg-lite-raised px-4 py-[9px] font-display text-[12.5px] font-semibold text-onlite-soft transition-colors hover:bg-lite-soft">
                  Watch
                </button>
                <button className="ml-auto font-mono text-[11px] text-onlite-faint transition-colors hover:text-onlite">
                  DISMISS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

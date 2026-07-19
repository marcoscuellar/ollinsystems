import EmptyState from "@/components/EmptyState";
import { isDemo } from "@/lib/demo";
import { HUNT_FEED } from "@/lib/ollin";

export default function HuntPage() {
  const demo = isDemo();
  const feed = demo ? HUNT_FEED : [];

  return (
    <div className="flex flex-col gap-4 px-[56px] py-8">
      {feed.length === 0 ? (
        <EmptyState
          title="No new signals yet"
          sub="OLLIN Intelligence scans for verified buying signals in your segments and ranks what's worth pursuing."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {feed.map((h) => (
            <div key={h.company} className="flex flex-col rounded-card bg-ink p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-[18px] font-bold text-paper">{h.company}</div>
                  <div className="mt-[2px] text-[12px] text-muted-fog">{h.industry} · {h.location}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-btn bg-mist/10 px-3 py-[4px] font-mono text-[10px] text-mist">
                    URGENCY {h.urgency}/10
                  </span>
                  <span className="font-mono text-[10px] text-onink-faint">{h.window.toUpperCase()}</span>
                </div>
              </div>
              <div className="mt-4 border-t border-muted-line pt-4">
                <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">
                  {h.durability} · {h.pillar.toUpperCase()}
                </div>
                <p className="mt-1 text-[14px] font-semibold leading-[1.5] text-mist">{h.signal}</p>
                <p className="mt-2 text-[13px] text-muted-fog">
                  Emphasize: <span className="text-onink-soft">{h.offering}</span>
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <button className="rounded-btn bg-mint px-4 py-[9px] font-display text-[12.5px] font-bold text-ink transition-colors hover:bg-mint-deep">
                  Build the brief
                </button>
                <button className="rounded-btn bg-mist/10 px-4 py-[9px] font-display text-[12.5px] font-semibold text-mist transition-colors hover:bg-mist/20">
                  Watch
                </button>
                <button className="ml-auto font-mono text-[11px] text-onink-faint transition-colors hover:text-mist">
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

import type { FeedItem } from "@/lib/today";

// A small labeled feed — used for both "Local Intel" (news-style signals) and
// "Updates from Team" (internal messages). Each row: body + "source · when".
export default function FeedCard({ label, items }: { label: string; items: FeedItem[] }) {
  return (
    <div className="rounded-card bg-ink p-6">
      <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">{label}</div>
      <div className="mt-3 flex flex-col gap-3">
        {items.map((it, i) => (
          <div key={i} className="border-b border-muted-line pb-3 last:border-0 last:pb-0">
            <div className="text-[13.5px] leading-[1.5] text-onink-soft">{it.body}</div>
            <div className="mt-[6px] font-mono text-[10px] tracking-[0.06em] text-onink-faint">
              {it.from} · {it.when}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

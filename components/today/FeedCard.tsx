import type { FeedItem } from "@/lib/today";

// A small labeled feed — used for both "Local Intel" (news-style signals,
// genuinely prepared by Intelligence — stays dark) and "Updates from Team"
// (internal messages, not Intelligence — set dark={false} for the white/Action
// surface). Each row: body + "source · when".
export default function FeedCard({
  label,
  items,
  dark = true,
}: {
  label: string;
  items: FeedItem[];
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "rounded-card bg-ink p-6"
          : "rounded-card border border-lite-line bg-white p-6 shadow-[0_14px_35px_-28px_rgba(10,16,14,.4)]"
      }
    >
      <div className={`font-mono text-[10px] tracking-[0.08em] ${dark ? "text-onink-faint" : "text-onlite-faint"}`}>
        {label}
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className={`border-b pb-3 last:border-0 last:pb-0 ${dark ? "border-muted-line" : "border-lite-line"}`}
          >
            <div className={`text-[13.5px] leading-[1.5] ${dark ? "text-onink-soft" : "text-onlite-soft"}`}>
              {it.body}
            </div>
            <div
              className={`mt-[6px] font-mono text-[10px] tracking-[0.06em] ${dark ? "text-onink-faint" : "text-onlite-faint"}`}
            >
              {it.from} · {it.when}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

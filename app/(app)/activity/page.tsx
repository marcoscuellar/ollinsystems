import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { isDemo } from "@/lib/demo";
import { ACTIVITY } from "@/lib/ollin";

const KIND_STYLE: Record<string, string> = {
  Reply: "bg-mint text-ink",
  CRM: "bg-mist/15 text-mist",
  Email: "bg-mist/10 text-mist",
  LinkedIn: "bg-mist/10 text-mist",
  Call: "bg-mist/10 text-mist",
  Note: "bg-mist/10 text-muted-fog",
};

export default async function ActivityPage() {
  const demo = await isDemo();
  const items = demo ? ACTIVITY : [];

  return (
    <div className="flex flex-col gap-4 px-16 xl:px-32 py-8">
      {items.length === 0 ? (
        <EmptyState title="No activity yet" sub="Every message, call, note, reply, and CRM update lands here — one thread." />
      ) : (
        <div className="overflow-hidden rounded-card bg-ink">
          {items.map((it, i) => (
            <div key={i} className="flex items-start gap-4 border-b border-muted-line px-6 py-4 last:border-0">
              <span className="w-[110px] flex-none pt-[2px] font-mono text-[10px] text-onink-faint">
                {it.when.toUpperCase()}
              </span>
              <span className={`flex-none rounded-btn px-3 py-[4px] font-mono text-[10px] ${KIND_STYLE[it.kind]}`}>
                {it.kind.toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                {it.accountId ? (
                  <Link href={`/accounts/${it.accountId}`} className="font-display text-[13.5px] font-bold text-paper hover:text-mint">
                    {it.account}
                  </Link>
                ) : (
                  <span className="font-display text-[13.5px] font-bold text-paper">{it.account}</span>
                )}
                <p className="mt-[2px] text-[13.5px] leading-[1.55] text-onink-soft">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

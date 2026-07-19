import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { ArrowIcon } from "@/components/icons";
import { isDemo } from "@/lib/demo";
import { ACCOUNTS } from "@/lib/ollin";

export default function AccountsPage() {
  const demo = isDemo();
  const accounts = demo ? ACCOUNTS : [];

  return (
    <div className="flex flex-col gap-4 px-[56px] py-8">
      {accounts.length === 0 ? (
        <EmptyState
          title="No accounts yet"
          sub="Accounts arrive from Hunt with the brief already written."
          cta={{ href: "/hunt", label: "Open Hunt →" }}
        />
      ) : (
        <div className="overflow-hidden rounded-card bg-ink">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_auto] gap-4 border-b border-muted-line px-6 py-3 font-mono text-[10px] tracking-[0.08em] text-onink-faint">
            <span>ACCOUNT</span>
            <span>PRIMARY SIGNAL</span>
            <span>EMPHASIZE</span>
            <span>STATUS</span>
            <span />
          </div>
          {accounts.map((a) => (
            <Link
              key={a.id}
              href={`/accounts/${a.id}`}
              className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_auto] items-center gap-4 border-b border-muted-line px-6 py-4 transition-colors last:border-0 hover:bg-raised"
            >
              <div>
                <div className="font-display text-[15px] font-bold text-paper">{a.name}</div>
                <div className="text-[12px] text-muted-fog">{a.industry} · {a.location}</div>
              </div>
              <div className="truncate text-[13px] text-onink-soft">{a.primarySignal}</div>
              <div className="truncate text-[13px] text-onink-soft">{a.offering.primary}</div>
              <span className="font-mono text-[10px] text-muted-fog">{a.status.toUpperCase()}</span>
              <ArrowIcon size={15} className="text-mint" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { ArrowIcon } from "@/components/icons";
import { isDemo } from "@/lib/demo";
import { ACCOUNTS } from "@/lib/ollin";

const ORDER = ["Awaiting review", "Active", "Draft", "Approved", "Paused", "Completed"] as const;

export default function CampaignsPage() {
  const demo = isDemo();
  const accounts = demo ? ACCOUNTS : [];

  return (
    <div className="flex flex-col gap-6 px-[34px] py-8">
      {accounts.length === 0 ? (
        <EmptyState
          title="No campaigns yet"
          sub="Campaigns are prepared inside each account brief, then run from here."
          cta={{ href: "/hunt", label: "Open Hunt →" }}
        />
      ) : (
        ORDER.map((group) => {
          const rows = accounts.filter((a) => a.campaign.approval === group);
          if (rows.length === 0) return null;
          return (
            <div key={group}>
              <div className="mb-3 px-1 font-mono text-[11px] tracking-[0.08em] text-onlite-faint">
                {group.toUpperCase()} · {rows.length}
              </div>
              <div className="flex flex-col gap-3">
                {rows.map((a) => {
                  const done = a.campaign.touches.filter((t) => t.status === "Done").length;
                  const total = a.campaign.touches.length;
                  return (
                    <Link
                      key={a.id}
                      href={`/accounts/${a.id}`}
                      className="group flex items-center gap-5 rounded-card bg-lite p-5 transition-colors hover:bg-lite-raised"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-[16px] font-bold text-onlite">{a.name}</div>
                        <div className="mt-[2px] truncate text-[13px] text-onlite-fog">{a.campaign.observation}</div>
                      </div>
                      <div className="flex w-[180px] flex-none flex-col gap-[6px]">
                        <div className="flex justify-between font-mono text-[10px] text-onlite-faint">
                          <span>TOUCHES</span>
                          <span>{done}/{total}</span>
                        </div>
                        <div className="h-[6px] overflow-hidden rounded-full bg-[rgba(10,16,14,0.08)]">
                          <div className="h-full rounded-full bg-mint" style={{ width: `${(done / total) * 100}%` }} />
                        </div>
                      </div>
                      <ArrowIcon size={16} className="flex-none text-mint" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

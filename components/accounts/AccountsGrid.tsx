"use client";

import Link from "next/link";
import { useState } from "react";
import { ACCOUNT_CARDS, type AccountCard, type AccountStatus } from "@/lib/accountsGrid";

const STATUS_STYLE: Record<AccountStatus, string> = {
  ACTIVE: "bg-mint text-ink",
  "NEEDS ATTENTION": "bg-alert/15 text-alert",
  NURTURE: "bg-mist/15 text-mist",
};

// Equal-size dark cards in a 3-col grid; each expands in place (spanning 2
// columns) to reveal a white intel panel. Fixed min-height + line-clamp keep
// collapsed cards the same size regardless of copy length.
export default function AccountsGrid() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <div className="grid grid-cols-3 items-start gap-4">
      {ACCOUNT_CARDS.map((acc) => (
        <AccountGridCard key={acc.id} acc={acc} open={Boolean(open[acc.id])} onToggle={() => toggle(acc.id)} />
      ))}
    </div>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-[10px] tracking-[0.08em] text-[rgba(10,16,14,0.45)] ${className}`}>
      {children}
    </div>
  );
}

function AccountGridCard({ acc, open, onToggle }: { acc: AccountCard; open: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-card bg-ink ${open ? "col-span-2" : "col-span-1"}`}>
      <button
        onClick={onToggle}
        className="flex min-h-[170px] w-full cursor-pointer flex-col p-[22px] text-left"
      >
        <div className="flex items-start justify-between gap-[10px]">
          <div className={`font-display font-bold text-paper ${open ? "text-[24px]" : "text-[18px]"}`}>
            {acc.name}
          </div>
          <span
            className="mt-[3px] flex-none text-onink-faint transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        <span
          className={`mt-[10px] self-start rounded-btn px-3 py-[5px] font-mono text-[10px] uppercase tracking-[0.06em] ${STATUS_STYLE[acc.status]}`}
        >
          {acc.status}
        </span>
        <div className="mt-[14px] line-clamp-3 text-[13.5px] leading-[1.5] text-onink-soft">{acc.lastConvo}</div>
      </button>

      {open && (
        <div className="grid grid-cols-[1.3fr_1fr] gap-7 bg-white px-[22px] pb-[26px] pt-5">
          {/* Left — company intel, signals, news */}
          <div>
            <Label className="mb-3">COMPANY INTEL</Label>
            <div className="grid grid-cols-2 gap-x-3 gap-y-[10px]">
              {[
                ["INDUSTRY", acc.industry],
                ["HQ", acc.hq],
                ["EMPLOYEES", acc.size],
                ["REVENUE EST.", acc.revenue],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[12px] bg-[rgba(63,191,127,0.12)] px-3 py-[10px]">
                  <div className="text-[11px] text-[#2E9A63]">{k}</div>
                  <div className="mt-[2px] text-[13.5px] font-semibold text-ink">{v}</div>
                </div>
              ))}
            </div>

            <Label className="mb-[10px] mt-5">SIGNALS WE&rsquo;RE CHASING</Label>
            {acc.signals.map((s) => (
              <div key={s} className="flex items-start gap-2 py-[5px] text-[13px] leading-[1.5] text-[rgba(10,16,14,0.78)]">
                <span className="mt-[6px] h-[6px] w-[6px] flex-none rounded-full bg-mint-deep" />
                {s}
              </div>
            ))}

            <Label className="mb-[10px] mt-5">RECENT NEWS</Label>
            {acc.news.map((n) => (
              <div key={n.headline} className="py-[6px] text-[13px] leading-[1.5] text-[rgba(10,16,14,0.78)]">
                {n.headline} <span className="font-mono text-[10px] text-[rgba(10,16,14,0.45)]">· {n.source}</span>
              </div>
            ))}
          </div>

          {/* Right — contacts, stack, activity link */}
          <div>
            <Label className="mb-3">LAST CONTACTS TOUCHED</Label>
            {acc.contacts.map((c) => (
              <div key={c.name} className="flex items-center justify-between border-b border-[rgba(10,16,14,0.08)] py-2">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">{c.name}</div>
                  <div className="text-[12px] text-[rgba(10,16,14,0.55)]">{c.role}</div>
                </div>
                <span className="font-mono text-[10px] text-[rgba(10,16,14,0.45)]">{c.when}</span>
              </div>
            ))}

            <Label className="mb-[10px] mt-5">TECH / OPS STACK</Label>
            <div className="flex flex-wrap gap-[6px]">
              {acc.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-btn bg-[rgba(10,16,14,0.06)] px-[10px] py-[5px] font-mono text-[10px] tracking-[0.04em] text-[rgba(10,16,14,0.72)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              href="/activity"
              className="mt-5 inline-block font-mono text-[11px] tracking-[0.06em] text-[rgba(10,16,14,0.55)] underline underline-offset-2 transition-colors hover:text-mint-deep"
            >
              For more intel on activity, go to Activity Log →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ACCOUNTS, type Account, type Signal, type Urgency } from "@/lib/ollin";
import { CheckIcon, LinkOutIcon, SearchIcon } from "@/components/icons";

const URGENCY_STYLE: Record<Urgency, string> = {
  High: "bg-alert/15 text-alert",
  Medium: "bg-mist/15 text-mist",
  Low: "bg-[rgba(10,16,14,0.08)] text-[rgba(10,16,14,0.55)]",
};

function matches(a: Account, query: string) {
  if (!query) return true;
  const needle = query.toLowerCase();
  const haystack = [
    a.name,
    a.industry,
    a.location,
    a.primarySignal,
    a.status,
    ...a.contacts.flatMap((c) => [c.name, c.title]),
    ...a.signals.flatMap((s) => [s.title, s.category]),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

// Accounts — the single blended view of Pipeline + Accounts. One search bar,
// one card per company, each pulling its intel straight from the same
// Intelligence records the account brief reads from. Cards expand in place
// (spanning 2 columns) to reveal the white intel panel.
export default function AccountsGrid() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const results = useMemo(() => ACCOUNTS.filter((a) => matches(a, query)), [query]);
  const totalContacts = useMemo(() => ACCOUNTS.reduce((n, a) => n + a.contacts.length, 0), []);
  const resultContacts = useMemo(() => results.reduce((n, a) => n + a.contacts.length, 0), [results]);

  return (
    <div className="flex flex-col gap-4">
      {/* Counters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-[rgba(10,16,14,0.55)]">
        <span>
          <span className="font-semibold text-onlite">{results.length}</span> OF {ACCOUNTS.length} COMPANIES
        </span>
        <span>
          <span className="font-semibold text-onlite">{resultContacts}</span> OF {totalContacts} CONTACTS
        </span>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(10,16,14,0.4)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company, title, signal, or region…"
            className="w-full rounded-btn border border-[rgba(10,16,14,0.15)] bg-lite py-[11px] pl-11 pr-4 font-display text-[13.5px] text-onlite placeholder:text-[rgba(10,16,14,0.4)] focus:border-mint-deep focus:outline-none"
          />
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-[rgba(10,16,14,0.15)] bg-lite px-6 py-14 text-center">
          <div className="font-display text-[15px] font-semibold text-onlite">No matches</div>
          <p className="mt-2 max-w-[44ch] text-[13.5px] leading-[1.5] text-onlite-fog">
            Try a different company, title, signal, or region.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 items-start gap-4">
          {results.map((acc) => (
            <AccountGridCard key={acc.id} acc={acc} open={Boolean(open[acc.id])} onToggle={() => toggle(acc.id)} />
          ))}
        </div>
      )}
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

function AuditStamp({ s }: { s: Signal }) {
  const style =
    s.audit === "Verified"
      ? "bg-mint/15 text-mint-deep"
      : s.audit === "Partial"
        ? "bg-[rgba(10,16,14,0.08)] text-[rgba(10,16,14,0.6)]"
        : "bg-alert/15 text-alert";
  return (
    <span className={`whitespace-nowrap rounded-btn px-[8px] py-[2px] font-mono text-[9px] tracking-[0.06em] ${style}`}>
      {s.audit.toUpperCase()}
    </span>
  );
}

function AccountGridCard({ acc, open, onToggle }: { acc: Account; open: boolean; onToggle: () => void }) {
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
        <div className="mt-[10px] flex flex-wrap items-center gap-[8px]">
          <span
            className={`rounded-btn px-3 py-[5px] font-mono text-[10px] uppercase tracking-[0.06em] ${URGENCY_STYLE[acc.urgency]}`}
          >
            {acc.status}
          </span>
          <span className="font-mono text-[10px] tracking-[0.06em] text-onink-faint">
            {acc.industry.toUpperCase()} · {acc.location.toUpperCase()}
          </span>
        </div>
        <div className="mt-[12px] line-clamp-2 text-[13.5px] font-semibold leading-[1.5] text-mist">
          {acc.primarySignal}
        </div>
        <div className="mt-1 line-clamp-2 text-[13px] leading-[1.5] text-onink-soft">{acc.whoTheyAre}</div>
      </button>

      {open && (
        <div className="grid grid-cols-[1.3fr_1fr] gap-7 bg-white px-[22px] pb-[26px] pt-5">
          {/* Left — signals + open roles, straight from Intelligence */}
          <div>
            <Label className="mb-3">COMPANY INTEL</Label>
            <div className="grid grid-cols-2 gap-x-3 gap-y-[10px]">
              {[
                ["INDUSTRY", acc.industry],
                ["HQ", acc.location],
                ["SIZE", acc.size],
                ["STATUS", acc.status],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[12px] bg-[rgba(63,191,127,0.12)] px-3 py-[10px]">
                  <div className="text-[11px] text-[#2E9A63]">{k}</div>
                  <div className="mt-[2px] text-[13.5px] font-semibold text-ink">{v}</div>
                </div>
              ))}
            </div>

            <Label className="mb-[10px] mt-5">WHY NOW · SIGNALS</Label>
            <div className="flex flex-col gap-3">
              {acc.signals.map((s) => (
                <div key={s.title} className="border-b border-[rgba(10,16,14,0.08)] pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-[13px] font-semibold text-ink">{s.title}</div>
                    <AuditStamp s={s} />
                  </div>
                  <div className="mt-[3px] font-mono text-[9.5px] tracking-[0.05em] text-[rgba(10,16,14,0.45)]">
                    {s.durability} · {s.category.toUpperCase()} · {s.date.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {acc.openRoles.length > 0 && (
              <>
                <Label className="mb-[10px] mt-5">OPEN ROLES · EVIDENCE OF DEMAND</Label>
                <div className="flex flex-col">
                  {acc.openRoles.map((r) => (
                    <div key={r.title} className="flex items-center justify-between border-b border-[rgba(10,16,14,0.08)] py-[8px] last:border-0">
                      <div>
                        <div className="text-[13px] font-semibold text-ink">{r.title}</div>
                        <div className="text-[11.5px] text-[rgba(10,16,14,0.55)]">{r.location} · {r.daysOpen} days open</div>
                      </div>
                      {r.verified && (
                        <span className="flex items-center gap-1 font-mono text-[9px] text-mint-deep">
                          <CheckIcon size={11} /> VERIFIED
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right — contacts, next action, link out to the full brief */}
          <div>
            <Label className="mb-3">WHO TO CONTACT</Label>
            {acc.contacts.map((c) => (
              <div key={c.name} className="border-b border-[rgba(10,16,14,0.08)] py-2 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-semibold text-ink">{c.name}</span>
                  <span className="rounded-btn bg-[rgba(10,16,14,0.06)] px-2 py-[3px] font-mono text-[9px] text-[rgba(10,16,14,0.6)]">
                    {c.persona.toUpperCase()}
                  </span>
                </div>
                <div className="text-[12px] text-[rgba(10,16,14,0.55)]">{c.title}</div>
              </div>
            ))}

            <div className="mt-5 rounded-[16px] bg-[rgba(63,191,127,0.12)] p-4">
              <div className="text-[11px] text-[#2E9A63]">NEXT ACTION</div>
              <div className="mt-1 text-[13.5px] font-semibold text-ink">{acc.nextAction}</div>
            </div>

            <Link
              href={`/accounts/${acc.id}`}
              className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.06em] text-[rgba(10,16,14,0.55)] underline underline-offset-2 transition-colors hover:text-mint-deep"
            >
              Open full intelligence brief <LinkOutIcon size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

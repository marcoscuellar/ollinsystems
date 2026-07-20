"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import type { DeckItem } from "@/lib/today";

// "On Deck Today" — the one interactive surface on the dashboard. Check an item
// to strike it through (local state only for now; no persistence layer yet).
// Each label links out to where the work actually happens. It's a to-do
// checklist — Action, not Intelligence — so it lives on white, not dark ink.
export default function OnDeckChecklist({ items }: { items: DeckItem[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <div className="relative overflow-hidden rounded-card border border-lite-line bg-white p-6 shadow-[0_14px_35px_-28px_rgba(10,16,14,.4)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.16),transparent_70%)]"
      />
      <div className="relative">
        <div className="font-mono text-[10px] tracking-[0.08em] text-onlite-faint">ON DECK TODAY</div>
        <ul className="mt-3 flex flex-col gap-[10px]">
          {items.map((it) => {
            const isDone = Boolean(done[it.id]);
            return (
              <li key={it.id} className="flex items-baseline gap-[9px] text-[13.5px] leading-[1.5]">
                <button
                  onClick={() => toggle(it.id)}
                  title="Mark done"
                  aria-pressed={isDone}
                  className={`mt-[2px] flex h-[15px] w-[15px] flex-none items-center justify-center rounded-[4px] border-[1.5px] transition-colors ${
                    isDone ? "border-mint bg-mint text-ink" : "border-lite-soft bg-transparent"
                  }`}
                >
                  {isDone && <CheckIcon size={9} />}
                </button>
                <Link
                  href={it.href}
                  className={`underline decoration-lite-soft underline-offset-2 transition-colors hover:text-mint-deep ${
                    isDone ? "text-onlite-faint line-through decoration-lite-soft" : "text-onlite-soft"
                  }`}
                  dangerouslySetInnerHTML={{ __html: it.html }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

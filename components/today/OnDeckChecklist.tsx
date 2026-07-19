"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import type { DeckItem } from "@/lib/today";

// "On Deck Today" — the one interactive surface on the dashboard. Check an item
// to strike it through (local state only for now; no persistence layer yet).
// Each label links out to where the work actually happens.
export default function OnDeckChecklist({ items }: { items: DeckItem[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.14),transparent_70%)]"
      />
      <div className="relative">
        <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">ON DECK TODAY</div>
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
                    isDone ? "border-mint bg-mint text-ink" : "border-onink-faint bg-transparent"
                  }`}
                >
                  {isDone && <CheckIcon size={9} />}
                </button>
                <Link
                  href={it.href}
                  className={`underline decoration-onink-faint/50 underline-offset-2 transition-colors hover:text-mint ${
                    isDone ? "text-onink-faint line-through decoration-onink-faint/40" : "text-onink-soft"
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

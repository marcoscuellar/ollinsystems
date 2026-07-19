"use client";

import { useState } from "react";
import { LEADS, type Lead, type LeadSource } from "@/lib/pipeline";

const SOURCE_STYLE: Record<LeadSource, string> = {
  "ENGINE-SOURCED": "bg-mint/15 text-mint-deep",
  "MANUAL UPLOAD": "bg-[rgba(10,16,14,0.08)] text-[rgba(10,16,14,0.65)]",
};

const Check = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 12.5 10 18 19.5 7" />
  </svg>
);

// The master lead list: select-all / bulk-delete / per-row remove, with each
// card expandable to its buying signals. White cards on the workspace.
export default function PipelineList() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [removed, setRemoved] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const visible = LEADS.filter((l) => !removed[l.id]);
  const selectedIds = visible.filter((l) => selected[l.id]);
  const allSelected = visible.length > 0 && selectedIds.length === visible.length;

  const toggleSelect = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const toggleOpen = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const remove = (id: string) => setRemoved((r) => ({ ...r, [id]: true }));
  const toggleSelectAll = () => {
    if (allSelected) return setSelected({});
    const next: Record<string, boolean> = {};
    visible.forEach((l) => (next[l.id] = true));
    setSelected(next);
  };
  const bulkDelete = () => {
    setRemoved((r) => {
      const next = { ...r };
      selectedIds.forEach((l) => (next[l.id] = true));
      return next;
    });
    setSelected({});
  };

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 rounded-btn border border-[rgba(10,16,14,0.2)] px-[14px] py-[9px] font-display text-[13px] font-semibold text-onlite"
          >
            <span
              className="flex h-[14px] w-[14px] items-center justify-center rounded-[4px] border-[1.5px] border-ink"
              style={{ background: allSelected ? "#0A100E" : "transparent" }}
            >
              {allSelected && <Check size={9} />}
            </span>
            Select all
          </button>
          <span className="font-mono text-[11px] tracking-[0.06em] text-[rgba(10,16,14,0.45)]">
            {visible.length} CONTACTS
          </span>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={bulkDelete}
              className="rounded-btn border border-alert px-4 py-[9px] font-display text-[13px] font-semibold text-alert"
            >
              Delete {selectedIds.length} selected
            </button>
          )}
          <button className="rounded-btn bg-ink px-4 py-[9px] font-display text-[13px] font-semibold text-paper transition-colors hover:bg-raised">
            Upload list
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 items-start gap-4">
        {visible.map((l) => (
          <LeadCard
            key={l.id}
            l={l}
            open={Boolean(open[l.id])}
            selected={Boolean(selected[l.id])}
            onToggleOpen={() => toggleOpen(l.id)}
            onToggleSelect={() => toggleSelect(l.id)}
            onRemove={() => remove(l.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LeadCard({
  l,
  open,
  selected,
  onToggleOpen,
  onToggleSelect,
  onRemove,
}: {
  l: Lead;
  open: boolean;
  selected: boolean;
  onToggleOpen: () => void;
  onToggleSelect: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] bg-lite shadow-[0_4px_12px_rgba(10,60,32,0.14),0_24px_48px_-20px_rgba(10,60,32,0.35)]">
      <button onClick={onToggleOpen} className="relative block w-full cursor-pointer p-[20px_22px] text-left">
        <span
          className={`absolute right-[22px] top-[20px] whitespace-nowrap rounded-btn px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.06em] ${SOURCE_STYLE[l.source]}`}
        >
          {l.stage}
        </span>
        <div className="flex items-start gap-3 pr-[110px]">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-display text-[17px] font-bold text-onlite">{l.name}</span>
              <span className="text-[13px] text-onlite-soft">{l.role}</span>
            </div>
            <span className="mt-1 inline-block font-mono text-[10.5px] uppercase tracking-[0.06em] text-onlite-fog underline underline-offset-2">
              {l.company} →
            </span>
          </div>
        </div>
        {open && (
          <div className="mt-4 border-t border-[rgba(10,16,14,0.1)] pt-4">
            <div className="mb-2 font-mono text-[10px] tracking-[0.08em] text-onlite-faint">BUYING SIGNALS</div>
            {l.signals.map((s) => (
              <div key={s} className="flex items-start gap-2 py-1 text-[13px] leading-[1.5] text-[rgba(10,16,14,0.78)]">
                <span className="mt-[6px] h-[6px] w-[6px] flex-none rounded-full bg-mint-deep" />
                {s}
              </div>
            ))}
          </div>
        )}
        <span
          className="absolute bottom-[20px] right-[22px] text-onlite-faint transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div className="flex items-center justify-between px-[22px] pb-[18px]">
        <button onClick={onToggleSelect} className="flex items-center gap-2 text-[12.5px] text-[rgba(10,16,14,0.55)]">
          <span
            className="flex h-4 w-4 items-center justify-center rounded-[5px] border-[1.5px] border-[rgba(10,16,14,0.35)]"
            style={{ background: selected ? "#0A100E" : "transparent" }}
          >
            {selected && <Check />}
          </span>
          {l.source}
        </button>
        <button onClick={onRemove} title="Remove" className="p-1 text-[rgba(10,16,14,0.35)] transition-colors hover:text-alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

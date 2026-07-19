"use client";

import { useState } from "react";
import {
  ACTION_QUEUE,
  ACTION_TIPS,
  CADENCE_LABELS,
  DAILY_GOAL,
  STREAK_DAYS,
  WEEK_PATTERN,
  TODAY_INDEX,
  scriptDraft,
  type ActionContact,
} from "@/lib/action";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ActionQueue() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [replied, setReplied] = useState<Record<string, boolean>>({});
  const [scriptOpen, setScriptOpen] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [justToday, setJustToday] = useState(false);
  const [tip, setTip] = useState(ACTION_TIPS[0]);

  const toggle =
    (set: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, id: string) => () =>
      set((s) => ({ ...s, [id]: !s[id] }));

  const doneCount = Object.values(done).filter(Boolean).length;
  const todayFrac = Math.min(1, doneCount / DAILY_GOAL);
  const dayVals = WEEK_PATTERN.map((v, i) => (i === TODAY_INDEX ? todayFrac : v));

  const visible = justToday ? ACTION_QUEUE.filter((a) => a.status === "DUE TODAY") : ACTION_QUEUE;

  const onJustToday = () => {
    setJustToday((v) => {
      if (!v) setTip(ACTION_TIPS[doneCount % ACTION_TIPS.length]);
      return !v;
    });
  };

  return (
    <div className="flex flex-col gap-[22px]">
      {/* Sticky stats strip */}
      <div className="sticky top-0 z-[4] flex flex-wrap items-center gap-x-0 gap-y-[14px] rounded-card bg-ink px-6 py-5">
        <div className="flex flex-col gap-1">
          <b className="font-display text-[26px] font-bold text-paper">
            {doneCount}
            <span className="text-onink-faint">/{DAILY_GOAL}</span>
          </b>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-onink-faint">Touches today</span>
        </div>
        <span className="mx-6 text-onink-faint/40">|</span>
        <div className="flex flex-col gap-1">
          <b className="font-display text-[26px] font-bold text-paper">
            {STREAK_DAYS}
            <i className="not-italic text-mint">d</i>
          </b>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-onink-faint">Streak</span>
        </div>
        <span className="mx-6 text-onink-faint/40">|</span>
        <div className="flex h-[18px] gap-[5px]">
          {dayVals.map((v, i) => (
            <div
              key={i}
              title={DAYS[i]}
              className="relative mt-[5px] h-2 w-2 flex-none rounded-full border"
              style={{
                borderColor: v > 0 ? "#64D99E" : "rgba(227,233,231,0.25)",
                background:
                  v === 1
                    ? "#64D99E"
                    : v > 0
                      ? `linear-gradient(to top, #64D99E ${Math.round(v * 100)}%, transparent ${Math.round(v * 100)}%)`
                      : "transparent",
              }}
            >
              {i === TODAY_INDEX && (
                <div className="absolute -bottom-[6px] left-[-2px] right-[-2px] h-[1.5px] bg-paper/60" />
              )}
            </div>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-[10px]">
          <button
            onClick={onJustToday}
            className={`flex items-center gap-[7px] whitespace-nowrap rounded-btn border border-onink-soft/20 px-[15px] py-[9px] font-display text-[12.5px] font-bold ${
              justToday ? "bg-mint text-ink" : "text-mist"
            }`}
          >
            Just Today
          </button>
          <button className="whitespace-nowrap rounded-btn bg-mist px-[15px] py-[9px] font-display text-[12.5px] font-bold text-ink transition-colors hover:bg-paper">
            Sync HubSpot
          </button>
        </div>
      </div>

      {justToday && (
        <div className="flex items-start gap-[10px] rounded-[16px] border border-mint/30 bg-mint/10 px-[18px] py-[14px]">
          <span className="mt-[1px] flex-none font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-mint-deep">
            TIP
          </span>
          <span className="text-[13px] leading-[1.5] text-onlite-soft">{tip}</span>
        </div>
      )}

      <div>
        <div className="font-display text-[17px] font-semibold text-onlite">Your Queue</div>
        <div className="mt-1 text-[13.5px] text-onlite-fog">
          Ranked by OLLIN — start at the top. Tap a card to open it.
        </div>
      </div>

      <div className="grid grid-cols-2 items-start gap-4">
        {visible.map((a) => (
          <ActionCard
            key={a.id}
            a={a}
            expanded={Boolean(expanded[a.id])}
            done={Boolean(done[a.id])}
            replied={Boolean(replied[a.id])}
            scriptOpen={Boolean(scriptOpen[a.id])}
            onExpand={toggle(setExpanded, a.id)}
            onDone={toggle(setDone, a.id)}
            onReplied={toggle(setReplied, a.id)}
            onScript={toggle(setScriptOpen, a.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ActionCard({
  a,
  expanded,
  done,
  replied,
  scriptOpen,
  onExpand,
  onDone,
  onReplied,
  onScript,
}: {
  a: ActionContact;
  expanded: boolean;
  done: boolean;
  replied: boolean;
  scriptOpen: boolean;
  onExpand: () => void;
  onDone: () => void;
  onReplied: () => void;
  onScript: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] bg-lite shadow-[0_4px_12px_rgba(10,60,32,0.14),0_24px_48px_-20px_rgba(10,60,32,0.35)]">
      {/* Collapsed header — the whole thing toggles expand */}
      <button
        onClick={onExpand}
        className="relative block w-full cursor-pointer border-none bg-none p-0 text-left"
      >
        <div className="p-[22px]">
          <span
            className={`absolute right-[22px] top-[20px] whitespace-nowrap rounded-btn px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.06em] ${
              a.first ? "bg-mint text-ink" : "bg-[rgba(10,16,14,0.08)] text-onlite-fog"
            }`}
          >
            {a.status}
          </span>
          <div className="flex items-start gap-3 pr-[110px]">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-display text-[17px] font-bold text-onlite">{a.contactName}</span>
                <span className="text-[13px] text-onlite-soft">{a.contactRole}</span>
              </div>
              <span className="mt-1 inline-block font-mono text-[10.5px] uppercase tracking-[0.06em] text-onlite-fog underline underline-offset-2">
                {a.company} →
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-[6px] pr-5">
            <span className="mt-[6px] h-[6px] w-[6px] flex-none rounded-full bg-mint-deep" />
            <span className="text-[12.5px] leading-[1.4] text-onlite">{a.buyingSignal}</span>
          </div>
          <span
            className="absolute bottom-[20px] right-[22px] text-onlite-faint transition-transform"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-8 pb-8">
          <div className="text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-onlite-fog">
              TOUCH {a.touchNum} OF 5
            </div>
            <div className="mt-1 text-[14px] text-onlite">{a.touchDesc}</div>
          </div>

          {/* Cadence stepper */}
          <div className="mt-5 flex items-center justify-center">
            {CADENCE_LABELS.map((label, i) => {
              const step = i + 1;
              const isCurrent = step === a.touchNum;
              const isPast = step < a.touchNum;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] font-display text-[12px] font-bold"
                      style={{
                        background: isCurrent ? "#64D99E" : "transparent",
                        color: isCurrent ? "#0A100E" : isPast ? "#3FBF7F" : "rgba(10,16,14,0.35)",
                        borderColor: isCurrent ? "#64D99E" : isPast ? "#3FBF7F" : "rgba(10,16,14,0.2)",
                      }}
                    >
                      {step}
                    </div>
                    <span
                      className="whitespace-nowrap text-[10.5px]"
                      style={{ color: isCurrent ? "#0A100E" : "rgba(10,16,14,0.5)" }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < CADENCE_LABELS.length - 1 && (
                    <div className="mx-[2px] mb-5 h-px w-7 bg-[rgba(10,16,14,0.15)]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Review / Skip dark panel */}
          <div className="mt-5 grid grid-cols-2 gap-[2px] overflow-hidden rounded-[16px] bg-[rgba(10,16,14,0.4)]">
            <button onClick={onScript} className="cursor-pointer bg-ink px-[18px] py-4 text-left">
              <div className="font-display text-[13.5px] font-bold text-white">Review / Verify</div>
              <div className="mt-[2px] text-[12px] text-white/65">Check the script before you send</div>
            </button>
            <div className="bg-ink px-[18px] py-4">
              <div className="font-display text-[13.5px] font-bold text-white">Skip for now</div>
              <div className="mt-[2px] text-[12px] text-white/65">Come back to this one later</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            <button className="rounded-btn border border-[rgba(10,16,14,0.15)] px-1 py-[11px] font-display text-[12px] font-semibold text-onlite">
              LinkedIn
            </button>
            <button
              onClick={onReplied}
              className="rounded-btn border px-1 py-[11px] font-display text-[12px] font-semibold"
              style={{
                borderColor: replied ? "#3FBF7F" : "rgba(10,16,14,0.2)",
                color: replied ? "#3FBF7F" : "#0A100E",
              }}
            >
              {replied ? "Replied ✓" : "Replied"}
            </button>
            <button
              onClick={onScript}
              className="rounded-btn border border-[rgba(10,16,14,0.15)] px-1 py-[11px] font-display text-[12px] font-semibold text-onlite"
            >
              Script
            </button>
            <button
              onClick={onDone}
              className={`flex items-center justify-center gap-[5px] rounded-btn border border-ink px-1 py-[11px] font-display text-[12px] font-bold text-ink ${
                done ? "bg-mint" : "bg-paper"
              }`}
            >
              {done && <span>✓</span>} Done
            </button>
          </div>

          {scriptOpen && (
            <div className="mt-4 border-t border-[rgba(10,16,14,0.1)] pt-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-onlite-faint">
                Suggested script
              </div>
              <textarea
                defaultValue={scriptDraft(a.offering)}
                className="min-h-[88px] w-full resize-y rounded-[12px] border border-[rgba(10,16,14,0.1)] bg-[#F5F5F5] p-3 font-body text-[13.5px] leading-[1.55] text-onlite"
              />
              <div className="mt-2 flex gap-2">
                <button className="rounded-btn border border-[rgba(10,16,14,0.15)] px-[14px] py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-onlite-fog">
                  Copy
                </button>
                <button className="rounded-btn border border-mint-deep px-[14px] py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-mint-deep">
                  Rewrite with AI
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

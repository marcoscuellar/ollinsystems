import Link from "next/link";
import { auth } from "@/auth";
import EmptyState from "@/components/EmptyState";
import GreetingHero from "@/components/GreetingHero";
import { ArrowIcon } from "@/components/icons";
import { isDemo } from "@/lib/demo";
import { ACCOUNTS, TODAY_STATS, todayQueue, type Account } from "@/lib/ollin";

// Pull a friendly first name off the signed-in account so the greeting conforms
// to whoever the user is: the name they signed up with wins (first word), else a
// clean name derived from the email local-part (first alphabetic segment, so
// "marcos.cuellar" / "marcos_c" / "marcos99" all become "Marcos"); "there" only
// when nobody is signed in.
type SessionUser = { user?: { name?: string | null; email?: string | null } | null } | null;
function firstName(session: SessionUser): string {
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const raw = session?.user?.name?.trim();
  if (raw && !raw.includes("@")) return cap(raw.split(/\s+/)[0]);
  const local = session?.user?.email?.split("@")[0] ?? "";
  const token = local.split(/[^a-zA-Z]+/).find(Boolean);
  return token ? cap(token) : "there";
}

const URGENCY_DOTS: Record<Account["urgency"], number> = { High: 3, Medium: 2, Low: 1 };

const STATUS_STYLE: Record<Account["status"], string> = {
  "Reply needs action": "bg-mint text-ink",
  "Touch due today": "bg-paper text-ink",
  "Ready for review": "bg-mist/15 text-mist",
  "Campaign awaiting approval": "bg-mist/15 text-mist",
  "Follow-up due": "bg-mist/10 text-muted-fog",
};

function QueueCard({ a, first }: { a: Account; first: boolean }) {
  return (
    <Link
      href={`/accounts/${a.id}`}
      className={`group block rounded-card p-6 transition-colors ${
        first ? "bg-mint text-ink" : "bg-ink hover:bg-raised"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-[19px] font-bold tracking-[-0.01em]">{a.name}</div>
          <div className={`mt-[2px] text-[12px] ${first ? "text-ink/70" : "text-muted-fog"}`}>
            {a.industry} · {a.location}
          </div>
        </div>
        <span
          className={`rounded-btn px-3 py-[5px] font-mono text-[10px] tracking-[0.06em] ${
            first ? "bg-ink text-mint" : STATUS_STYLE[a.status]
          }`}
        >
          {a.status.toUpperCase()}
        </span>
      </div>

      <div className={`mt-4 grid grid-cols-[1fr_auto] items-end gap-4 border-t pt-4 ${first ? "border-ink/15" : "border-muted-line"}`}>
        <div className="min-w-0">
          <div className={`font-mono text-[10px] tracking-[0.08em] ${first ? "text-ink/60" : "text-onink-faint"}`}>
            SIGNAL · {a.signalPillar.toUpperCase()}
          </div>
          <div className="mt-1 truncate text-[14px] font-semibold">{a.primarySignal}</div>
          <div className={`mt-2 text-[13px] ${first ? "text-ink/75" : "text-muted-fog"}`}>
            Emphasize: <span className="font-semibold">{a.offering.primary}</span>
            {" · "}
            {a.openRoles.length} verified open role{a.openRoles.length === 1 ? "" : "s"}
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-[5px]" title={`${a.urgency} urgency`} aria-label={`${a.urgency} urgency`}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-[7px] w-[7px] rounded-full ${
                  i < URGENCY_DOTS[a.urgency]
                    ? first
                      ? "bg-ink"
                      : "bg-mint"
                    : first
                      ? "bg-ink/20"
                      : "bg-mist/15"
                }`}
              />
            ))}
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-btn px-4 py-2 font-display text-[12.5px] font-bold transition-colors ${
              first
                ? "bg-ink text-paper group-hover:bg-ink/90"
                : "bg-paper text-ink group-hover:bg-mint"
            }`}
          >
            {a.nextAction}
            <ArrowIcon size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function TodayPage() {
  const demo = isDemo();
  const session = await auth();
  const accounts = demo ? ACCOUNTS : [];
  const stats = TODAY_STATS(accounts);
  const queue = todayQueue(accounts);

  const statCards = [
    { label: "REPLIES WAITING", value: stats.replies, hot: stats.replies > 0 },
    { label: "TOUCHES DUE", value: stats.touchesDue, hot: false },
    { label: "READY FOR REVIEW", value: stats.readyForReview, hot: false },
    { label: "FOLLOW-UPS", value: stats.followUps, hot: false },
  ];

  return (
    <div className="flex flex-col gap-[22px] px-[34px] py-8">
      {/* The morning line — OLLIN reads the overnight run back and points at
          the one obvious next move. */}
      <GreetingHero
        name={firstName(session)}
        demo={demo}
        total={queue.length}
        replies={stats.replies}
        touchesDue={stats.touchesDue}
        ctaHref={demo && queue.length > 0 ? `/accounts/${queue[0].id}` : "/hunt"}
      />

      {/* The morning line — the AE walks in and the list is waiting. */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`rounded-card p-5 ${s.hot ? "bg-mint text-ink" : "bg-ink"}`}
          >
            <div className={`font-mono text-[10px] tracking-[0.08em] ${s.hot ? "text-ink/60" : "text-onink-faint"}`}>
              {s.label}
            </div>
            <div className="mt-[6px] font-display text-[38px] font-bold leading-[1.1]">{s.value}</div>
            <div className={`text-[12px] ${s.hot ? "text-ink/70" : "text-muted-fog"}`}>
              {s.hot ? "a human is waiting" : "in your queue"}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] items-start gap-4">
        {/* The queue — ranked, prepared, one obvious starting point. */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-display text-[17px] font-semibold text-onlite">Your queue</span>
            <span className="font-mono text-[11px] text-onlite-faint">RANKED BY OLLIN — START AT THE TOP</span>
          </div>
          {queue.length === 0 ? (
            <EmptyState
              title="Nothing queued yet"
              sub="Run a hunt and OLLIN fills this list with prepared accounts — signal, offering, contacts, campaign."
              cta={{ href: "/hunt", label: "Open Hunt →" }}
            />
          ) : (
            queue.map((a, i) => <QueueCard key={a.id} a={a} first={i === 0} />)
          )}
        </div>

        {/* Right rail — context, not clutter. */}
        <div className="flex flex-col gap-4">
          <div className="rounded-card bg-ink p-6">
            <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">WHY THIS ORDER</div>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-onink-soft">
              Replies first — a person is waiting. Then touches due today, then fresh intelligence
              ready for review, then follow-ups. You never decide where to begin.
            </p>
          </div>

          <div className="rounded-card bg-ink p-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">CRM</div>
              <span className="flex items-center gap-[6px] font-mono text-[10px] text-mint">
                <span className="h-[6px] w-[6px] animate-pulseDot rounded-full bg-mint" />
                {demo ? "HUBSPOT · SYNCED" : "NOT CONNECTED"}
              </span>
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-onink-soft">
              {demo
                ? "Accounts, contacts, and every touch push to HubSpot automatically. OLLIN stays the working surface; your CRM stays the record."
                : "Connect HubSpot, Salesforce, or Bullhorn — or run everything here and let OLLIN be the record."}
            </p>
            <button className="mt-4 w-full rounded-btn bg-mist py-[10px] font-display text-[12.5px] font-bold text-ink transition-colors hover:bg-paper">
              {demo ? "Manage connection" : "Connect a CRM"}
            </button>
          </div>

          <div className="rounded-card bg-ink p-6">
            <div className="font-mono text-[10px] tracking-[0.08em] text-onink-faint">PIPELINE PULSE</div>
            <div className="mt-3 flex flex-col gap-[10px]">
              {[
                ["Active campaigns", demo ? "4" : "0"],
                ["Verified open roles tracked", demo ? "12" : "0"],
                ["Accounts in nurture", demo ? "1" : "0"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-muted-line pb-[10px] last:border-0 last:pb-0">
                  <span className="text-[13px] text-onink-soft">{k}</span>
                  <span className="font-display text-[15px] font-bold text-paper">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

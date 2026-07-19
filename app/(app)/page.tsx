import Link from "next/link";
import { auth } from "@/auth";
import EmptyState from "@/components/EmptyState";
import GreetingHero from "@/components/GreetingHero";
import NewClientsGraph from "@/components/today/NewClientsGraph";
import FeedCard from "@/components/today/FeedCard";
import TalentShowcaseCard from "@/components/today/TalentShowcaseCard";
import OnDeckChecklist from "@/components/today/OnDeckChecklist";
import { isDemo } from "@/lib/demo";
import { ACCOUNTS, TODAY_STATS, todayQueue } from "@/lib/ollin";
import { LOCAL_INTEL, TEAM_UPDATES, TALENT_SHOWCASE, DECK_ITEMS } from "@/lib/today";

// Pull a friendly first name off the signed-in account so the greeting conforms
// to whoever the user is: the name they signed up with wins (first word), else a
// clean first name from the email local-part; "there" only when signed out.
type SessionUser = { user?: { name?: string | null; email?: string | null } | null } | null;
function firstName(session: SessionUser): string {
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const raw = session?.user?.name?.trim();
  if (raw && !raw.includes("@")) return cap(raw.split(/\s+/)[0]);
  const local = session?.user?.email?.split("@")[0] ?? "";
  const token = local.split(/[^a-zA-Z]+/).find(Boolean);
  return token ? cap(token) : "there";
}

type Tone = "mint" | "coral" | "dark";

// Today is a daily orientation dashboard — the AE reads it and clicks out to
// where the work happens (Action, Accounts, Campaigns). Nothing is actioned in
// place except the On Deck checklist.
export default async function TodayPage() {
  const demo = isDemo();
  const session = await auth();
  const accounts = demo ? ACCOUNTS : [];
  const stats = TODAY_STATS(accounts);
  const queue = todayQueue(accounts);
  const name = firstName(session);

  const statCards: { label: string; value: number; sub: string; tone: Tone; href?: string }[] = [
    { label: "GOALS FOR TODAY", value: demo ? 50 : 0, sub: "today's target", tone: "mint" },
    { label: "REDEPLOY", value: demo ? 1 : 0, sub: "talent showcase", tone: "coral", href: "/redeploy" },
  ];

  return (
    <div className="flex flex-col gap-[22px] px-[56px] py-8">
      <GreetingHero
        name={name}
        demo={demo}
        total={queue.length}
        touchesDue={stats.touchesDue}
        leftover={demo ? 13 : 0}
        ctaHref={demo && queue.length > 0 ? `/accounts/${queue[0].id}` : "/hunt"}
      />

      {/* Stat grid — the two hot cards: mint "goals" and coral "redeploy". */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((s) => {
          const tone =
            s.tone === "mint" ? "bg-mint text-ink" : s.tone === "coral" ? "bg-alert text-ink" : "bg-ink";
          const labelClass = s.tone === "dark" ? "text-onink-faint" : "text-ink/60";
          const subClass = s.tone === "dark" ? "text-onink-fog" : "text-ink/70";
          const inner = (
            <>
              <div className={`font-mono text-[10px] tracking-[0.08em] ${labelClass}`}>{s.label}</div>
              <div className="mt-[6px] font-display text-[38px] font-bold leading-[1.1]">{s.value}</div>
              <div className={`text-[12px] ${subClass}`}>{s.sub}</div>
            </>
          );
          return s.href ? (
            <Link
              key={s.label}
              href={s.href}
              className={`rounded-card p-5 transition-transform hover:-translate-y-[2px] ${tone}`}
            >
              {inner}
            </Link>
          ) : (
            <div key={s.label} className={`rounded-card p-5 ${tone}`}>
              {inner}
            </div>
          );
        })}
      </div>

      {demo ? (
        <div className="grid grid-cols-[1.6fr_1fr] items-start gap-4">
          {/* Left — the read: new clients this week + local intel and team updates. */}
          <div className="flex flex-col gap-4">
            <NewClientsGraph />
            <div className="grid grid-cols-2 gap-4">
              <FeedCard label="LOCAL INTEL" items={LOCAL_INTEL} />
              <FeedCard label="UPDATES FROM TEAM" items={TEAM_UPDATES} />
            </div>
          </div>
          {/* Right — talent to redeploy + the on-deck checklist. */}
          <div className="flex flex-col gap-4">
            <TalentShowcaseCard talent={TALENT_SHOWCASE} />
            <OnDeckChecklist items={DECK_ITEMS} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="Nothing queued yet"
          sub="Run a hunt and OLLIN fills Today with prepared accounts, live signals, and your on-deck list."
          cta={{ href: "/hunt", label: "Open Hunt →" }}
        />
      )}
    </div>
  );
}

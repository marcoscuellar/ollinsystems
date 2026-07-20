import Link from "next/link";
import { auth } from "@/auth";
import EmptyState from "@/components/EmptyState";
import LiveDate from "@/components/LiveDate";
import NewClientsGraph from "@/components/today/NewClientsGraph";
import FeedCard from "@/components/today/FeedCard";
import TalentShowcaseCard from "@/components/today/TalentShowcaseCard";
import OnDeckChecklist from "@/components/today/OnDeckChecklist";
import { isDemo } from "@/lib/demo";
import { ACCOUNTS, TODAY_STATS, todayQueue, type Account } from "@/lib/ollin";
import { LOCAL_INTEL, TEAM_UPDATES, TALENT_SHOWCASE, DECK_ITEMS } from "@/lib/today";

type SessionUser = { user?: { name?: string | null; email?: string | null } | null } | null;

function firstName(session: SessionUser): string {
  const cap = (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);
  const name = session?.user?.name?.trim();
  if (name && !name.includes("@")) return cap(name.split(/\s+/)[0]);
  const token = session?.user?.email?.split("@")[0]?.split(/[^a-zA-Z]+/).find(Boolean);
  return token ? cap(token) : "there";
}

function statusTone(account: Account) {
  if (account.status === "Reply needs action") return "bg-ink text-paper";
  if (account.urgency === "High") return "bg-mint text-ink";
  return "bg-lite-raised text-onlite-soft";
}

export default async function TodayPage() {
  const demo = await isDemo();
  const session = await auth();
  const accounts = demo ? ACCOUNTS : [];
  const stats = TODAY_STATS(accounts);
  const queue = todayQueue(accounts);
  const priority = queue[0];
  const name = firstName(session);
  const completed = demo ? 7 : 0;
  const dailyGoal = demo ? 12 : 0;
  const progress = dailyGoal ? Math.round((completed / dailyGoal) * 100) : 0;

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-7 py-7 lg:px-10 xl:px-14">
      <header className="flex flex-col gap-5 border-b border-lite-line pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-onlite-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-deep" />
            <LiveDate />
          </div>
          <h1 className="mt-3 font-display text-[38px] font-semibold leading-none tracking-[-0.045em] text-onlite lg:text-[48px]">
            Morning, {name}.
          </h1>
          <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-onlite-fog">
            {demo
              ? "OLLIN prepared the opportunities. Start with the highest-leverage move and keep the thread going."
              : "Your workspace is clear. Intelligence will prepare the opportunity, strategy, and next move."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Metric label="READY" value={queue.length} />
          <Metric label="DUE" value={stats.touchesDue} accent />
          <Metric label="REPLIES" value={stats.replies} />
        </div>
      </header>

      {demo && priority ? (
        <>
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)]">
            <article className="overflow-hidden rounded-[22px] bg-ink text-mist shadow-[0_16px_45px_-26px_rgba(10,16,14,.65)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-muted-line px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-mint">PRIORITY MOVE</span>
                  <span className="rounded-full border border-muted-line px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-onink-faint">
                    {priority.urgency.toUpperCase()} URGENCY
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.1em] text-onink-faint">PREPARED BY OLLIN</span>
              </div>

              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="px-6 py-7 lg:border-r lg:border-muted-line lg:px-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.11em] text-onink-faint">
                        {priority.industry} · {priority.location}
                      </div>
                      <h2 className="mt-2 font-display text-[32px] font-semibold tracking-[-0.04em] text-paper">
                        {priority.name}
                      </h2>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint font-mono text-[12px] font-bold text-ink">
                      92
                    </span>
                  </div>

                  <div className="mt-7 rounded-[16px] border border-mint/20 bg-mint/[0.07] p-5">
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.11em] text-mint">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Verified signal
                    </div>
                    <p className="mt-3 font-display text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-paper">
                      {priority.primarySignal}
                    </p>
                    <p className="mt-3 text-[12px] leading-5 text-onink-soft">
                      {priority.offering.why}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-5">
                    <Detail label="BEST OFFERING" value={priority.offering.primary} />
                    <Detail label="MOVEMENT WINDOW" value="Now · next 21 days" />
                  </div>
                </div>

                <div className="flex flex-col bg-[#0d1713] px-6 py-7 lg:px-7">
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-onink-faint">YOUR NEXT MOVE</div>
                  <p className="mt-3 font-display text-[23px] font-semibold leading-[1.3] tracking-[-0.025em] text-paper">
                    {priority.nextAction}
                  </p>
                  <div className="mt-6 border-t border-muted-line pt-5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-onink-faint">START WITH</div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist font-display text-[12px] font-bold text-ink">
                        {priority.contacts[0]?.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-paper">{priority.contacts[0]?.name}</div>
                        <div className="mt-0.5 text-[11px] text-onink-faint">{priority.contacts[0]?.title}</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/accounts/${priority.id}`}
                    className="mt-auto flex items-center justify-between rounded-[11px] bg-mint px-5 py-4 font-display text-[13px] font-bold text-ink transition-colors hover:bg-mint-deep"
                  >
                    Open prepared account <span>→</span>
                  </Link>
                </div>
              </div>
            </article>

            <aside className="flex flex-col rounded-[22px] border border-lite-line bg-white p-6 shadow-[0_14px_38px_-28px_rgba(10,16,14,.45)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-onlite-faint">TODAY&apos;S MOVEMENT</div>
                  <div className="mt-2 font-display text-[30px] font-semibold tracking-[-0.04em] text-onlite">
                    {completed}<span className="text-onlite-faint">/{dailyGoal}</span>
                  </div>
                </div>
                <span className="rounded-full bg-mint px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.08em] text-ink">ON TRACK</span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-lite-raised">
                <div className="h-full rounded-full bg-mint-deep" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-[12px] leading-5 text-onlite-fog">Five focused moves left. The queue is already ranked.</p>

              <div className="mt-7 space-y-0 border-t border-lite-line">
                <PulseRow label="Replies first" value={stats.replies} />
                <PulseRow label="Touches due" value={stats.touchesDue} />
                <PulseRow label="Fresh intelligence" value={stats.readyForReview} />
                <PulseRow label="Follow-ups" value={stats.followUps} />
              </div>
              <Link href="/hunt" className="mt-auto flex items-center justify-between border-t border-lite-line pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-onlite">
                Open Movement <span>→</span>
              </Link>
            </aside>
          </section>

          <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
            <div className="flex min-w-0 flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[18px] bg-mint p-5 text-ink shadow-[0_14px_35px_-28px_rgba(10,16,14,.4)]">
                  <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-ink/55">GOAL FOR TODAY</div>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div><strong className="font-display text-[32px] font-semibold leading-none tracking-[-0.04em]">{dailyGoal}</strong><span className="ml-1 font-display text-[15px] font-medium text-ink/55">moves</span></div>
                    <span className="rounded-full bg-ink/10 px-3 py-1.5 font-mono text-[8px] font-bold tracking-[0.08em]">{completed} COMPLETE</span>
                  </div>
                </div>
                <Link href="/redeploy" className="group rounded-[18px] border border-lite-line bg-white p-5 text-onlite shadow-[0_14px_35px_-28px_rgba(10,16,14,.4)] transition-colors hover:bg-lite-raised">
                  <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-onlite-faint">REDEPLOY</div>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div><strong className="font-display text-[32px] font-semibold leading-none tracking-[-0.04em]">1</strong><span className="ml-1 font-display text-[13px] font-medium text-onlite-fog">talent match</span></div>
                    <span className="font-mono text-[11px] text-onlite-faint transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </div>

              <NewClientsGraph />

              <div className="grid gap-4 md:grid-cols-2">
                <FeedCard label="LOCAL INTEL" items={LOCAL_INTEL} />
                <FeedCard label="UPDATES FROM TEAM" items={TEAM_UPDATES} dark={false} />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <TalentShowcaseCard talent={TALENT_SHOWCASE} />
              <OnDeckChecklist items={DECK_ITEMS} />
            </div>
          </section>

          <section className="overflow-hidden rounded-[22px] border border-lite-line bg-white shadow-[0_14px_38px_-30px_rgba(10,16,14,.4)]">
            <div className="flex flex-col gap-3 border-b border-lite-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-[18px] font-semibold tracking-[-0.02em] text-onlite">Prepared queue</h2>
                <p className="mt-1 text-[12px] text-onlite-fog">Intelligence is complete. Movement is ready.</p>
              </div>
              <Link href="/accounts" className="font-mono text-[9px] font-bold uppercase tracking-[0.09em] text-onlite-fog hover:text-onlite">View all accounts →</Link>
            </div>
            <div className="divide-y divide-lite-line">
              {queue.slice(0, 5).map((account, index) => (
                <Link key={account.id} href={`/accounts/${account.id}`} className="grid gap-4 px-6 py-5 transition-colors hover:bg-lite-raised md:grid-cols-[44px_1.05fr_1.4fr_.9fr_auto] md:items-center">
                  <span className="font-mono text-[10px] text-onlite-faint">{String(index + 1).padStart(2, "0")}</span>
                  <div><div className="font-display text-[14px] font-semibold text-onlite">{account.name}</div><div className="mt-1 text-[10px] text-onlite-faint">{account.industry}</div></div>
                  <div><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-onlite-faint">SIGNAL</div><div className="mt-1 line-clamp-1 text-[12px] text-onlite-soft">{account.primarySignal}</div></div>
                  <div><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-onlite-faint">NEXT MOVE</div><div className="mt-1 text-[12px] font-medium text-onlite">{account.nextAction}</div></div>
                  <span className={`w-fit rounded-full px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.07em] ${statusTone(account)}`}>{account.status}</span>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <EmptyState title="Your movement starts with intelligence" sub="OLLIN will prepare the account, verify the signal, map the people, and give you one clear next move." cta={{ href: "/hunt", label: "Open Movement →" }} />
      )}
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return <div className={`min-w-[88px] rounded-[12px] border px-4 py-3 ${accent ? "border-mint/50 bg-mint" : "border-lite-line bg-white"}`}><div className={`font-mono text-[8px] tracking-[0.11em] ${accent ? "text-ink/55" : "text-onlite-faint"}`}>{label}</div><div className="mt-1 font-display text-[21px] font-semibold leading-none tracking-[-0.03em] text-onlite">{value}</div></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><div className="font-mono text-[8px] uppercase tracking-[0.11em] text-onink-faint">{label}</div><div className="mt-2 text-[12px] font-medium leading-5 text-mist">{value}</div></div>;
}

function PulseRow({ label, value }: { label: string; value: number }) {
  return <div className="flex items-center justify-between border-b border-lite-line py-3.5"><span className="text-[12px] text-onlite-soft">{label}</span><strong className="font-mono text-[12px] text-onlite">{value}</strong></div>;
}

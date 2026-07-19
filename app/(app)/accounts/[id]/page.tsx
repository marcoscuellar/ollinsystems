import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, LinkOutIcon } from "@/components/icons";
import { getAccount, type Signal } from "@/lib/ollin";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.1em] text-onink-faint">{children}</div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-card bg-ink p-6 ${className}`}>{children}</section>;
}

function AuditStamp({ s }: { s: Signal }) {
  const style =
    s.audit === "Verified"
      ? "bg-mint/15 text-mint"
      : s.audit === "Partial"
        ? "bg-mist/15 text-mist"
        : "bg-alert-tint text-alert";
  return (
    <span className={`rounded-btn px-[10px] py-[3px] font-mono text-[10px] tracking-[0.06em] ${style}`}>
      {s.audit.toUpperCase()}
    </span>
  );
}

export default function AccountBriefPage({ params }: { params: { id: string } }) {
  const a = getAccount(params.id);
  if (!a) notFound();

  const tiers: Record<number, string> = {
    1: "TIER 1 · AUTHORITY",
    2: "TIER 2 · HIGHEST CONVERSION",
    3: "TIER 3 · FASTEST ENTRY",
  };

  return (
    <div className="flex flex-col gap-4 px-16 xl:px-32 py-8">
      {/* Header band — dark card, one mint element: the next action. */}
      <Card className="flex items-start justify-between gap-6">
        <div>
          <Eyebrow>{a.industry.toUpperCase()} · {a.location.toUpperCase()} · {a.size.toUpperCase()}</Eyebrow>
          <h1 className="mt-2 font-display text-[30px] font-bold tracking-[-0.01em] text-paper">{a.name}</h1>
          <p className="mt-2 max-w-[60ch] text-[14px] leading-[1.6] text-onink-soft">{a.whoTheyAre}</p>
        </div>
        <div className="flex flex-none flex-col items-end gap-3">
          <span className="rounded-btn bg-mist/15 px-3 py-[5px] font-mono text-[10px] tracking-[0.06em] text-mist">
            {a.status.toUpperCase()}
          </span>
          <button className="rounded-btn bg-mint px-5 py-[10px] font-display text-[13px] font-bold text-ink transition-colors hover:bg-mint-deep">
            {a.nextAction}
          </button>
          <span className="font-mono text-[10px] text-onink-faint">
            {a.crm.connected ? `${a.crm.system?.toUpperCase()} · SYNCED ${a.crm.lastSync?.toUpperCase()}` : "CRM NOT CONNECTED"}
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-[1.5fr_1fr] items-start gap-4">
        <div className="flex flex-col gap-4">
          {/* WHY NOW */}
          <Card>
            <Eyebrow>WHY NOW · SIGNALS</Eyebrow>
            <div className="mt-4 flex flex-col gap-4">
              {a.signals.map((s) => (
                <div key={s.title} className="border-b border-muted-line pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[14.5px] font-semibold text-mist">{s.title}</div>
                    <AuditStamp s={s} />
                  </div>
                  <div className="mt-[6px] font-mono text-[10px] tracking-[0.06em] text-onink-faint">
                    {s.durability} · {s.category.toUpperCase()} · {s.date.toUpperCase()} · {s.source.toUpperCase()}
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.55] text-muted-fog">{s.implication}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* STRATEGIC BRIDGE */}
          {a.bridge && (
            <Card>
              <Eyebrow>STRATEGIC BRIDGE · THEIR WORDS, YOUR WEDGE</Eyebrow>
              <blockquote className="mt-3 border-l-2 border-mint pl-4 font-display text-[16px] font-medium leading-[1.5] text-paper">
                {a.bridge.statedPhilosophy}
              </blockquote>
              <div className="mt-2 font-mono text-[10px] text-onink-faint">— {a.bridge.speaker.toUpperCase()}</div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-[16px] bg-raised p-4">
                  <div className="font-mono text-[10px] text-onink-faint">ALREADY APPLIED</div>
                  <div className="mt-1 text-[13px] text-onink-soft">{a.bridge.applied}</div>
                </div>
                <div className="rounded-[16px] bg-raised p-4">
                  <div className="font-mono text-[10px] text-mint">NOT YET APPLIED</div>
                  <div className="mt-1 text-[13px] text-mist">{a.bridge.notApplied}</div>
                </div>
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-onink-soft">{a.bridge.theBridge}</p>
            </Card>
          )}

          {/* CAMPAIGN */}
          <Card>
            <div className="flex items-center justify-between">
              <Eyebrow>CAMPAIGN · PREPARED BY INTELLIGENCE</Eyebrow>
              <span className="rounded-btn bg-mist/15 px-3 py-[4px] font-mono text-[10px] text-mist">
                {a.campaign.approval.toUpperCase()}
              </span>
            </div>
            <div className="mt-4">
              <div className="font-mono text-[10px] text-onink-faint">THE OBSERVATION</div>
              <p className="mt-1 text-[14.5px] font-semibold leading-[1.55] text-mist">{a.campaign.observation}</p>
            </div>
            <div className="mt-4">
              <div className="font-mono text-[10px] text-onink-faint">PROOF POINTS</div>
              <div className="mt-2 flex flex-col gap-2">
                {a.campaign.proofPoints.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-[13.5px] leading-[1.55] text-onink-soft">
                    <CheckIcon size={14} className="mt-[3px] flex-none text-mint" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-[16px] bg-raised p-4">
              <div className="font-mono text-[10px] text-onink-faint">THE ASSET — THE ONLY ASK</div>
              <div className="mt-1 text-[13.5px] font-semibold text-mist">{a.campaign.asset}</div>
            </div>
            <div className="mt-5">
              <div className="font-mono text-[10px] text-onink-faint">FIVE-TOUCH SEQUENCE</div>
              <div className="mt-2 flex flex-col">
                {a.campaign.touches.map((t) => (
                  <div
                    key={`${t.day}-${t.label}`}
                    className="flex items-center gap-4 border-b border-muted-line py-[10px] last:border-0"
                  >
                    <span className="w-[52px] font-mono text-[11px] text-onink-faint">DAY {t.day}</span>
                    <span className="w-[76px] rounded-btn bg-mist/10 px-2 py-[3px] text-center font-mono text-[10px] text-mist">
                      {t.channel.toUpperCase()}
                    </span>
                    <span className="flex-1 truncate text-[13.5px] text-onink-soft">{t.label}</span>
                    <span
                      className={`font-mono text-[10px] ${
                        t.status === "Done" ? "text-onink-faint line-through" : t.status === "Due" ? "text-mint" : "text-muted-fog"
                      }`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          {/* WHAT TO EMPHASIZE */}
          <Card>
            <Eyebrow>WHAT TO EMPHASIZE</Eyebrow>
            <div className="mt-3 font-display text-[18px] font-bold leading-[1.3] text-paper">{a.offering.primary}</div>
            {a.offering.secondary && (
              <div className="mt-1 text-[13px] text-mint">+ {a.offering.secondary}</div>
            )}
            <p className="mt-3 text-[13.5px] leading-[1.6] text-onink-soft">{a.offering.why}</p>
          </Card>

          {/* WHO TO CONTACT */}
          <Card>
            <Eyebrow>WHO TO CONTACT</Eyebrow>
            <div className="mt-4 flex flex-col gap-4">
              {a.contacts.map((c) => (
                <div key={c.name} className="border-b border-muted-line pb-4 last:border-0 last:pb-0">
                  <div className="font-mono text-[9px] tracking-[0.1em] text-onink-faint">{tiers[c.tier]}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-display text-[15px] font-bold text-paper">{c.name}</span>
                    <span className="rounded-btn bg-mist/10 px-2 py-[3px] font-mono text-[9px] text-mist">
                      {c.persona.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-muted-fog">{c.title}</div>
                  <p className="mt-2 text-[13px] leading-[1.5] text-onink-soft">{c.why}</p>
                  <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-onink-faint">
                    <span>{c.email}</span>
                    <span className={c.emailStatus === "Verified" ? "text-mint" : ""}>{c.emailStatus.toUpperCase()}</span>
                  </div>
                  {c.warmPath !== "None found" && (
                    <div className="mt-1 font-mono text-[10px] text-mint">WARM PATH · {c.warmPath.toUpperCase()}</div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* OPEN JOBS */}
          <Card>
            <Eyebrow>OPEN JOBS · EVIDENCE OF DEMAND</Eyebrow>
            <div className="mt-3 flex flex-col">
              {a.openRoles.map((r) => (
                <div key={r.title} className="flex items-center justify-between border-b border-muted-line py-[10px] last:border-0">
                  <div>
                    <div className="text-[13.5px] font-semibold text-mist">{r.title}</div>
                    <div className="text-[11.5px] text-muted-fog">{r.location} · {r.daysOpen} days open</div>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-mint">
                    {r.verified && <CheckIcon size={11} />} VERIFIED
                    <LinkOutIcon size={12} className="ml-1 text-onink-faint" />
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* NOTES */}
          <Card>
            <Eyebrow>NOTES · FOLLOWS THE ACCOUNT EVERYWHERE</Eyebrow>
            <div className="mt-3 flex flex-col gap-3">
              {a.notes.length === 0 ? (
                <p className="text-[13px] text-muted-fog">No notes yet. Anything you capture here shows up in Action too.</p>
              ) : (
                a.notes.map((n) => (
                  <div key={n.body} className="rounded-[16px] bg-raised p-4">
                    <div className="font-mono text-[10px] text-onink-faint">{n.date.toUpperCase()}</div>
                    <p className="mt-1 text-[13px] leading-[1.55] text-onink-soft">{n.body}</p>
                  </div>
                ))
              )}
              <Link href="#" className="font-mono text-[11px] text-mint">+ ADD NOTE</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

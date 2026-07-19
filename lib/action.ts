// Data for the Action screen — the working outreach queue. One card per contact,
// ranked by OLLIN. Demo/placeholder content; production wires this to the real
// queue + HubSpot sync.

export type ActionContact = {
  id: string;
  company: string;
  contactName: string;
  contactRole: string;
  status: string; // badge, e.g. "12D OVERDUE" / "DUE TODAY"
  touchNum: number; // 1..5 in the cadence
  touchDesc: string;
  offering: string;
  buyingSignal: string;
  first?: boolean;
};

export const CADENCE_LABELS = ["Outreach", "Follow up", "Nudge", "Break up", "Final"];

export const DAILY_GOAL = 50;
export const STREAK_DAYS = 6;
// Weekly consistency dots (Mon–Sun); index 4 (today) is filled live from progress.
export const WEEK_PATTERN = [1, 1, 0.5, 1, 0, 0, 0];
export const TODAY_INDEX = 4;

export const ACTION_QUEUE: ActionContact[] = [
  {
    id: "prairie-financial",
    company: "Prairie Financial",
    contactName: "Daniel Boateng",
    contactRole: "VP of Operations",
    status: "12D OVERDUE",
    touchNum: 1,
    touchDesc: "First outreach due — script, send, done.",
    offering: "Project staffing — PMO / integration",
    buyingSignal: "Acquisition closed — integration PMO forming",
    first: true,
  },
  {
    id: "lakeshore-apparel",
    company: "Lakeshore Apparel Group",
    contactName: "Javier Alvarez",
    contactRole: "CTO",
    status: "DUE TODAY",
    touchNum: 2,
    touchDesc: "Follow up due — reference the ERP timeline.",
    offering: "Contract staffing — ERP / integration",
    buyingSignal: "New CTO hire + ERP migration announced",
  },
  {
    id: "meridian-health",
    company: "Meridian Health",
    contactName: "Sonal Patel",
    contactRole: "CISO",
    status: "9D OVERDUE",
    touchNum: 3,
    touchDesc: "Nudge due — HITRUST deadline is the hook.",
    offering: "Domestic cybersecurity staffing",
    buyingSignal: "HITRUST deadline driving urgent hiring",
  },
  {
    id: "halcyon-data",
    company: "Halcyon Data",
    contactName: "Lena Fischer",
    contactRole: "VP Engineering",
    status: "DUE TODAY",
    touchNum: 1,
    touchDesc: "First outreach due — script, send, done.",
    offering: "Nearshore data engineering pods",
    buyingSignal: "14 senior data eng roles posted in 60 days",
  },
];

export const ACTION_TIPS = [
  "One card at a time. Open it, do the one action, close it — don't skim ahead.",
  "Overdue doesn't mean urgent to them — it means overdue to you. Send it anyway.",
  "If you're stuck on a script, hit Rewrite with AI instead of staring at it.",
  "Skip is not failure. Skip is honest sequencing — come back after the easy ones.",
];

export function scriptDraft(offering: string): string {
  return `Hi — following up given the timing. Thought it'd be worth a quick conversation about ${offering.toLowerCase()}. Open to 15 minutes this week?`;
}

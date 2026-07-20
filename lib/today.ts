// Seed data for the Today orientation dashboard (from the OLLIN Today handoff).
// All of this is demo/placeholder content shown when Demo Mode is on; a real
// account shows empty states until the corresponding feeds are wired up
// (accounts API, HubSpot sync, news/signal feed, campaign stats).

export type WeekBar = { label: string; lastVal: number; thisVal: number; highlight: boolean };
export type Stat = { label: string; value: number };
export type FeedItem = { body: string; from: string; when: string };
export type Talent = { name: string; role: string; availability: string; rollingOff: boolean };
export type DeckItem = { id: string; html: string; href: string; crmOnly: boolean };

const LAST_WEEK = [2, 4, 3, 5, 2, 1, 0];
const THIS_WEEK = [3, 5, 4, 6, 2, 0, 0];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const WEEK_BARS: WeekBar[] = DAYS.map((label, i) => ({
  label,
  lastVal: LAST_WEEK[i],
  thisVal: THIS_WEEK[i],
  highlight: i === 3, // Thursday — the standout day
}));

export const CLIENTS_THIS_WEEK = THIS_WEEK.reduce((a, b) => a + b, 0);
export const CLIENTS_LAST_WEEK = LAST_WEEK.reduce((a, b) => a + b, 0);
export const WEEK_MAX = Math.max(...LAST_WEEK, ...THIS_WEEK, 1);

export const LAST_WEEK_STATS: Stat[] = [
  { label: "TOUCHES SENT", value: 34 },
  { label: "REPLIES", value: 6 },
  { label: "MEETINGS BOOKED", value: 2 },
];

export const LOCAL_INTEL: FeedItem[] = [
  {
    body: "Meridian Health filed a WARN notice — 40 roles moving to their Austin hub by month end.",
    from: "Chicago Tribune",
    when: "2h ago",
  },
  {
    body: "Prairie Financial's Cedar acquisition closes officially next week per local business journal.",
    from: "Des Moines Register",
    when: "Yesterday",
  },
];

export const TEAM_UPDATES: FeedItem[] = [
  {
    body: "New HubSpot workflow ships Friday — touches will auto-log without the manual sync step.",
    from: "Marcos",
    when: "Yesterday",
  },
  {
    body: "Q3 target raised to 60 accounts/month. Hunt filters updated to match.",
    from: "Leadership",
    when: "Mon",
  },
];

export const TALENT_SHOWCASE: Talent[] = [
  { name: "J. Alvarez", role: "Sr. Security Engineer", availability: "AVAILABLE NOW", rollingOff: false },
  { name: "R. Chen", role: "Staff Data Engineer", availability: "ROLLING OFF · 2WK", rollingOff: true },
];

// "On Deck Today" checklist. `html` is trusted, author-controlled markup (bold
// counts / mint highlights) — never user input. crmOnly rows show in Demo Mode.
export const DECK_ITEMS: DeckItem[] = [
  { id: "new-companies", html: `<b>5</b> new companies surfaced`, href: "/hunt", crmOnly: false },
  { id: "outreaches-ready", html: `<b>20</b> new outreaches ready to send`, href: "/campaigns", crmOnly: false },
  { id: "outreaches-left", html: `<b>13</b> outreaches left over from yesterday`, href: "/campaigns", crmOnly: false },
  { id: "linkedin-post", html: `LinkedIn post — <span class="text-mint-deep font-semibold">not done yet</span>`, href: "/campaigns", crmOnly: false },
  { id: "check-jobs", html: `CRM: check jobs board for new reqs`, href: "/hunt", crmOnly: true },
  { id: "present-candidates", html: `CRM: present 3 candidates to <b>Prairie Financial</b>`, href: "/accounts/prairie-financial", crmOnly: true },
];

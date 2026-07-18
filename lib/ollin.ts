// OLLIN data model + demo seed.
// Intelligence prepares the opportunity; Action keeps it moving. Both layers
// read from these same records — there is exactly one copy of every account.

export type Durability = "PERISHABLE" | "DURABLE";
export type AuditStatus = "Verified" | "Partial" | "Rejected";
export type Urgency = "High" | "Medium" | "Low";

export type AccountStatus =
  | "Ready for review"
  | "Campaign awaiting approval"
  | "Touch due today"
  | "Reply needs action"
  | "Follow-up due";

export type Signal = {
  title: string;
  category: string;
  durability: Durability;
  date: string;
  source: string;
  audit: AuditStatus;
  confidence: "High" | "Medium" | "Low";
  implication: string;
};

export type Contact = {
  name: string;
  title: string;
  tier: 1 | 2 | 3;
  persona: "Economic Buyer" | "Champion" | "Technical Evaluator" | "Blocker";
  why: string;
  email: string;
  emailStatus: "Verified" | "Best-guess";
  warmPath: string;
};

export type Touch = {
  day: number;
  channel: "LinkedIn" | "Email" | "Call";
  label: string;
  status: "Done" | "Due" | "Scheduled";
};

export type OpenRole = {
  title: string;
  location: string;
  daysOpen: number;
  verified: boolean;
};

export type Account = {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  status: AccountStatus;
  urgency: Urgency;
  primarySignal: string;
  signalPillar: string;
  offering: { primary: string; secondary?: string; why: string };
  openRoles: OpenRole[];
  whoTheyAre: string;
  signals: Signal[];
  bridge?: {
    statedPhilosophy: string;
    speaker: string;
    applied: string;
    notApplied: string;
    theBridge: string;
  };
  contacts: Contact[];
  campaign: {
    observation: string;
    proofPoints: string[];
    asset: string;
    touches: Touch[];
    approval: "Draft" | "Awaiting review" | "Approved" | "Active" | "Paused" | "Completed";
  };
  notes: { date: string; body: string }[];
  nextAction: string;
  crm: { connected: boolean; system?: string; lastSync?: string };
};

export const ACCOUNTS: Account[] = [
  {
    id: "meridian-health",
    name: "Meridian Health",
    industry: "Health-tech",
    location: "Chicago, IL",
    size: "~1,400 employees · $180M est.",
    status: "Ready for review",
    urgency: "High",
    primarySignal: "Cybersecurity hiring expansion + HITRUST deadline",
    signalPillar: "Performance Pain",
    offering: {
      primary: "Domestic cybersecurity staffing",
      secondary: "Nearshore security engineering",
      why: "Eight verified US security roles, a compliance clock, and stated cost discipline — specialized depth onshore, sustained coverage nearshore.",
    },
    openRoles: [
      { title: "Sr. Security Engineer", location: "Chicago, IL", daysOpen: 64, verified: true },
      { title: "GRC Analyst", location: "Remote (US)", daysOpen: 41, verified: true },
      { title: "SOC Analyst II", location: "Chicago, IL", daysOpen: 33, verified: true },
      { title: "Cloud Security Architect", location: "Remote (US)", daysOpen: 58, verified: true },
    ],
    whoTheyAre:
      "Care-coordination platform for regional health systems. PE-backed (Series C, 2025). HQ Chicago with an Austin engineering hub. Stack: AWS, Snowflake, Workday, Greenhouse.",
    signals: [
      {
        title: "8 open security roles, 4 open 30+ days",
        category: "Hiring surge",
        durability: "PERISHABLE",
        date: "Jul 2026",
        source: "Company ATS (Greenhouse)",
        audit: "Verified",
        confidence: "High",
        implication: "Security hiring is outpacing their internal recruiting capacity.",
      },
      {
        title: "HITRUST certification target announced for Q1 2027",
        category: "Compliance deadline",
        durability: "PERISHABLE",
        date: "Jun 2026",
        source: "Press release",
        audit: "Verified",
        confidence: "High",
        implication: "Fixed date creates a hard staffing floor for GRC + security engineering.",
      },
      {
        title: "CFO: 'disciplined cost growth while we scale trust infrastructure'",
        category: "Cost discipline",
        durability: "DURABLE",
        date: "May 2026",
        source: "Investor update",
        audit: "Partial",
        confidence: "Medium",
        implication: "Reinforcement only — supports the nearshore cost angle, never the lead.",
      },
    ],
    bridge: {
      statedPhilosophy: "\u201CDisciplined cost growth while we scale trust infrastructure.\u201D",
      speaker: "CFO, investor update — May 2026",
      applied: "Customer support (already nearshored to Guadalajara)",
      notApplied: "Security engineering — 100% US-based today",
      theBridge:
        "They already run the cost-discipline model in support. The same logic hasn't reached security engineering — that's the wedge.",
    },
    contacts: [
      {
        name: "Dana Okafor",
        title: "VP, Information Security",
        tier: 1,
        persona: "Economic Buyer",
        why: "Owns the HITRUST mandate and the security budget.",
        email: "d.okafor@meridianhealth.com",
        emailStatus: "Verified",
        warmPath: "2nd-degree via former Procom placement",
      },
      {
        name: "Miguel Serrano",
        title: "Director, Security Operations",
        tier: 2,
        persona: "Champion",
        why: "Four of the eight open reqs report into his team — he feels the gap daily.",
        email: "m.serrano@meridianhealth.com",
        emailStatus: "Verified",
        warmPath: "None found",
      },
      {
        name: "Priya Nair",
        title: "Sr. Manager, GRC",
        tier: 3,
        persona: "Technical Evaluator",
        why: "Runs HITRUST readiness — fastest reply path into the account.",
        email: "p.nair@meridianhealth.com",
        emailStatus: "Best-guess",
        warmPath: "None found",
      },
    ],
    campaign: {
      observation:
        "Meridian has 8 open security roles — 4 open 30+ days — against a fixed Q1 2027 HITRUST date.",
      proofPoints: [
        "Health-tech security roles average 71 days to fill in this market — their runway doesn't have that.",
        "We stood up a 5-person security pod for a Midwest health platform in 38 days.",
        "Their support org already proves the nearshore model works inside Meridian.",
      ],
      asset: "HITRUST Staffing Blueprint — role map + fill timeline against the Q1 date",
      touches: [
        { day: 1, channel: "LinkedIn", label: "Observation + Blueprint ask (Serrano)", status: "Due" },
        { day: 3, channel: "Email", label: "1+3 message (Serrano)", status: "Scheduled" },
        { day: 5, channel: "LinkedIn", label: "Champion entry (Okafor)", status: "Scheduled" },
        { day: 7, channel: "Call", label: "Live opener + voicemail (Serrano)", status: "Scheduled" },
        { day: 10, channel: "Email", label: "Deliver Blueprint", status: "Scheduled" },
      ],
      approval: "Awaiting review",
    },
    notes: [
      { date: "Jul 17", body: "Prior relationship: placed 2 engineers here via Procom in 2024. Re-introduction mode — lead with the fresh req volume, not nostalgia." },
    ],
    nextAction: "Review account brief",
    crm: { connected: true, system: "HubSpot", lastSync: "Today 6:02 AM" },
  },
  {
    id: "halcyon-data",
    name: "Halcyon Data",
    industry: "Data infrastructure",
    location: "Austin, TX",
    size: "~600 employees · Series D",
    status: "Campaign awaiting approval",
    urgency: "High",
    primarySignal: "14 senior data eng roles posted in 60 days",
    signalPillar: "Growth & Expansion",
    offering: {
      primary: "Nearshore data engineering pods",
      secondary: "Direct-hire recruiting (staff+ level)",
      why: "Req volume concentrated in Spark/dbt — exactly the profile our Costa Rica bench runs deep on.",
    },
    openRoles: [
      { title: "Staff Data Engineer", location: "Austin, TX", daysOpen: 52, verified: true },
      { title: "Sr. Data Engineer (dbt)", location: "Remote (US)", daysOpen: 47, verified: true },
      { title: "Analytics Engineer", location: "Austin, TX", daysOpen: 29, verified: true },
    ],
    whoTheyAre:
      "Streaming data platform for fintech and retail. Series D (Feb 2026, $120M). Stack: Spark, dbt, Snowflake, Kafka, AWS.",
    signals: [
      {
        title: "14 senior data engineering roles posted in the last 60 days",
        category: "Hiring surge",
        durability: "PERISHABLE",
        date: "Jul 2026",
        source: "LinkedIn Jobs + company ATS",
        audit: "Verified",
        confidence: "High",
        implication: "Post-raise scaling pressure — internal recruiting is the bottleneck.",
      },
      {
        title: "$120M Series D to \u201Cdouble platform engineering\u201D",
        category: "Funding",
        durability: "PERISHABLE",
        date: "Feb 2026",
        source: "Company announcement",
        audit: "Verified",
        confidence: "High",
        implication: "Budget exists; speed is the constraint.",
      },
    ],
    contacts: [
      {
        name: "Rachel Kim",
        title: "VP, Data Platform",
        tier: 1,
        persona: "Economic Buyer",
        why: "Named owner of the post-raise platform expansion.",
        email: "rkim@halcyondata.io",
        emailStatus: "Verified",
        warmPath: "None found",
      },
      {
        name: "Tomás Herrera",
        title: "Director, Data Engineering",
        tier: 2,
        persona: "Champion",
        why: "Owns 9 of the 14 open reqs.",
        email: "therrera@halcyondata.io",
        emailStatus: "Verified",
        warmPath: "Mutual: Austin Data Eng meetup organizer",
      },
    ],
    campaign: {
      observation:
        "Halcyon posted 14 senior data roles in 60 days — all Spark/dbt, concentrated in two locations.",
      proofPoints: [
        "Staff-level Spark engineers average 68 days to fill in Austin right now.",
        "We scaled a 6-person Costa Rica dbt pod for a fintech platform in 45 days.",
        "Same-time-zone pods keep standups intact — no follow-the-sun overhead.",
      ],
      asset: "Talent Map — Spark/dbt availability, US vs. Costa Rica, with comp bands",
      touches: [
        { day: 1, channel: "LinkedIn", label: "Observation + Talent Map ask (Herrera)", status: "Done" },
        { day: 3, channel: "Email", label: "1+3 message (Herrera)", status: "Done" },
        { day: 5, channel: "LinkedIn", label: "Economic buyer entry (Kim)", status: "Due" },
        { day: 7, channel: "Call", label: "Live opener (Herrera)", status: "Scheduled" },
        { day: 10, channel: "Email", label: "Deliver Talent Map", status: "Scheduled" },
      ],
      approval: "Active",
    },
    notes: [{ date: "Jul 16", body: "Herrera viewed profile after Touch 1. Warm." }],
    nextAction: "Send Touch 3 — Kim LinkedIn entry",
    crm: { connected: true, system: "HubSpot", lastSync: "Today 6:02 AM" },
  },
  {
    id: "lakeshore-apparel",
    name: "Lakeshore Apparel Group",
    industry: "Retail / Apparel",
    location: "Milwaukee, WI",
    size: "~2,100 employees · $640M est.",
    status: "Touch due today",
    urgency: "Medium",
    primarySignal: "New CTO + ERP migration announced",
    signalPillar: "Strategic Shifts",
    offering: {
      primary: "Contract staffing — ERP / integration",
      secondary: "Project staffing (data migration)",
      why: "New-leader window plus a dated migration: integration and data talent needs land before Q4 planning.",
    },
    openRoles: [
      { title: "ERP Integration Lead", location: "Milwaukee, WI", daysOpen: 22, verified: true },
      { title: "Data Migration Analyst", location: "Remote (US)", daysOpen: 18, verified: true },
    ],
    whoTheyAre:
      "Mid-market apparel group, four owned brands, DTC + wholesale. Independent (family-held). Moving from a legacy ERP to Dynamics 365 by mid-2027.",
    signals: [
      {
        title: "New CTO hired from a national retailer",
        category: "Leadership change",
        durability: "PERISHABLE",
        date: "Jun 2026",
        source: "Press release + LinkedIn",
        audit: "Verified",
        confidence: "High",
        implication: "New leaders staff their roadmap in the first 90 days.",
      },
      {
        title: "Dynamics 365 migration announced, target mid-2027",
        category: "Technology implementation",
        durability: "PERISHABLE",
        date: "Jun 2026",
        source: "Trade press",
        audit: "Verified",
        confidence: "High",
        implication: "Integration + data talent demand with a fixed end date.",
      },
    ],
    contacts: [
      {
        name: "Alan Brooks",
        title: "CTO",
        tier: 1,
        persona: "Economic Buyer",
        why: "Owns the migration and is building his org now.",
        email: "abrooks@lakeshoreapparel.com",
        emailStatus: "Best-guess",
        warmPath: "None found",
      },
      {
        name: "Simone Ruiz",
        title: "Director, Enterprise Applications",
        tier: 2,
        persona: "Champion",
        why: "Named migration lead in the announcement.",
        email: "sruiz@lakeshoreapparel.com",
        emailStatus: "Verified",
        warmPath: "None found",
      },
    ],
    campaign: {
      observation:
        "Lakeshore announced a Dynamics 365 migration with a mid-2027 target — and both migration roles posted so far are still open.",
      proofPoints: [
        "Retail ERP migrations that staff integration leads late run 40% past timeline on average.",
        "We staffed the integration bench for a two-brand apparel migration — go-live hit the date.",
      ],
      asset: "Migration Staffing Map — the 7 roles the mid-2027 date requires, sequenced",
      touches: [
        { day: 1, channel: "LinkedIn", label: "Observation + Map ask (Ruiz)", status: "Done" },
        { day: 3, channel: "Email", label: "1+3 message (Ruiz)", status: "Due" },
        { day: 7, channel: "Call", label: "Live opener (Ruiz)", status: "Scheduled" },
        { day: 10, channel: "LinkedIn", label: "Deliver Map excerpt", status: "Scheduled" },
        { day: 14, channel: "Email", label: "Soft close", status: "Scheduled" },
      ],
      approval: "Active",
    },
    notes: [],
    nextAction: "Send Touch 2 email — due today",
    crm: { connected: true, system: "HubSpot", lastSync: "Today 6:02 AM" },
  },
  {
    id: "prairie-financial",
    name: "Prairie Financial",
    industry: "Fintech",
    location: "Des Moines, IA",
    size: "~900 employees · $210M est.",
    status: "Reply needs action",
    urgency: "High",
    primarySignal: "Acquisition closed — integration PMO forming",
    signalPillar: "Growth & Expansion",
    offering: {
      primary: "Project staffing — PMO / integration",
      secondary: "Contract-to-hire (data + platform)",
      why: "Post-close integration windows are short: PMO, data consolidation, and platform roles spike in the first two quarters.",
    },
    openRoles: [
      { title: "Integration Program Manager", location: "Des Moines, IA", daysOpen: 12, verified: true },
    ],
    whoTheyAre:
      "Regional payments processor. Closed acquisition of a lending platform (Jun 2026). Independent, sub-$1B, no parent.",
    signals: [
      {
        title: "Acquisition of Cedar Lending closed",
        category: "M&A",
        durability: "PERISHABLE",
        date: "Jun 2026",
        source: "Two trade publications",
        audit: "Verified",
        confidence: "High",
        implication: "Integration talent demand is immediate and time-boxed.",
      },
    ],
    contacts: [
      {
        name: "Karen Boateng",
        title: "SVP, Operations",
        tier: 1,
        persona: "Economic Buyer",
        why: "Announced owner of the integration.",
        email: "kboateng@prairiefin.com",
        emailStatus: "Verified",
        warmPath: "None found",
      },
      {
        name: "Dave Lindqvist",
        title: "Director, PMO",
        tier: 2,
        persona: "Champion",
        why: "Replied to Touch 2 — asked for the Cost Analysis.",
        email: "dlindqvist@prairiefin.com",
        emailStatus: "Verified",
        warmPath: "None found",
      },
    ],
    campaign: {
      observation:
        "Prairie closed the Cedar acquisition four weeks ago and posted its first integration PM role within days.",
      proofPoints: [
        "Post-close integrations that fully staff the PMO in 60 days finish 2x more often on plan.",
        "We staffed a 4-person integration pod for a payments acquirer inside 5 weeks.",
      ],
      asset: "Integration Cost Analysis — contract vs. FTE for the first 6 months",
      touches: [
        { day: 1, channel: "LinkedIn", label: "Observation + Analysis ask (Lindqvist)", status: "Done" },
        { day: 3, channel: "Email", label: "1+3 message (Lindqvist)", status: "Done" },
        { day: 5, channel: "LinkedIn", label: "SVP entry (Boateng)", status: "Scheduled" },
        { day: 7, channel: "Call", label: "Live opener", status: "Scheduled" },
        { day: 10, channel: "Email", label: "Deliver Analysis", status: "Scheduled" },
      ],
      approval: "Active",
    },
    notes: [
      { date: "Jul 18", body: "REPLY — Lindqvist: \u201CSend the cost analysis, and copy Karen.\u201D Sequence paused. Route: send asset + set discovery follow-up." },
    ],
    nextAction: "Reply: send Cost Analysis, cc Boateng",
    crm: { connected: true, system: "HubSpot", lastSync: "Today 6:02 AM" },
  },
  {
    id: "verdant-systems",
    name: "Verdant Systems",
    industry: "AgTech",
    location: "Denver, CO",
    size: "~450 employees · Series C",
    status: "Follow-up due",
    urgency: "Low",
    primarySignal: "CEO: 'AI-first operations by 2027' + ML hiring uptick",
    signalPillar: "Strategic Shifts",
    offering: {
      primary: "AI/ML direct-hire recruiting",
      secondary: "Nearshore data teams",
      why: "Stated AI-first thesis with only 3 ML hires made — the maturity gap is the opening.",
    },
    openRoles: [
      { title: "ML Engineer", location: "Denver, CO", daysOpen: 38, verified: true },
      { title: "MLOps Engineer", location: "Remote (US)", daysOpen: 26, verified: true },
    ],
    whoTheyAre:
      "Precision-agriculture platform. Series C. CEO has publicly committed to AI-first operations by 2027; ML team is currently 6 people.",
    signals: [
      {
        title: "CEO keynote: \u201CAI-first operations by 2027\u201D",
        category: "Strategic transformation",
        durability: "DURABLE",
        date: "Mar 2026",
        source: "Industry conference keynote",
        audit: "Verified",
        confidence: "High",
        implication: "Reinforcement thesis — pressure persists, speaker in seat.",
      },
      {
        title: "2 open ML roles, one 38 days old",
        category: "Hiring",
        durability: "PERISHABLE",
        date: "Jul 2026",
        source: "Company ATS",
        audit: "Verified",
        confidence: "High",
        implication: "The lead hook — thesis is outrunning the team.",
      },
    ],
    contacts: [
      {
        name: "Ellen Marsh",
        title: "VP, Engineering",
        tier: 1,
        persona: "Economic Buyer",
        why: "ML org reports to her; owns the 2027 commitment.",
        email: "emarsh@verdantsystems.com",
        emailStatus: "Best-guess",
        warmPath: "None found",
      },
    ],
    campaign: {
      observation:
        "Verdant committed publicly to AI-first by 2027 — with a 6-person ML team and its senior req now 38 days open.",
      proofPoints: [
        "AI-first roadmaps stall at the MLOps layer first — it's the hardest seat to fill.",
        "We placed 5 ML/MLOps engineers for an ag-adjacent platform in one quarter.",
      ],
      asset: "AI Talent Map — the 2027 thesis translated into a hiring sequence",
      touches: [
        { day: 1, channel: "LinkedIn", label: "Observation + Map ask (Marsh)", status: "Done" },
        { day: 3, channel: "Email", label: "1+3 message (Marsh)", status: "Done" },
        { day: 14, channel: "Email", label: "Follow-up — soft close", status: "Due" },
        { day: 30, channel: "LinkedIn", label: "New-signal check-back", status: "Scheduled" },
        { day: 45, channel: "Email", label: "Nurture touch", status: "Scheduled" },
      ],
      approval: "Active",
    },
    notes: [{ date: "Jul 10", body: "No reply after two touches. Follow-up due — then nurture if quiet." }],
    nextAction: "Send day-14 follow-up",
    crm: { connected: true, system: "HubSpot", lastSync: "Today 6:02 AM" },
  },
];

export const getAccount = (id: string) => ACCOUNTS.find((a) => a.id === id);

// ---- Today rollups ----------------------------------------------------------

export const TODAY_STATS = (accounts: Account[]) => ({
  readyForReview: accounts.filter((a) => a.status === "Ready for review").length,
  touchesDue: accounts.reduce(
    (n, a) => n + a.campaign.touches.filter((t) => t.status === "Due").length,
    0
  ),
  replies: accounts.filter((a) => a.status === "Reply needs action").length,
  followUps: accounts.filter((a) => a.status === "Follow-up due").length,
});

// Queue order: replies first (a human is waiting), then due touches, then new
// intelligence, then follow-ups. OLLIN decides where the day starts.
const STATUS_RANK: Record<AccountStatus, number> = {
  "Reply needs action": 0,
  "Touch due today": 1,
  "Ready for review": 2,
  "Campaign awaiting approval": 3,
  "Follow-up due": 4,
};

export const todayQueue = (accounts: Account[]) =>
  [...accounts].sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]);

// ---- Hunt feed --------------------------------------------------------------

export type HuntItem = {
  company: string;
  industry: string;
  location: string;
  signal: string;
  durability: Durability;
  pillar: string;
  urgency: number; // 1-10
  window: string;
  offering: string;
};

export const HUNT_FEED: HuntItem[] = [
  {
    company: "Cobalt Grid",
    industry: "Energy software",
    location: "Minneapolis, MN",
    signal: "Series B ($45M) + 6 platform eng roles posted this week",
    durability: "PERISHABLE",
    pillar: "Growth & Expansion",
    urgency: 9,
    window: "Next 30 days",
    offering: "Nearshore engineering pods",
  },
  {
    company: "Marquette Brands",
    industry: "Consumer goods",
    location: "Chicago, IL",
    signal: "New CISO hired after disclosed incident",
    durability: "PERISHABLE",
    pillar: "Performance Pain",
    urgency: 8,
    window: "Next 45 days",
    offering: "Cybersecurity staffing",
  },
  {
    company: "Solstice Robotics",
    industry: "Robotics",
    location: "Ann Arbor, MI",
    signal: "CEO thesis: \u201Cvertical AI in every product line by 2028\u201D",
    durability: "DURABLE",
    pillar: "Strategic Shifts",
    urgency: 6,
    window: "Quarter",
    offering: "AI/ML direct hire",
  },
  {
    company: "Ridgeline Outfitters",
    industry: "Retail / Outdoor",
    location: "Boulder, CO",
    signal: "Q4 planning season + 3 merch ops roles reposted",
    durability: "PERISHABLE",
    pillar: "Hiring & HR Distress",
    urgency: 7,
    window: "Before Q4 lock",
    offering: "Merchandising + creative staffing",
  },
];

// ---- Activity ---------------------------------------------------------------

export type ActivityItem = {
  when: string;
  account: string;
  accountId: string;
  kind: "Reply" | "Email" | "LinkedIn" | "Call" | "Note" | "CRM";
  body: string;
};

export const ACTIVITY: ActivityItem[] = [
  { when: "Today 5:41 AM", account: "Prairie Financial", accountId: "prairie-financial", kind: "Reply", body: "Lindqvist replied: \u201CSend the cost analysis, and copy Karen.\u201D Sequence paused." },
  { when: "Today 6:02 AM", account: "All accounts", accountId: "", kind: "CRM", body: "HubSpot sync completed — 5 accounts, 11 contacts, 9 activities pushed." },
  { when: "Yesterday", account: "Halcyon Data", accountId: "halcyon-data", kind: "Email", body: "Touch 2 sent to Herrera — opened 2x." },
  { when: "Yesterday", account: "Lakeshore Apparel Group", accountId: "lakeshore-apparel", kind: "LinkedIn", body: "Touch 1 sent to Ruiz — accepted connection." },
  { when: "Jul 16", account: "Verdant Systems", accountId: "verdant-systems", kind: "Note", body: "No reply after two touches — day-14 follow-up scheduled." },
  { when: "Jul 15", account: "Meridian Health", accountId: "meridian-health", kind: "Note", body: "Account brief completed by OLLIN Intelligence. Ready for review." },
];

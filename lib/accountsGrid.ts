// Data for the Accounts card grid — one card per client company. Demo content;
// production reads from the accounts API + enrichment.

export type AccountStatus = "ACTIVE" | "NEEDS ATTENTION" | "NURTURE";

export type AccountCard = {
  id: string;
  name: string;
  status: AccountStatus;
  lastConvo: string;
  industry: string;
  hq: string;
  size: string;
  revenue: string;
  contacts: { name: string; role: string; when: string }[];
  signals: string[];
  news: { headline: string; source: string }[];
  stack: string[];
};

export const ACCOUNT_CARDS: AccountCard[] = [
  {
    id: "prairie-financial",
    name: "Prairie Financial",
    status: "ACTIVE",
    lastConvo: "They asked for the cost analysis before looping in their CFO.",
    industry: "Fintech",
    hq: "Des Moines, IA",
    size: "220-500",
    revenue: "$40M-$80M",
    contacts: [
      { name: "Daniel Boateng", role: "VP Ops", when: "2d ago" },
      { name: "Rachel Kim", role: "Integration Lead", when: "5d ago" },
    ],
    signals: ["Acquisition closed — integration PMO forming", "Headcount freeze lifted for PMO roles"],
    news: [
      { headline: "Prairie Financial completes Cedar acquisition", source: "Des Moines Register" },
      { headline: "New COO hired to lead integration", source: "LinkedIn" },
    ],
    stack: ["Workday", "Greenhouse", "NetSuite"],
  },
  {
    id: "lakeshore-apparel",
    name: "Lakeshore Apparel Group",
    status: "ACTIVE",
    lastConvo: "New CTO open to a call next week once ERP vendor is picked.",
    industry: "Retail / Apparel",
    hq: "Milwaukee, WI",
    size: "500-1,000",
    revenue: "$120M-$200M",
    contacts: [
      { name: "Javier Alvarez", role: "CTO", when: "1d ago" },
      { name: "Tessa Ng", role: "IT Director", when: "1wk ago" },
    ],
    signals: ["ERP migration announced", "2 open integration engineer reqs"],
    news: [{ headline: "New CTO hire announced", source: "Retail Dive" }],
    stack: ["SAP", "Salesforce", "Snowflake"],
  },
  {
    id: "meridian-health",
    name: "Meridian Health",
    status: "NEEDS ATTENTION",
    lastConvo: "No response since the account brief was sent 9 days ago.",
    industry: "Health-tech",
    hq: "Chicago, IL",
    size: "1,000-2,500",
    revenue: "$250M+",
    contacts: [
      { name: "Sonal Patel", role: "CISO", when: "9d ago" },
      { name: "Marcus Osei", role: "Recruiting Ops", when: "3wk ago" },
    ],
    signals: ["HITRUST deadline driving security hiring", "4 open cybersecurity roles, 30+ days"],
    news: [{ headline: "HITRUST certification deadline set for Q4", source: "Chicago Tribune" }],
    stack: ["Epic", "Okta", "ServiceNow"],
  },
  {
    id: "halcyon-data",
    name: "Halcyon Data",
    status: "ACTIVE",
    lastConvo: "Approved the nearshore pod proposal, drafting SOW this week.",
    industry: "Data infrastructure",
    hq: "Austin, TX",
    size: "100-220",
    revenue: "$20M-$40M",
    contacts: [
      { name: "Lena Fischer", role: "VP Engineering", when: "3d ago" },
      { name: "Alex Kim", role: "Talent Partner", when: "1wk ago" },
    ],
    signals: ["14 senior data eng roles posted in 60 days", "Budget approved for Q3 pods"],
    news: [{ headline: "Series C round closes at $60M", source: "TechCrunch" }],
    stack: ["Databricks", "Airflow", "AWS"],
  },
  {
    id: "verdant-systems",
    name: "Verdant Systems",
    status: "NURTURE",
    lastConvo: "CEO open to revisiting after their board meeting next month.",
    industry: "AgTech",
    hq: "Denver, CO",
    size: "220-500",
    revenue: "$40M-$80M",
    contacts: [
      { name: "Carlos Reyes", role: "CEO", when: "2wk ago" },
      { name: "Nadia Brooks", role: "Head of Data", when: "2wk ago" },
    ],
    signals: ["Public 'AI-first by 2027' commitment", "ML hiring uptick on job boards"],
    news: [{ headline: "CEO outlines AI-first roadmap at investor day", source: "AgFunder News" }],
    stack: ["Databricks", "GCP", "Looker"],
  },
  {
    id: "amazon-regional",
    name: "Amazon (Regional Logistics)",
    status: "ACTIVE",
    lastConvo: "Asked us to come back with a financial planner candidate slate.",
    industry: "Logistics",
    hq: "Regional HQ — Midwest",
    size: "2,500+",
    revenue: "$250M+",
    contacts: [
      { name: "Priya Whitfield", role: "Regional Director", when: "Today" },
      { name: "Sam Okafor", role: "Finance Lead", when: "4d ago" },
    ],
    signals: ["Regional finance team expansion", "Referral request: financial planner"],
    news: [{ headline: "Regional hub adds 3rd shift", source: "Internal" }],
    stack: ["Workday", "SAP Ariba"],
  },
];

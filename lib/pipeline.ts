// Data for the Pipeline screen — the master list of every lead/contact across
// every account, engine-sourced or manually uploaded. Demo content.

export type LeadSource = "ENGINE-SOURCED" | "MANUAL UPLOAD";

export type Lead = {
  id: string;
  name: string;
  role: string;
  company: string;
  source: LeadSource;
  stage: string; // IN ACTION / NURTURE / NEW
  signals: string[];
};

export const LEADS: Lead[] = [
  { id: "l1", name: "Daniel Boateng", role: "VP of Operations", company: "Prairie Financial", source: "ENGINE-SOURCED", stage: "IN ACTION", signals: ["Acquisition closed — integration PMO forming", "Headcount freeze lifted for PMO roles"] },
  { id: "l2", name: "Javier Alvarez", role: "CTO", company: "Lakeshore Apparel Group", source: "ENGINE-SOURCED", stage: "IN ACTION", signals: ["New CTO hire + ERP migration announced", "2 open integration engineer reqs"] },
  { id: "l3", name: "Sonal Patel", role: "CISO", company: "Meridian Health", source: "ENGINE-SOURCED", stage: "IN ACTION", signals: ["HITRUST deadline driving security hiring", "4 open cybersecurity roles, 30+ days"] },
  { id: "l4", name: "Lena Fischer", role: "VP Engineering", company: "Halcyon Data", source: "ENGINE-SOURCED", stage: "IN ACTION", signals: ["14 senior data eng roles posted in 60 days", "Budget approved for Q3 pods"] },
  { id: "l5", name: "Carlos Reyes", role: "CEO", company: "Verdant Systems", source: "ENGINE-SOURCED", stage: "NURTURE", signals: ["Public 'AI-first by 2027' commitment", "ML hiring uptick on job boards"] },
  { id: "l6", name: "Priya Whitfield", role: "Regional Director", company: "Amazon (Regional Logistics)", source: "MANUAL UPLOAD", stage: "NEW", signals: ["Regional finance team expansion", "Referral request: financial planner"] },
  { id: "l7", name: "Sam Okafor", role: "Finance Lead", company: "Amazon (Regional Logistics)", source: "MANUAL UPLOAD", stage: "NEW", signals: ["Regional finance team expansion"] },
];

# OLLIN

**Intelligence meets action.**

OLLIN is a unified revenue intelligence, business-development, outreach, and
workflow platform. It removes the guessing from sales: **OLLIN Intelligence**
finds and prepares the opportunity; **OLLIN Action** keeps things moving.

The AE walks in and **Today** is waiting — a ranked queue of prepared accounts:
the signal, the offering to emphasize, the verified contacts, the campaign, and
one clear next action. Replies first, then touches due, then fresh
intelligence, then follow-ups.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — OLLIN "Signal" token system
  (Ink `#0A100E` · Night `#0A150F` · Mint `#64D99E` · Mist `#E3E9E7` · Paper `#F9FEF9`)
- **Space Grotesk / Inter / IBM Plex Mono**
- **NextAuth + Upstash Redis** for accounts and sync
- **Anthropic API** available server-side via `/api/complete`

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev   # http://localhost:3000
```

Flip **Demo mode** in the sidebar to load the seeded pipeline (5 accounts,
live campaigns, activity thread). Demo off = clean empty states.

## Navigation

| Page      | Job                                                    |
| --------- | ------------------------------------------------------ |
| Today     | The ranked daily queue — start at the top              |
| Hunt      | New companies showing verified buying signals          |
| Accounts  | One record per account, shared by Intelligence + Action|
| Campaigns | Prepared five-touch sequences and their progress       |
| Activity  | Every message, call, note, reply, and CRM update       |

## CRM

Two supported models, per the product brief: connect an existing CRM
(HubSpot / Salesforce / Bullhorn) with OLLIN as the working surface — or run
everything in OLLIN and let it be the record. The demo shows the HubSpot-
connected model.

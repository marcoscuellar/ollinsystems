"use client";

import { usePathname } from "next/navigation";
import SupportWidget from "@/components/SupportWidget";

const TITLE_MAP: Record<string, [string, string]> = {
  "/": ["Today", "Your queue is ready. Start at the top."],
  "/hunt": ["Movement", "Your prepared queue and every next move"],
  "/accounts": ["Accounts", "Every account, one record, both layers — search to find one"],
  "/campaigns": ["Campaigns", "Prepared by Intelligence. Kept moving here."],
  "/activity": ["Stats", "Volume, replies, and what happened"],
  "/talent-showcase": ["Talent Showcase", "Bench-ready candidates, matched to open reqs"],
  "/redeploy": ["Redeploy", "Place rolling-off talent into new roles"],
};

export default function TopBar() {
  const pathname = usePathname();
  const key = "/" + (pathname.split("/")[1] ?? "");
  const [title, sub] = TITLE_MAP[key] ?? ["OLLIN", "Intelligence in motion."];

  return (
    <header className="sticky top-0 z-[5] flex items-center justify-between border-b border-muted-line bg-night/90 px-16 xl:px-32 py-5 backdrop-blur-md">
      <div>
        <div className="font-display text-[22px] font-bold tracking-[-0.01em] text-paper">{title}</div>
        <div className="mt-[2px] text-[13px] text-muted-fog">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <SupportWidget />
      </div>
    </header>
  );
}

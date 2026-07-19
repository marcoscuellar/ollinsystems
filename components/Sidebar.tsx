"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  OllinMark,
  TodayIcon,
  HuntIcon,
  AccountsIcon,
  CampaignsIcon,
  ActivityIcon,
} from "@/components/icons";
import SignOutButton from "@/components/SignOutButton";
import DemoToggle from "@/components/DemoToggle";

const NAV = [
  { href: "/", label: "Today", Icon: TodayIcon },
  { href: "/hunt", label: "Hunt", Icon: HuntIcon },
  { href: "/accounts", label: "Accounts", Icon: AccountsIcon },
  { href: "/campaigns", label: "Campaigns", Icon: CampaignsIcon },
  { href: "/activity", label: "Activity", Icon: ActivityIcon },
];

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "YN"
  );
}

export default function Sidebar({ userEmail, demo = false }: { userEmail?: string; demo?: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const displayName = userEmail ? userEmail.split("@")[0] : "You";
  const subline = userEmail || "Not signed in";

  const navLinkClass = (active: boolean) =>
    `flex w-full items-center gap-[11px] rounded-btn px-[16px] py-[11px] text-left font-display text-sm font-semibold transition-colors ${
      active
        ? "bg-mist text-ink"
        : "bg-transparent text-onink-soft hover:bg-white/[0.05] hover:text-mist"
    }`;

  return (
    <aside className="flex h-full flex-col gap-[26px] overflow-y-auto border-r border-muted-line bg-ink px-4 py-[22px] text-mist">
      <Link href="/" className="flex items-center gap-[11px] px-2 py-1">
        <OllinMark size={30} />
        <span className="font-display text-[19px] font-bold tracking-[0.04em] text-paper">OLLIN</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} className={navLinkClass(active)}>
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-[14px]">
        <div className="rounded-card bg-raised p-4">
          <div className="flex items-center gap-2 font-display text-[14px] font-bold text-mist">
            <span className="h-2 w-2 animate-pulseDot rounded-full bg-mint" />
            {demo ? "HubSpot connected" : "No CRM connected"}
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.06em] text-onink-faint">
            {demo ? "LAST SYNC · TODAY 6:02 AM" : "CONNECT ONE — OR LET OLLIN BE IT"}
          </div>
        </div>
        <DemoToggle demo={demo} />
        <div className="flex items-center gap-[10px] px-[6px] py-1">
          <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-mint font-display text-[13px] font-bold text-ink">
            {initials(displayName)}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="truncate font-display text-[13px] font-semibold capitalize text-paper">{displayName}</div>
            <div className="truncate text-[11px] text-onink-faint">{subline}</div>
          </div>
          {userEmail && <SignOutButton />}
        </div>
      </div>
    </aside>
  );
}

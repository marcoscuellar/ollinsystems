"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import {
  OllinMark,
  TodayIcon,
  HuntIcon,
  AccountsIcon,
  CampaignsIcon,
  ActivityIcon,
  TalentIcon,
  CollapseIcon,
} from "@/components/icons";
import SignOutButton from "@/components/SignOutButton";
import DemoToggle from "@/components/DemoToggle";

type IconType = ComponentType<{ size?: number; className?: string }>;
type NavItem =
  | { group: string; href?: string }
  | { href: string; label: string; Icon: IconType; child?: boolean };

const NAV: NavItem[] = [
  { href: "/", label: "Today", Icon: TodayIcon },
  { href: "/hunt", label: "Movement", Icon: HuntIcon },
  { group: "PIPELINE", href: "/pipeline" },
  { href: "/accounts", label: "Accounts", Icon: AccountsIcon, child: true },
  { href: "/campaigns", label: "Campaigns", Icon: CampaignsIcon, child: true },
  { href: "/activity", label: "Stats", Icon: ActivityIcon },
  { href: "/talent-showcase", label: "Talent Showcase", Icon: TalentIcon },
];

const COLLAPSE_KEY = "ollin-nav-collapsed";

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

  // Collapsed state, remembered across sessions. Starts expanded on the server
  // and first client paint (no localStorage on the server), then adopts the
  // saved preference on mount.
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
  }, []);
  const toggleCollapsed = () =>
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });

  const displayName = userEmail ? userEmail.split("@")[0] : "You";
  const subline = userEmail || "Not signed in";

  const navLinkClass = (active: boolean, child?: boolean) =>
    `flex w-full items-center rounded-btn py-[11px] text-left font-display text-sm font-semibold transition-colors ${
      collapsed ? "justify-center px-0" : child ? "gap-[11px] pl-[32px] pr-[16px]" : "gap-[11px] px-[16px]"
    } ${
      active ? "bg-mist text-ink" : "bg-transparent text-onink-soft hover:bg-white/[0.05] hover:text-mist"
    }`;

  return (
    <aside
      className={`flex h-full flex-col gap-[22px] overflow-y-auto overflow-x-hidden border-r border-muted-line bg-ink py-[22px] text-mist transition-[width] duration-200 ease-out ${
        collapsed ? "w-[76px] px-3" : "w-[236px] px-4"
      }`}
    >
      {/* Brand + collapse toggle */}
      <div className={`flex items-center ${collapsed ? "flex-col gap-3" : "justify-between"} px-1`}>
        <Link href="/" className="flex items-center gap-[11px] py-1" title="OLLIN">
          <OllinMark size={30} />
          {!collapsed && (
            <span className="font-display text-[19px] font-bold tracking-[0.04em] text-paper">OLLIN</span>
          )}
        </Link>
        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-btn text-onink-faint transition-colors hover:bg-white/[0.06] hover:text-mist"
        >
          <CollapseIcon size={18} className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item, i) => {
          if ("group" in item) {
            if (collapsed) return <div key={`g-${i}`} className="mx-auto my-2 h-px w-6 bg-muted-line" />;
            const groupClass = "px-[16px] pb-1 pt-3 font-mono text-[10px] tracking-[0.1em]";
            return item.href ? (
              <Link
                key={`g-${i}`}
                href={item.href}
                className={`${groupClass} transition-colors ${
                  isActive(item.href) ? "text-mint" : "text-onink-faint hover:text-mist"
                }`}
              >
                {item.group}
              </Link>
            ) : (
              <div key={`g-${i}`} className={`${groupClass} text-onink-faint`}>
                {item.group}
              </div>
            );
          }
          const { href, label, Icon, child } = item;
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={navLinkClass(active, child)}
              title={collapsed ? label : undefined}
            >
              <Icon />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex w-full flex-col gap-[14px]">
        {collapsed ? (
          <div
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-card bg-raised"
            title={demo ? "HubSpot connected" : "No CRM connected"}
          >
            <span className="h-2 w-2 animate-pulseDot rounded-full bg-mint" />
          </div>
        ) : (
          <div className="rounded-card bg-raised p-4">
            <div className="flex items-center gap-2 font-display text-[14px] font-bold text-mist">
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-mint" />
              {demo ? "HubSpot connected" : "No CRM connected"}
            </div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.06em] text-onink-faint">
              {demo ? "LAST SYNC · TODAY 6:02 AM" : "CONNECT ONE — OR LET OLLIN BE IT"}
            </div>
          </div>
        )}

        <DemoToggle demo={demo} collapsed={collapsed} />

        {collapsed ? (
          <div
            className="mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full bg-mint font-display text-[13px] font-bold text-ink"
            title={subline}
          >
            {initials(displayName)}
          </div>
        ) : (
          <div className="flex items-center gap-[10px] px-[6px] py-1">
            <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-mint font-display text-[13px] font-bold text-ink">
              {initials(displayName)}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="truncate font-display text-[13px] font-semibold capitalize text-paper">
                {displayName}
              </div>
              <div className="truncate text-[11px] text-onink-faint">{subline}</div>
            </div>
            {userEmail && <SignOutButton />}
          </div>
        )}
      </div>
    </aside>
  );
}

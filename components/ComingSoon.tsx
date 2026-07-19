import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

// Placeholder screen for nav destinations that are on the roadmap but not built
// yet (Talent Showcase, Redeploy). Same dark-card-on-white language as the rest
// of the app so it never feels broken.
export default function ComingSoon({
  eyebrow,
  title,
  sub,
  cta,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 px-[56px] py-8">
      <section className="relative overflow-hidden rounded-card bg-ink px-8 py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(100,217,158,0.16),transparent_70%)]"
        />
        <div className="relative max-w-[60ch]">
          <div className="font-mono text-[11px] tracking-[0.16em] text-mint">{eyebrow}</div>
          <h1 className="mt-3 font-display text-[30px] font-bold tracking-[-0.01em] text-paper">{title}</h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-onink-soft">{sub}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-btn bg-mint px-6 py-[12px] font-display text-[14px] font-bold text-ink transition-colors hover:bg-mint-deep"
            >
              {cta.label}
              <ArrowIcon size={15} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

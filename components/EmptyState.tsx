import Link from "next/link";

// Shared empty state for a real (non-demo) account with no activity yet.
export default function EmptyState({
  title,
  sub,
  cta,
}: {
  title: string;
  sub?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-muted-soft bg-ink px-6 py-14 text-center">
      <div className="font-display text-[16px] font-semibold text-paper">{title}</div>
      {sub && <p className="mt-2 max-w-[44ch] text-[14px] leading-[1.5] text-muted-fog">{sub}</p>}
      {cta && (
        <Link
          href={cta.href}
          className="mt-5 rounded-btn bg-mint px-5 py-[10px] font-display text-[13px] font-bold text-ink"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

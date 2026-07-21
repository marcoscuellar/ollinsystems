"use client";

import Link from "next/link";
import { motion } from "motion/react";

// The Priority Move card's main CTA. A tiny client component so the tap
// feedback can run inside the (server) Today page.
export default function PriorityCTA({ href }: { href: string }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
      <Link
        href={href}
        className="flex items-center justify-between rounded-[11px] bg-mint px-5 py-4 font-display text-[13px] font-bold text-ink transition-colors hover:bg-mint-deep"
      >
        Open prepared account <span>→</span>
      </Link>
    </motion.div>
  );
}

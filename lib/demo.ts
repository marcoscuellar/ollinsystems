import { cookies } from "next/headers";
import { auth } from "@/auth";

// Demo mode. When ON, the app shows the rich seeded sample data (for demos /
// presentations). When OFF, an approved account shows clean, empty states
// instead of placeholder numbers. Stored in the cb_demo cookie so server
// components can read it.
export const DEMO_COOKIE = "cb_demo";

/** The raw on/off value of the cookie, ignoring approval. Only meaningful
 *  once you already know the account is approved. */
export function demoCookieOn(): boolean {
  return cookies().get(DEMO_COOKIE)?.value === "1";
}

/** The demo state pages should actually render with. Unapproved accounts —
 *  including every self-serve signup until it's manually approved — are
 *  locked to the seeded demo no matter the cookie, so a wide-open trial
 *  account never sees (or racks up API cost against) real functionality. */
export async function isDemo(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.approved) return true;
  return demoCookieOn();
}

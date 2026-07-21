// Password accounts — user records live in the ollin-kv (Upstash Redis) store,
// keyed by email, with bcrypt-hashed passwords. Everything is env-guarded so a
// missing key never crashes the build/site.
import { Redis } from "@upstash/redis";
import bcrypt from "bcryptjs";

const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const redis = hasKv
  ? new Redis({
      url: process.env.KV_REST_API_URL as string,
      token: process.env.KV_REST_API_TOKEN as string,
    })
  : null;

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: number;
  approved: boolean;
};

const normalize = (email: string) => email.trim().toLowerCase();
const key = (email: string) => `cbuser:${normalize(email)}`;

/** Comma-separated allowlist (APPROVED_EMAILS env var) — always treated as
 *  approved, regardless of what's stored on the record. This isn't limited to
 *  internal staff: add an agency's email here once they've signed up (or
 *  paid) and they get real access — no data migration needed. */
export function isApprovedEmail(email: string): boolean {
  const list = (process.env.APPROVED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(normalize(email));
}

export async function getUser(email: string): Promise<UserRecord | null> {
  if (!redis || !email) return null;
  try {
    return (await redis.get<UserRecord>(key(email))) ?? null;
  } catch (err) {
    // A Redis hiccup here must never bubble up as an uncaught error inside
    // NextAuth's authorize() — that shows visitors the cryptic generic
    // "server configuration" error page instead of a clean sign-in failure.
    console.error("[getUser] KV read failed", err);
    return null;
  }
}

/** Create an account. Returns an error string if the email is taken or KV is off. */
export async function createUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!redis) return { ok: false, error: "Accounts aren't set up yet. Try again shortly." };

  const email = normalize(input.email);
  try {
    if (await redis.get(key(email))) {
      return { ok: false, error: "An account with that email already exists. Try signing in." };
    }

    const user: UserRecord = {
      id: crypto.randomUUID(),
      email,
      name: input.name?.trim() || "",
      passwordHash: await bcrypt.hash(input.password, 10),
      createdAt: Date.now(),
      // Self-serve signups start locked to demo data. Only APPROVED_EMAILS (or a
      // manually-flipped record) get real access and the AI endpoints.
      approved: isApprovedEmail(email),
    };
    await redis.set(key(email), user);
    return { ok: true };
  } catch (err) {
    console.error("[createUser] KV write failed", err);
    return { ok: false, error: "Couldn't create that account right now. Try again shortly." };
  }
}

/** Returns the user if the password matches, otherwise null. Approval checks
 *  the allowlist too, so adding an email to APPROVED_EMAILS approves existing
 *  accounts without a data migration. */
export async function verifyUser(email: string, password: string): Promise<UserRecord | null> {
  const user = await getUser(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { ...user, approved: user.approved || isApprovedEmail(user.email) };
}

/** Deletes an account record outright, so it can be recreated with a fresh
 *  password. Only used by /api/admin/reset-account, which restricts this to
 *  APPROVED_EMAILS — never callable for an arbitrary email. */
export async function deleteUser(email: string): Promise<void> {
  if (!redis) return;
  await redis.del(key(email));
}

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

/** Comma-separated allowlist (ADMIN_EMAILS env var) — always treated as
 *  approved, regardless of what's stored on the record. Lets you approve
 *  yourself without a manual data migration. */
export function isAdminEmail(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(normalize(email));
}

export async function getUser(email: string): Promise<UserRecord | null> {
  if (!redis || !email) return null;
  return (await redis.get<UserRecord>(key(email))) ?? null;
}

/** Create an account. Returns an error string if the email is taken or KV is off. */
export async function createUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!redis) return { ok: false, error: "Accounts aren't set up yet. Try again shortly." };

  const email = normalize(input.email);
  if (await redis.get(key(email))) {
    return { ok: false, error: "An account with that email already exists. Try signing in." };
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name: input.name?.trim() || "",
    passwordHash: await bcrypt.hash(input.password, 10),
    createdAt: Date.now(),
    // Self-serve signups start locked to demo data. Only ADMIN_EMAILS (or a
    // manually-flipped record) get real access and the AI endpoints.
    approved: isAdminEmail(email),
  };
  await redis.set(key(email), user);
  return { ok: true };
}

/** Returns the user if the password matches, otherwise null. Approval checks
 *  the allowlist too, so adding an email to ADMIN_EMAILS approves existing
 *  accounts without a data migration. */
export async function verifyUser(email: string, password: string): Promise<UserRecord | null> {
  const user = await getUser(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { ...user, approved: user.approved || isAdminEmail(user.email) };
}

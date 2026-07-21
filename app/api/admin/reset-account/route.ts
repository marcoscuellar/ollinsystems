import { NextRequest, NextResponse } from "next/server";
import { deleteUser, isApprovedEmail } from "@/lib/users";

export const runtime = "nodejs";

// Temporary self-service utility: visit /api/admin/reset-account?email=you@x.com
// to delete a stuck account so it can be recreated with a fresh password.
// Restricted to APPROVED_EMAILS so this can only ever nuke a trusted account,
// never an arbitrary signup. Safe to delete this route once it's not needed.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.trim() ?? "";
  if (!email) {
    return NextResponse.json({ error: "Add ?email=you@example.com to the URL." }, { status: 400 });
  }
  if (!isApprovedEmail(email)) {
    return NextResponse.json(
      { error: "That email isn't in APPROVED_EMAILS, so this tool won't touch it." },
      { status: 403 },
    );
  }

  await deleteUser(email);
  return NextResponse.json({ ok: true, message: `Deleted the account for ${email}. Go create it fresh now.` });
}

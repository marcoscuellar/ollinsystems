import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Built from the Edge-safe config only (no Credentials provider) — see
// auth.config.ts for why. Importing { auth } from "@/auth" here would pull
// bcrypt/Redis into the Edge middleware bundle.
const { auth: middleware } = NextAuth(authConfig);
export { middleware };

// Gate the app shell behind sign-in — /login (and everything under /api,
// which handles its own auth) stays open so the marketing page and account
// creation are always reachable. Signed-out visitors hitting any matched
// route get bounced to /login automatically (see the `authorized` callback
// in auth.config.ts).
export const config = {
  matcher: [
    "/",
    "/hunt/:path*",
    "/accounts/:path*",
    "/pipeline/:path*",
    "/campaigns/:path*",
    "/activity/:path*",
    "/talent-showcase/:path*",
    "/redeploy/:path*",
  ],
};

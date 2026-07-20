export { auth as middleware } from "@/auth";

// Gate the app shell behind sign-in — /login (and everything under /api,
// which handles its own auth) stays open so the marketing page and account
// creation are always reachable. Signed-out visitors hitting any matched
// route get bounced to /login automatically (see the `authorized` callback
// in auth.ts).
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

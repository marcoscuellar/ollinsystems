import type { NextAuthConfig } from "next-auth";

// Edge-safe half of the auth config — this is what middleware.ts uses.
// No providers here: the Credentials provider (auth.ts) pulls in bcryptjs
// and the Redis client, neither guaranteed to work on Next.js's Edge
// middleware runtime. Keeping this file provider-free means middleware's
// bundle never touches that code, avoiding session checks that silently
// misbehave on Edge (symptom: a sign-in/redirect loop).
export const authConfig: NextAuthConfig = {
  // No providers here on purpose — see file header. auth.ts adds Credentials.
  providers: [],
  pages: { signIn: "/login" },
  trustHost: true,
  callbacks: {
    // Used by middleware.ts to decide whether a request may reach the app —
    // signed out visitors get bounced to /login instead of seeing real pages.
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
    async jwt({ token, user }) {
      if (user) token.approved = user.approved;
      return token;
    },
    async session({ session, token }) {
      session.user.approved = Boolean(token.approved);
      return session;
    },
  },
};

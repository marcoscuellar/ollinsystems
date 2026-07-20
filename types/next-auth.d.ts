import type { DefaultSession } from "next-auth";

// Adds `approved` to the session/user/JWT shapes so TypeScript knows about it
// everywhere without `any` casts. Approved accounts get real (non-demo)
// access and can call the AI endpoints; everyone else is locked to demo data.
declare module "next-auth" {
  interface Session {
    user: {
      approved: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    approved: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    approved?: boolean;
  }
}

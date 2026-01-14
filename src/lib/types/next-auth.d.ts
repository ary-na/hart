// types/next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the `authorize()` callback of Credentials provider
   * → also what you get in jwt() callback as `user`
   */
  interface User {
    id: string; // you already return this
    email: string;
    firstName: string;
    role: "admin" | "customer";
    rememberMe?: boolean; // ← add this
  }

  /**
   * The shape of session.user when using useSession / getSession
   */
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      role: "admin" | "customer";
      // rememberMe is usually NOT needed in the final session
      // (it's only used to decide token lifetime → can stay in JWT only)
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** The JWT payload */
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    role: "admin" | "customer";
    rememberMe?: boolean; // ← this is the most important one for your use-case
    exp?: number;
  }
}

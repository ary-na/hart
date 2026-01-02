// src/lib/types/next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "admin" | "customer";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: "admin" | "customer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "admin" | "customer";
  }
}

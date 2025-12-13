// src/lib/types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    role: "admin" | "user";
  }
}

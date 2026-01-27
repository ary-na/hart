// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend NextRequest for middleware (req.auth)
declare module "next/server" {
  interface NextRequest {
    auth?: Session | null;
  }
}

// Extend the User type (from authorize() callback return value)
declare module "next-auth" {
  /**
   * Returned by authorize() and passed to jwt() as `user`
   */
  interface User extends DefaultUser {
    id: string;           // MongoDB _id as string
    firstName: string;
    role: "admin" | "customer";
    rememberMe?: boolean; // Only used temporarily to set token lifetime
  }

  /**
   * The shape of session.user (client: useSession(), server: getSession()/auth())
   */
  interface Session {
    user: {
      id: string;
      firstName: string;
      email: string;
      role: "admin" | "customer";
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }
}

// Extend the JWT payload
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    firstName: string;
    email: string;
    role: "admin" | "customer";
    rememberMe?: boolean; // Used in jwt() callback to set exp
    exp?: number;         // Optional, but good to declare if you override it
  }
}

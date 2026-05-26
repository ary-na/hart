// src/server/auth/auth.config.ts

import type { NextAuthConfig } from "next-auth";
import { User } from "@hart/server/models/User";
import { verifyPassword } from "@hart/server/auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@hart/server/db/mongodb";
import type { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const ONE_DAY = 24 * 60 * 60;
const THIRTY_DAYS = 30 * ONE_DAY;

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "checkbox" },
      },
      async authorize(
        credentials:
          | Partial<Record<"email" | "password" | "rememberMe", unknown>>
          | undefined,
        request: Request,
      ) {
        const userAgent = request.headers.get("user-agent") || "unknown";

        console.log("Sign-in attempt from user agent:", userAgent);

        if (userAgent.includes("BadBot")) {
          throw new Error("Access denied");
        }
        if (!credentials?.email || !credentials?.password) return null;
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email })
          .select("+password")
          .lean();
        if (!user) throw new Error("The email or password is incorrect.");

        if (!credentials || typeof credentials.password !== "string") {
          return null; // or throw error
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error("The email or password is incorrect.");
        if (!user.verified) {
          throw new Error("You must verify your email before signing in.");
        }

        // Pass rememberMe to token via user object
        return {
          id: user._id.toString(),
          firstName: user.firstName,
          email: user.email,
          role: user.role,
          rememberMe:
            credentials.rememberMe === true ||
            credentials.rememberMe === "on" ||
            credentials.rememberMe === "true",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name || profile.name?.split(" ")[0] || "",
          email: profile.email,
          role: "customer",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  jwt: {
    maxAge: THIRTY_DAYS,
  },
  callbacks: {
    async authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith("/user")) {
        return !!auth?.user;
      }

      if (pathname.startsWith("/admin")) {
        return auth?.user?.role === "admin";
      }

      return true;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        await connectToDatabase();
        const googleProfile = profile as GoogleProfile;
        if (!googleProfile.email) {
          console.error("Google profile missing email");
          return false;
        }
        // Find user by email
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user
          const newUser = await User.create({
            email: googleProfile.email,
            firstName:
              googleProfile.given_name ??
              googleProfile.name?.split(" ")[0] ??
              "",
            lastName: googleProfile.family_name ?? "",
            role: "customer",
            verified: true,
          });
          user.id = newUser._id.toString();
          user.role = newUser.role;
        } else {
          // Update existing
          existingUser.firstName =
            googleProfile.given_name ??
            googleProfile.name?.split(" ")[0] ??
            existingUser.firstName;
          existingUser.lastName =
            googleProfile.family_name ?? existingUser.lastName;
          await existingUser.save();
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
        }

        // Override firstName
        user.firstName =
          googleProfile.given_name ?? googleProfile.name?.split(" ")[0] ?? "";
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.email = user.email ?? token.email;
        token.role = user.role;
        token.rememberMe = user.rememberMe;
        const maxAge = token.rememberMe ? THIRTY_DAYS : 2 * 60 * 60; // 2 hours default
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }
      if (account?.provider === "google") {
        token.exp = Math.floor(Date.now() / 1000) + THIRTY_DAYS;
      }
      return token;
    },

    async session({ session, token }) {
      if (!token || !token.id) {
        session.user = {
          id: "",
          firstName: "",
          email: "",
          role: "customer",
          emailVerified: null,
        };
        return session;
      }
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        email: token.email as string,
        role: (token.role as "admin" | "customer") ?? "customer",
        emailVerified: (token.emailVerified as Date) ?? null,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};

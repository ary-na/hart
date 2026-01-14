import { User } from "@hart/server/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "@hart/server/auth";
import { connectToDatabase } from "@hart/server/db/mongodb";
import type { GoogleProfile } from "next-auth/providers/google";

const ONE_DAY = 24 * 60 * 60;
const THIRTY_DAYS = 30 * ONE_DAY;

interface Credentials {
  email: string;
  password: string;
  rememberMe?: string | boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email })
          .select("+password")
          .lean();

        if (!user) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

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

    // NEW: Google Provider
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

  callbacks: {
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
          // Create new user with Google info
          const newUser = await User.create({
            email: googleProfile.email,
            firstName:
              googleProfile.given_name ??
              googleProfile.name?.split(" ")[0] ??
              "",
            lastName: googleProfile.family_name ?? "",
            role: "customer",
          });
          user.id = newUser._id.toString();
        } else {
          // Update the existing user with latest Google name info
          existingUser.firstName =
            googleProfile.given_name ??
            googleProfile.name?.split(" ")[0] ??
            existingUser.firstName;
          existingUser.lastName =
            googleProfile.family_name ?? existingUser.lastName;
          await existingUser.save();

          user.id = existingUser._id.toString();
        }

        // Important: always override user.firstName with Google’s name
        user.firstName =
          googleProfile.given_name ?? googleProfile.name?.split(" ")[0] ?? "";
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // When called from signIn, `user` contains data from authorize()
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.rememberMe = user.rememberMe;

        // Set expiration based on rememberMe
        const maxAge = token.rememberMe ? THIRTY_DAYS : 2 * 60 * 60; // 2 hours
        token.exp = Math.floor(Date.now() / 1000) + maxAge; // exp in seconds
      }

      if (account?.provider === "google") {
        const maxAge = THIRTY_DAYS; // or logic for rememberMe if you add a checkbox
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }

      return token;
    },

    async session({ session, token }) {
      // If token is invalid or missing, return minimal session
      if (!token || !token.id) {
        session.user = {
          id: "",
          firstName: "",
          email: "",
          role: "customer",
        };
        return session;
      }

      // Populate session from token
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        email: token.email as string,
        role: (token.role as "admin" | "customer") ?? "customer",
      };

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  jwt: {
    maxAge: THIRTY_DAYS, // Fallback, but will be overridden by token.exp
  },
};

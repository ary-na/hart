import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

import { connectToDatabase } from "@harts/lib/db/mongodb";
import { User as UserModel } from "@harts/lib/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        await connectToDatabase();

        const user = await UserModel.findOne({
          username: credentials.username,
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 2 * 60 * 60, // 2 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  callbacks: {
    // @ts-expect-error - NextAuth v4 type definitions issue
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    // @ts-expect-error - NextAuth v4 type definitions issue
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

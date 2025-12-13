// src/server/auth/nAuth.ts

// NextAuth and CredentialsProvider imports
import CredentialsProvider from "next-auth/providers/credentials";

// Bcrypt import for password hashing
import bcrypt from "bcrypt";

// Database and model imports
import { connectToDatabase } from "@hart/server/db/mongodb";
import { User as UserModel } from "@hart/server/models/User";

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
          email: user.email,
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
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    // @ts-expect-error - NextAuth v4 type definitions issue
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;

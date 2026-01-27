// src/auth.ts

import NextAuth from "next-auth";
import { authConfig } from "@hart/server/auth/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

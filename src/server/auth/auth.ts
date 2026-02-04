// src/auth.ts

import { authConfig } from "./";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// src/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@hart/server/auth/auth";

export const { GET, POST } = handlers;

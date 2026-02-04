// src/proxy.ts

export { auth as proxy } from "@hart/server/auth";

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};

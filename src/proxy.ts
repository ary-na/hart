// src/proxy.ts

export { auth as proxy } from "@hart/auth";

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};

// src/proxy.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("/user")) {
          return !!token;
        }

        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        return true;
      },
    },
    pages: {
      signIn: "/404",
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};

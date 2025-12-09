import { withAuth } from "next-auth/middleware";

export const proxy = withAuth(
  function middleware() {
    return null;
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        return token?.role === "admin";
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};

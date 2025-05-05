import type { NextAuthConfig } from "next-auth";
import {
  apiAuthPrefix,
  auhRoutes,
  DEFAULT_LOGGED_IN_REDIRECT,
  publicRoutes,
  userRoutes,
  adminRoutes,
} from "./utils/routes";
import { allowedAdmins } from "./config";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user?.id || !!auth?.user?.email;
      const isAdmin = auth?.user?.email
        ? allowedAdmins?.includes(auth?.user?.email)
        : false;
      const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = auhRoutes.includes(nextUrl.pathname);
      const isUserRoute = userRoutes.includes(nextUrl.pathname);

      const isAdminRoute = adminRoutes.some((route) =>
        nextUrl.pathname.includes(route)
      );

      // const isAdminRoute = true;
      // if API route then allowed
      if (isApiAuthRoutes) return true;
      // if not logedin and auth route then allowed
      if (!isLoggedIn && isAuthRoute) return true;
      // if logedin and auth route then redirect to the default route i.e. dashboard
      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl));
      }
      // if not logedin and not public route and not auth route then direct to the login route
      if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
        return Response.redirect(new URL(auhRoutes[0], nextUrl));
      }
      // if logedin and and email of admin and admin route then allowed
      if (isLoggedIn && isAdmin && isAdminRoute) return true;
      // if logedin and and email of not admin and user route then allowed
      if (isLoggedIn && !isAdmin && isUserRoute) return true;
      // if not execute any case then redirect to login route
      return Response.redirect(new URL(auhRoutes[0], nextUrl));
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

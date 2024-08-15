import {
  apiAuthPrefix,
  publicRoutes,
  auhRoutes,
  adminRoutes,
  DEFAULT_LOGGED_IN_REDIRECT,
} from "@/utils/routes";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("req.auth>>", req.auth);
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = auhRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoutes) return;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(
      new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl.pathname)
    );
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(auhRoutes[0], nextUrl.pathname));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};

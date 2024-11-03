// import {
//   apiAuthPrefix,
//   publicRoutes,
//   auhRoutes,
//   adminRoutes,
//   DEFAULT_LOGGED_IN_REDIRECT,
// } from "@/utils/routes";
// // import { auth } from "./auth";

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
//   console.log("req.auth>>", req.auth);
//   const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = auhRoutes.includes(nextUrl.pathname);
//   if (isApiAuthRoutes) return;

//   if (isLoggedIn && isAuthRoute) {
//     return Response.redirect(
//       new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl.pathname)
//     );
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL(auhRoutes[0], nextUrl.pathname));
//   }
//   return;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
// };

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;
export { auth as middleware } from "./auth";

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/public/receipts/:path*",
    "/public/images/:path*",
  ],
  unstable_allowDynamic: [
    "../node_modules/mongoose/dist/browser.umd.js",
    // "../node_modules/lodash/**/*.js",
    "**/node_modules/lodash*/**/*.js",
  ],
};

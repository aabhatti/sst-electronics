export { auth as middleware } from "./auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/",
    "/public/receipts/:path*",
    "/public/images/:path*",
  ],
  unstable_allowDynamic: [
    "../node_modules/mongoose/dist/browser.umd.js",
    // "../node_modules/lodash/**/*.js",
    "**/node_modules/lodash*/**/*.js",
  ],
};

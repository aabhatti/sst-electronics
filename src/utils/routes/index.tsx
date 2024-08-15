/**
 * Any array routes that are accessible to the
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Any array routes that are used for authenticaion
 * These routes will redirect logged in users to the public default route
 * @type {string[]}
 */
export const auhRoutes = ["/login", "/register"];

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGGED_IN_REDIRECT = "/dashboard";

/**
 * Any array routes that are used for admin
 * These routes will redirect logged in admins to the admin routes
 * @type {string}
 */
export const adminRoutes = ["/dashboard", "/users", "/deals", "/installments"];

/**
 * Prefix for api authentication routes handlers
 * Routes that start with prefix for authentication
 * @type {string}
 */
export const apiAuthPrefix = "api/auth/";

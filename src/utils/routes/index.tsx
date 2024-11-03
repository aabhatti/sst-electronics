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
export const adminRoutes = [
  "/dashboard",
  "/users",
  "/deals",
  "/installments",
  "/details",
  "/public",
  "/receipts",
  "/images",
];

/**
 * Any array routes that are used for user
 * These routes will redirect logged in user to the user routes
 * @type {string}
 */
export const userRoutes = [
  "/dashboard",
  "/profile",
  "/userdeals",
  "/userinstallments",
];

/**
 * Prefix for api authentication routes handlers
 * Routes that start with prefix for authentication
 * @type {string}
 */
export const apiAuthPrefix = "api/auth/";

/**
 * these url used for admin api calls
 */
export const AdminUrls = {
  fetchAllUsers: (page: number, offset: number, search: string) => {
    return `/admin/users?page=${page}&offset=${offset}&searched=${
      search ? encodeURIComponent(search) : ""
    }`;
  },
  fetchUserDetails: (id: string) => {
    return `/admin/users/details/${id}`;
  },
  fetchAllDeals: (page: number, offset: number, search: string) => {
    return `/admin/deals?page=${page}&offset=${offset}&searched=${
      search ? encodeURIComponent(search) : ""
    }`;
  },
  fetchAllInstallments: (page: number, offset: number, search: string) => {
    return `/admin/installments?page=${page}&offset=${offset}&searched=${
      search ? encodeURIComponent(search) : ""
    }`;
  },
  queryUsers: (query: string) => "/admin/users/" + query,

  createUser: "/admin/users",
  createDeal: "/admin/deals",
  createInstallment: "/admin/installments",
};

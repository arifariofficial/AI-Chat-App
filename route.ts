/**
 * An array of routes that are acccessible to the public.
 * These rotues do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification", "/query"];

/**
 * An array of routes that are used for authentication.
 * These rotues will redirect to the login page if the user is not authenticated.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
  "/auth/logout",
];

/**
 * The prefix for API authencation routes.
 * Routes that start with this prefix are used for API authentication.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";

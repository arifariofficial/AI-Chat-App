// lib/locale-utils.ts

import { localizedRoutes } from "./localized-routes";
import { Locale } from "@/i18n.config";

export function getLocalizedPath(locale: Locale, routeKey: string): string {
  const routes = localizedRoutes[locale];
  const [topKey, subKey] = routeKey.split(".");

  if (subKey) {
    // Handle nested routes (e.g., "auth.signIn")
    const nestedRoutes = routes[topKey as keyof typeof routes];
    return nestedRoutes?.[subKey as keyof typeof nestedRoutes] || "/";
  }

  // Handle top-level routes
  const route = routes[routeKey as keyof typeof routes];
  return typeof route === "string" ? route : "/";
}

// Modified function to find route key from the given locale’s routes
export function findRouteKeyFromPath(
  path: string,
  locale: Locale,
): string | undefined {
  // Remove the locale prefix (e.g., "/en") from the path
  const trimmedPath = path.replace(`/${locale}`, "");

  const routes = localizedRoutes[locale];

  // Check top-level routes
  const topKey = Object.keys(routes).find(
    (key) => routes[key as keyof typeof routes] === trimmedPath,
  );
  if (topKey) return topKey;

  // Check nested routes (e.g., "auth.signIn")
  const nestedKey = Object.keys(routes).find((key) => {
    const nestedRoutes = routes[key as keyof typeof routes];
    if (typeof nestedRoutes === "object") {
      return Object.keys(nestedRoutes).find(
        (subKey) =>
          nestedRoutes[subKey as keyof typeof nestedRoutes] === trimmedPath,
      );
    }
    return false;
  });

  if (nestedKey) {
    // Combine top-level key with nested key (e.g., "auth.signIn")
    const subKey = Object.keys(
      routes[nestedKey as keyof typeof routes] || {},
    ).find(
      (key) =>
        (routes[nestedKey as keyof typeof routes] as Record<string, string>)[
          key as keyof Record<string, string>
        ] === trimmedPath,
    );
    return subKey ? `${nestedKey}.${subKey}` : undefined;
  }

  return undefined; // No matching route key found
}

import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { i18n, Locale } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";
import { findRouteKeyFromPath, getLocalizedPath } from "@/lib/locale-utils";

function getLocale(request: NextRequest): Locale | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, locales, i18n.defaultLocale) as Locale;
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const pathname = request.nextUrl.pathname;

    // Detect if the pathname is missing a locale
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      const detectedLocale = getLocale(request) || i18n.defaultLocale;

      // Extract route key for the current pathname
      const routeKey = findRouteKeyFromPath(pathname, i18n.defaultLocale);

      if (routeKey) {
        // Redirect to the detected locale with the corresponding localized path
        const localizedPath = getLocalizedPath(detectedLocale, routeKey);

        return NextResponse.redirect(
          new URL(`/${detectedLocale}${localizedPath}`, request.url),
        );
      }

      // Default to the homepage if no matching route key is found
      return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url));
    }

    // If the locale is already present, continue with the custom middleware
    return middleware(request, event, response);
  };
}

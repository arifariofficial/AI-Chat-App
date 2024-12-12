import React from "react";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";
import { notFound } from "next/navigation";
import AboutUsPage from "../about-us/page";
import ContactPage from "../contact/page";
import LoginPage from "../auth/login/page";
import ResetPage from "../auth/reset/page";
import ProfileLayout from "../profile/layout";
import ProfilePage from "../profile/(account)/page";
import { getDictionary } from "@/lib/dictionary";
import SubscriptionPage from "../profile/balance/page";
import SecurityPage from "../profile/security/page";
import CookiePolicyPage from "../cookie/page";
import TermsModal from "../terms/page";
import PrivacyPolicyPage from "../privacy/page";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>;
}) {
  const { lang, slug } = await params;

  const dictionary = await getDictionary(lang);

  // Validate the language
  if (!localizedRoutes[lang as keyof typeof localizedRoutes]) {
    console.error("Invalid language:", lang);
    notFound();
  }

  // Reconstruct the full path for matching
  const fullPath = `/${slug.join("/")}`;

  // Check for a top-level route match
  const topLevelKey = Object.keys(localizedRoutes[lang]).find(
    (key) =>
      localizedRoutes[lang as keyof typeof localizedRoutes][
        key as keyof (typeof localizedRoutes)["en"]
      ] === fullPath,
  );

  // Check for a nested auth route match
  const authKey = Object.keys(localizedRoutes[lang]?.auth || {}).find(
    (key) =>
      localizedRoutes[lang]?.auth?.[
        key as keyof (typeof localizedRoutes)["en"]["auth"]
      ] === fullPath,
  );

  // If no matching route, return 404
  if (!topLevelKey && !authKey) {
    console.error("No matching route for path:", fullPath);
    notFound();
  }

  // Handle matched top-level routes
  if (topLevelKey) {
    switch (topLevelKey) {
      case "aboutUs": {
        const aboutUsContent = await AboutUsPage({ params });
        return aboutUsContent;
      }
      case "contact":
        return <ContactPage />;
      case "account":
      case "balance":
      case "security": {
        const profileContent =
          topLevelKey === "account"
            ? await ProfilePage({ params })
            : topLevelKey === "balance"
              ? await SubscriptionPage({ params })
              : await SecurityPage({ params });
        return (
          <ProfileLayout lang={lang} dictionary={dictionary}>
            {profileContent}
          </ProfileLayout>
        );
      }
      case "cookiePolicy": {
        const cookiePolicyContent = await CookiePolicyPage({ params });
        return cookiePolicyContent;
      }
      case "privacy": {
        const privacyPolicyContent = await PrivacyPolicyPage({ params });
        return privacyPolicyContent;
      }
      case "terms": {
        const termsContent = await TermsModal({ params });
        return termsContent;
      }
      default:
        return (
          <div>
            Content for {topLevelKey} in {lang}
          </div>
        );
    }
  }

  // Handle matched auth routes
  if (authKey) {
    switch (authKey) {
      case "signIn": {
        const loginPage = await LoginPage({ params });
        return loginPage;
      }
      case "reset": {
        const resetPage = await ResetPage({ params });
        return resetPage;
      }
      case "signOut":
        return <div>Sign out page for {lang}</div>;
      case "register":
        return <div>Register page for {lang}</div>;
      default:
        return (
          <div>
            Auth content for {authKey} in {lang}
          </div>
        );
    }
  }

  // Fallback for unexpected cases
  notFound();
}

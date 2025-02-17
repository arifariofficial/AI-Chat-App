"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface CookieConsentProps {
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
}

const CookieConsent = ({ lang, dictionary, routes }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Essential cookies are always on
    personalization: false,
    marketing: false,
    analytics: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(cookieConsent));
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      personalization: true,
      marketing: true,
      analytics: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setPreferences(consent);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      personalization: false,
      marketing: false,
      analytics: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setPreferences(consent);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setIsSettingsOpen(false);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Basic Cookie Consent Popup */}
      {isVisible && (
        <div className="fixed bottom-4 right-0 z-50 mx-4 max-w-screen-sm animate-slideUp rounded-lg border border-border/40 bg-gray-100 p-4 text-foreground shadow-md dark:bg-gray-800 lg:w-[60%]">
          <p className="text-sm">{dictionary.cookieConsent.message}</p>
          <div className="mt-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(true)}
              className="w-full"
            >
              {dictionary.cookieConsent.manageSettings}
            </Button>
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="w-full"
            >
              {dictionary.cookieConsent.deleteCookies}
            </Button>
            <Button
              variant="default"
              onClick={handleAcceptAll}
              className="w-full"
            >
              {dictionary.cookieConsent.acceptAllCookies}
            </Button>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="m-4 w-full max-w-lg rounded-lg bg-background p-6 text-foreground shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {dictionary.cookieConsent.cookieSettings}
            </h2>
            <p className="mb-4 text-sm">
              {dictionary.cookieConsent.cookieSettingsDescription}
              <Link
                href={`/${lang}${routes.cookiePolicy}`}
                className="mx-0 ml-1 px-0 text-link underline hover:opacity-80"
              >
                <Button
                  onClick={() => setIsSettingsOpen(false)}
                  variant="link"
                  className="mx-0 px-0 hover:bg-inherit hover:text-foreground"
                >
                  {dictionary.cookieConsent.readMore}
                </Button>
              </Link>
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span> {dictionary.cookieConsent.essential}</span>
                <span className="text-muted-foreground">
                  {dictionary.cookieConsent.alwaysOn}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{dictionary.cookieConsent.personalized}</span>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={() => togglePreference("personalization")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{dictionary.cookieConsent.marketing}</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{dictionary.cookieConsent.analytics}</span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                className="w-[100px]"
                onClick={() => setIsSettingsOpen(false)}
              >
                {dictionary.input.cancelButtonLabel}
              </Button>
              <Button
                variant="default"
                onClick={handleSavePreferences}
                className="w-[100px]"
              >
                {dictionary.input.saveButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

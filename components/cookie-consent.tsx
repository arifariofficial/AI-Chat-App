"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CookieConsent = () => {
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
        <div className="fixed bottom-4 right-0 z-50 mx-4 max-w-screen-sm rounded-lg border border-border/40 bg-background p-4 text-foreground shadow-md lg:w-[50%]">
          <p className="text-sm">
            Käytämme evästeitä parantaaksemme sivustoa, analysoidaksemme käyttöä
            ja auttaaksemme markkinoinnissa.
          </p>
          <div className="mt-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(true)}
              className="w-full"
            >
              Hallinnoi asetuksia
            </Button>
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="w-full"
            >
              Poista kaikki evästeet
            </Button>
            <Button
              variant="default"
              onClick={handleAcceptAll}
              className="w-full"
            >
              Salli kaikki evästeet
            </Button>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="m-4 w-full max-w-lg rounded-lg bg-background p-6 text-foreground shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Evästeasetukset</h2>
            <p className="mb-4 text-sm">
              Mukauta evästeasetuksesi. Välttämättömät evästeet ovat aina
              käytössä, jotta sivusto toimii oikein.
              <Link
                href="/cookie-policy"
                className="ml-1 text-link underline hover:opacity-80"
              >
                Lue lisää
              </Link>
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Välttämättömät</span>
                <span className="text-muted-foreground">Always On</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Personointi</span>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={() => togglePreference("personalization")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Markkinointi</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Analytiikka</span>
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
                onClick={() => setIsSettingsOpen(false)}
              >
                Peruuta
              </Button>
              <Button variant="default" onClick={handleSavePreferences}>
                Tallenna
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

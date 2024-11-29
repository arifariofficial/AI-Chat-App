"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

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
        <div className="fixed bottom-4 right-4 z-50 w-[50%] rounded-lg border border-border/40 bg-background p-4 text-foreground shadow-md">
          <p className="text-sm">
            We use cookies to enhance your experience, analyze site usage, and
            assist in our marketing efforts.
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <Button
              variant="link"
              onClick={() => setIsSettingsOpen(true)}
              className="underline"
            >
              Manage Preferences
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject all cookies
            </Button>
            <Button variant="default" onClick={handleAcceptAll}>
              Allow all cookies
            </Button>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-background p-6 text-foreground shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Cookie Settings</h2>
            <p className="mb-4 text-sm">
              Customize your cookie preferences. Essential cookies are always
              enabled to ensure the website functions correctly.{" "}
              <a
                href="/cookie-policy"
                className="text-link underline hover:opacity-80"
              >
                Learn more
              </a>
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Essential</span>
                <span className="text-muted-foreground">Always On</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Personalization</span>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={() => togglePreference("personalization")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Marketing</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Analytics</span>
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
                Cancel
              </Button>
              <Button variant="default" onClick={handleSavePreferences}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

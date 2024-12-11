import ProfileSidebarMobile from "@/components/profile/profile-sidebar-mobile";
import ProfileSideBarDeskop from "@/components/profile/sidebar-desktop";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";
import { Dictionary } from "@/lib/types";
import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  dictionary: Dictionary;
}

export default function ProfileLayout({
  children,
  lang,
  dictionary,
}: ProfileLayoutProps) {
  const routes = localizedRoutes[lang];

  return (
    <div className="relative mx-auto flex size-full h-screen max-w-screen-2xl flex-col md:flex-row">
      <ProfileSideBarDeskop
        className="hidden md:flex"
        lang={lang}
        dictionary={dictionary}
        routes={routes}
      />
      <ProfileSidebarMobile
        className="sticky top-[56px] h-fit border-t border-border/20 bg-background pt-1 md:hidden"
        lang={lang}
        dictionary={dictionary}
        routes={routes}
      />

      <div className="flex size-full p-4">{children}</div>
    </div>
  );
}

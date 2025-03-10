"use server";

import { Locale } from "@/i18n.config";
import NavBar from "./nav-bar";
import { auth } from "@/auth";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";

const NavBarServer = async ({ lang }: { lang: Locale }) => {
  try {
    const [session, dictionary] = await Promise.all([
      auth(),
      getDictionary(lang),
    ]);

    const routes = localizedRoutes[lang];

    return (
      <NavBar
        session={session || null} // Explicitly handle null fallback
        lang={lang}
        dictionary={dictionary}
        routes={routes}
      />
    );
  } catch (error) {
    console.error("Error loading navbar data:", error);

    return (
      <div className="text-red-500">
        Error loading navigation bar. Please try again later.
      </div>
    );
  }
};

export default NavBarServer;

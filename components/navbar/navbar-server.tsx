// components/navbar/nav-bar-server.tsx

import { Locale } from "@/i18n.config";
import NavBar from "./nav-bar";
import { auth } from "@/auth";
import { getDictionary } from "@/lib/dictionary";

const NavBarServer = async ({ lang }: { lang: Locale }) => {
  try {
    const [session, dictionary] = await Promise.all([
      auth(),
      getDictionary(lang),
    ]);

    if (!session) {
      // Provide a fallback for logged-out users
      return <NavBar session={null} lang={lang} dictionary={dictionary} />;
    }

    return <NavBar session={session} lang={lang} dictionary={dictionary} />;
  } catch (error) {
    console.error("Error loading navbar data:", error);
    return <div>Error loading navigation bar.</div>;
  }
};

export default NavBarServer;

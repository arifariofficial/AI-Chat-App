// components/navbar/nav-bar-server.tsx
import { Locale } from "@/i18n.config";
import NavBar from "./nav-bar";
import { auth } from "@/auth";
import { getDictionary } from "@/lib/dictionary";

const NavBarServer = async ({ lang }: { lang: Locale }) => {
  const session = await auth();
  const dictionary = await getDictionary(lang);

  // Handle the case where there is no session
  if (!session) {
    return <NavBar session={null} lang={lang} dictionary={dictionary} />;
  }

  return <NavBar session={session} lang={lang} dictionary={dictionary} />;
};

export default NavBarServer;

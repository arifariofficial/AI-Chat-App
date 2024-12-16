import { LoginForm } from "@/components/auth/login-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Kirjautunut ulos",
  description: "Kirjaudu sisään uudelleen jatkaaksesi",
  icons: "/favicon.ico",
};

export default async function LogoutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const routes = localizedRoutes[lang];

  return (
    <LoginForm
      headerLabel="Kirjautunut ulos"
      dictionary={dictionary}
      lang={lang}
      routes={routes}
      className="mx-auto flex w-full flex-col"
    />
  );
}

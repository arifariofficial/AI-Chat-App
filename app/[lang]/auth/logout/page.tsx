import { LoginForm } from "@/components/auth/login-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Kirjautunut ulos",
  description: "Kirjaudu sisään uudelleen jatkaaksesi",
  icons: "/favicon.ico",
};

export default async function LogotPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <LoginForm
      headerLabel="Kirjautunut ulos"
      dictionary={dictionary}
      lang={lang}
    />
  );
}

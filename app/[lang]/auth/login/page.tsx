import { LoginForm } from "@/components/auth/login-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Kirjaudu sisään",
  description: "Kirjaudu sisään jatkaaksesi",
  icons: "/favicon.ico",
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <LoginForm
      headerLabel={dictionary.login.headerLabel}
      dictionary={dictionary}
      lang={lang}
      className="mx-auto flex w-full flex-col border"
    />
  );
}

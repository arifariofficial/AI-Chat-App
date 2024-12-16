import { RegisterForm } from "@/components/auth/register-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Create an account",
  description: "Please create an account to continue",
  icons: "/favicon.ico",
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const routes = localizedRoutes[lang];

  return (
    <RegisterForm
      dictionary={dictionary}
      lang={lang}
      routes={routes}
      className="mx-auto flex w-full flex-col"
    />
  );
}

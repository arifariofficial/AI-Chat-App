import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Reset Password",
  description: "Please enter your new password to reset your password",
  icons: "/favicon.ico",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const routes = localizedRoutes[lang];

  return (
    <ResetPasswordForm lang={lang} dictionary={dictionary} routes={routes} />
  );
}

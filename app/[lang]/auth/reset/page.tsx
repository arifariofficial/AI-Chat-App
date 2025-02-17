import { ResetForm } from "@/components/auth/reset-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Reset your password",
  description: "Please enter your email address to reset your password",
  icons: "/favicon.ico",
};

export default async function ResetPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ResetForm
      dictionary={dictionary}
      lang={lang}
      className="mx-auto flex w-full flex-col border"
    />
  );
}

import VerificationForm from "@/components/auth/verification-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Email Verification",
  description: "Please create an account to continue",
  icons: "/favicon.ico",
};

export default async function NewVerificationPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <VerificationForm dictionary={dictionary} lang={lang} />;
}

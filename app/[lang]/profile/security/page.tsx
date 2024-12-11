import Security from "@/components/profile/security";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Security",
  description: "Security Settings",
  icons: "/favicon.ico",
};

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return <Security dictionary={dictionary} />;
}

import Account from "@/components/profile/account";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Account",
  description: "Profile Settings",
  icons: "/favicon.ico",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <Account lang={lang} dictionary={dictionary} />;
}

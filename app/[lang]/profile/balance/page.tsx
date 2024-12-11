import Balance from "@/components/profile/balance";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Balance",
  description: "Balance Settings",
  icons: "/favicon.ico",
};

export default async function SubscriptionPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <Balance dictionary={dictionary} />;
}

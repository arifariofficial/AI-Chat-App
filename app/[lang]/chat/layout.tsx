import { i18n, Locale } from "@/i18n.config";
import ServerWrapper from "./server-wrapper";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const serverWrapper = await ServerWrapper({ lang, children });
  return serverWrapper;
}

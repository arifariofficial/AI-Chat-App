import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";
import { redirect } from "next/navigation";

export default async function NewPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const routes = localizedRoutes[lang];

  redirect(`/${lang}${routes.chat}`);
}

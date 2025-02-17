import CookiePolicy from "@/components/cookie-policy";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const CookiePolicyPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return <CookiePolicy dictionary={dictionary} />;
};
export default CookiePolicyPage;

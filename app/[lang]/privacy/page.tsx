import PrivacyPolicy from "@/components/privacy-policy";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const PrivacyPolicyPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return <PrivacyPolicy dictionary={dictionary} />;
};
export default PrivacyPolicyPage;

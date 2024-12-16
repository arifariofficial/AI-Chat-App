import TermsAndConditions from "@/components/terms-and-conditions";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const TermsAndConditionsPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return <TermsAndConditions dictionary={dictionary} />;
};
export default TermsAndConditionsPage;

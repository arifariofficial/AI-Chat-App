import ContactForm from "@/components/contact/contact";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";

const ContactPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const routes = localizedRoutes[lang];
  // add elinas email
  return <ContactForm dictionary={dictionary} lang={lang} routes={routes} />;
};
export default ContactPage;

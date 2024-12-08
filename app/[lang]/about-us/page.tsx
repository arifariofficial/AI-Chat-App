import { AboutUs } from "@/components/about-us/about-us";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const AboutUsPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <AboutUs />
      <Footer dictionary={dictionary} lang={lang} />
    </div>
  );
};
export default AboutUsPage;

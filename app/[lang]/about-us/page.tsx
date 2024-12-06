import { AboutUsPage } from "@/components/about-us/about-us";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const AboutUs = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  if (!dictionary) {
    return null;
  }

  return (
    <div>
      <AboutUsPage />
      <Footer dictionary={dictionary} lang={lang} />
    </div>
  );
};
export default AboutUs;

import { AboutUs } from "@/components/about-us/about-us";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localizedRoutes } from "@/lib/localized-routes";

const AboutUsPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const routes = localizedRoutes[lang];

  return (
    <div className="container mx-auto flex w-full max-w-screen-2xl flex-col">
      <AboutUs dictionary={dictionary} />
      <Footer
        dictionary={dictionary}
        lang={lang}
        routes={routes}
        className="px-[5%] md:px-[10%]"
      />
    </div>
  );
};
export default AboutUsPage;

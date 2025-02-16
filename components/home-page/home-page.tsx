import { getDictionary } from "@/lib/dictionary";
import { Footer } from "../footer";
import { BenefitSection } from "./benefit";
import { ContactSection } from "./contact";
import { CtaSection } from "./cta-section";
import { FeatureSectionList } from "./feature-list";
import { FeatureSection } from "./features";
import { auth } from "@/auth";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";

interface HomePageProps {
  lang: Locale;
}

export default async function HomePage({ lang }: HomePageProps) {
  const session = await auth();

  const dictionary = await getDictionary(lang);

  const routes = localizedRoutes[lang];

  if (!dictionary) {
    return null;
  }

  return (
    <div className="container mx-auto flex max-w-screen-2xl flex-col px-[5%] md:px-[10%]">
      <FeatureSection dictionary={dictionary} />
      {/*  <HeroSection session={session} dictionary={dictionary} lang={lang} /> this will go to about us*/}
      <FeatureSectionList
        session={session}
        dictionary={dictionary}
        lang={lang}
      />

      <BenefitSection dictionary={dictionary} />
      <CtaSection dictionary={dictionary} lang={lang} />
      <ContactSection dictionary={dictionary} />
      <Footer dictionary={dictionary} lang={lang} routes={routes} />
    </div>
  );
}

import { getDictionary } from "@/lib/dictionary";
import { Footer } from "../footer";
import { BenefitSection } from "./benefit";
import { ContactSection } from "./contact";
import { CtaSection } from "./cta-section";
import { FaqSection } from "./faq";
import { FeatureSectionList } from "./feature-list";
import { FeatureSection } from "./features";
import { HeroSection } from "./hero-section";
import { TestimonialSection } from "./testimonial";
import { auth } from "@/auth";
import { Locale } from "@/i18n.config";

interface HomePageProps {
  lang: Locale;
}

export default async function HomePage({ lang }: HomePageProps) {
  const session = await auth();

  const dictionary = await getDictionary(lang);

  if (!dictionary) {
    return null;
  }

  return (
    <div className="container mx-auto flex max-w-screen-2xl flex-col px-[5%] md:px-[10%]">
      <HeroSection session={session} dictionary={dictionary} lang={lang} />
      <FeatureSection dictionary={dictionary} />
      {session && (
        <FeatureSectionList
          session={session}
          dictionary={dictionary}
          lang={lang}
        />
      )}
      <BenefitSection dictionary={dictionary} />
      <FaqSection dictionary={dictionary} lang={lang} />
      <CtaSection dictionary={dictionary} lang={lang} />
      <TestimonialSection dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
      <Footer dictionary={dictionary} lang={lang} />
    </div>
  );
}

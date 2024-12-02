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

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="container mx-auto flex max-w-screen-2xl flex-col px-[3%] md:px-[5%]">
      <HeroSection session={session} />
      <FeatureSection />
      <FeatureSectionList session={session} />
      <BenefitSection />
      <FaqSection />
      <CtaSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

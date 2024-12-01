import { Footer } from "../footer";
import { BenefitSection } from "./benefit";
import { ContactSection } from "./contact";
import { CtaSection } from "./cta-section";
import { FaqSection } from "./faq";
import { FeatureSectionList } from "./feature-list";
import { FeatureSection } from "./features";
import { HeroSection } from "./hero-section";
import { TestimonialSection } from "./testimonial";

export default function HomePage() {
  return (
    <div className="container mx-auto flex max-w-screen-2xl flex-col p-10">
      <HeroSection />
      <FeatureSection />
      <FeatureSectionList />
      <BenefitSection />
      <FaqSection />
      <CtaSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

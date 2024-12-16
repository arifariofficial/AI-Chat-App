import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";

interface FaqSectionProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const FaqSection = ({ dictionary, lang }: FaqSectionProps) => {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {dictionary.faqSection.heading}
            </h2>
            <p className="md:text-md">{dictionary.faqSection.description}</p>
          </div>
        </div>
        <Accordion
          type="multiple"
          className="grid w-full grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-2"
        >
          {dictionary.faqSection.questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-border/60 px-5 md:px-6"
            >
              <AccordionTrigger className="md:text-md hover:bg-inherit hover:text-foreground md:py-5 [&[data-state=open]>svg]:rotate-180">
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="md:mt-18 mx-auto mt-12 max-w-md text-center lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {dictionary.faqSection.footerHeading}
          </h4>
          <p className="md:text-md">
            {dictionary.faqSection.footerDescription}
          </p>
          <div className="mt-6 md:mt-8">
            <Button asChild variant="outline">
              <a href={`/${lang}/contact`}>{dictionary.faqSection.contactUs}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

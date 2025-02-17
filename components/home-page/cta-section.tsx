import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";

interface CtaSectionProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const CtaSection = ({ dictionary, lang }: CtaSectionProps) => {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="grid auto-cols-fr grid-cols-1 rounded-lg border border-border/40 p-1 shadow-md">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {dictionary.ctaSection.heading}
            </h2>
            <p className="md:text-md">{dictionary.ctaSection.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Link href={`${lang}/chat`}>
                <Button variant="black">{dictionary.ctaSection.button1}</Button>
              </Link>
              <Link href={`${lang}/more`}>
                <Button variant="outline">
                  {dictionary.ctaSection.button2}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src="/assets/car-accident.jpg"
              alt="Car Accident"
              className="h-full w-auto scale-[1.2] object-cover opacity-70"
              width={720}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

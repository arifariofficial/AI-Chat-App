import Image from "next/image";
import { IconBulb, IconClock } from "../ui/icons";
import React from "react";
import { Dictionary } from "@/lib/types";

interface BenefitSectionProps {
  dictionary: Dictionary;
}

export const BenefitSection = ({ dictionary }: BenefitSectionProps) => {
  const icons = [IconClock, IconBulb];
  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
          {dictionary.benefits.heading}
        </h1>
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="md:text-md mb-6 md:mb-8">
              {dictionary.benefits.description}
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {dictionary.benefits.subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mx-auto mb-3 w-full md:mb-4">
                    {React.createElement(icons[index])}
                  </div>
                  <h6 className="text-md mb-3 font-bold leading-[1.4] md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p>{subHeading.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/assets/benefit-1.webp"
              className="size-full rounded-lg object-cover opacity-40"
              alt="Benefit 1 placeholder image"
              width={700}
              height={700}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

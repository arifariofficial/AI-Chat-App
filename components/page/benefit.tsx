import Image from "next/image";
import { IconBulb, IconClock } from "../ui/icons";
import React from "react";

const BenefitSectionDefaults: BenefitSectionProps = {
  heading:
    "Discover the transformative benefits of our AI-powered rights information app.",
  description:
    "Our AI app streamlines the process of understanding your rights, saving you valuable time. With precise information at your fingertips, you can navigate your case with confidence.",
  subHeadings: [
    {
      icon: <IconClock />,
      title: "Time-Saving",
      description:
        "Get instant access to essential information without the hassle of extensive research.",
    },
    {
      icon: <IconBulb />,
      title: "Accurate Insights",
      description:
        "Rely on our AI for accurate, up-to-date information tailored to your specific situation.",
    },
  ],
  image: {
    src: "/assets/benefit-1.webp",
    alt: "Secure family",
  },
};

type ImageProps = {
  src: string;
  alt?: string;
};

type SubHeadingProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Props = {
  heading: string;
  description: string;
  subHeadings: SubHeadingProps[];
  image: ImageProps;
};

type BenefitSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const BenefitSection = (props: BenefitSectionProps) => {
  const { heading, description, image, subHeadings } = {
    ...BenefitSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="md:text-md mb-6 md:mb-8">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mx-auto mb-3 w-full md:mb-4">
                    {subHeading.icon}
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
              src={image.src}
              className="size-full rounded-lg object-cover opacity-40"
              alt={image.alt!}
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

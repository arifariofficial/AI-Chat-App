"use client";

import Image from "next/image";
import { Button } from "../ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  features: { title: string; description: string; image: ImageProps }[];
};

export type FeatureSectionListProps =
  React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const FeatureSectionList = (props: FeatureSectionListProps) => {
  const { heading, description, features } = {
    ...FeatureSectionListDefaults,
    ...props,
  } as Props;

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 text-center lg:mb-20">
          <h1 className="text-4xl font-bold lg:text-6xl">{heading}</h1>
          <p className="mt-4 text-lg">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {features.map((feature, index) => (
            <div key={index} className="cursor-pointer text-center">
              <Image
                src={feature.image.src}
                alt={feature.image.alt!}
                width={720}
                height={480}
                className="mb-4 h-48 w-full object-cover"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex w-full items-center justify-center gap-4">
          <Button variant="outline">Learn More</Button>
          <Button variant="outline">
            Sign Up <span className="ml-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export const FeatureSectionListDefaults: FeatureSectionListProps = {
  heading: "Discover Your Rights with Our AI App",
  description:
    "Our AI app simplifies the process of understanding your rights. With just a few taps, you can access crucial information tailored to your specific case.",
  features: [
    {
      title: "Effortless Access to Essential Information",
      description:
        "Get instant access to vital information at your fingertips.",
      image: {
        src: "./assets/placeholder-image.svg",
        alt: "Placeholder image 1",
      },
    },
    {
      title: "Tailored Analysis for Your Unique Situation",
      description:
        "Our app provides personalized insights based on your circumstances.",
      image: {
        src: "./assets/placeholder-image.svg",
        alt: "Placeholder image 2",
      },
    },
    {
      title: "Stay Informed with Current Data",
      description:
        "Access reliable and up-to-date information whenever you need it.",
      image: {
        src: "./assets/placeholder-image.svg",
        alt: "Placeholder image 3",
      },
    },
  ],
};

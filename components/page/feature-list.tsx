"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";

interface FeatureSectionListProps {
  dictionary: Dictionary;
  session: Session;
  lang: Locale;
}

export const FeatureSectionList = ({
  dictionary,
  session,
  lang,
}: FeatureSectionListProps) => {
  const handleSignUp = () => {
    if (session) {
      // User is already logged in
      alert(dictionary.featuresList.notification);
    } else {
      // Redirect to login page
      window.location.href = `${lang}/auth/login`;
    }
  };

  const images = [
    {
      src: "/assets/features-1.webp",
      alt: "Feature 1 placeholder image",
    },
    {
      src: "/assets/features-2.webp",
      alt: "Feature 2 placeholder image",
    },
    {
      src: "/assets/features-3.webp",
      alt: "Feature 3 placeholder image",
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 text-center lg:mb-20">
          <h1 className="text-4xl font-bold lg:text-6xl">
            {dictionary.featuresList.heading}
          </h1>
          <p className="mt-4 text-lg">{dictionary.features.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {dictionary.featuresList.features.map((feature, index) => (
            <div key={index} className="mb-4 overflow-hidden text-center">
              <Image
                src={images[index].src!}
                alt={images[index].alt!}
                width={400}
                height={400}
                priority
                className="mb-4 w-auto rounded-lg object-cover opacity-50 shadow-sm"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex w-full items-center justify-center gap-4">
          <Link href="/more">
            <Button variant="outline">
              {dictionary.featuresList.buttonText}
            </Button>
          </Link>

          <Button onClick={handleSignUp}>
            {dictionary.auth.signup} <span className="ml-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";

const FeatureSectionListDefaults: FeatureSectionListProps = {
  heading: "Unlock the Benefits of Our AI App",
  description:
    "Our AI app simplifies the process of understanding your rights. With just a few taps, you can access crucial information tailored to your specific case.",
  features: [
    {
      title: "Effortless Access to Essential Information",
      description:
        "Get instant access to vital information at your fingertips.",
      image: {
        src: "/assets/features-1.webp",
        alt: "Features 1 placeholder image",
      },
    },
    {
      title: "Tailored Analysis for Your Unique Situation",
      description:
        "Our app provides personalized insights based on your circumstances.",
      image: {
        src: "/assets/features-2.webp",
        alt: "Features 2 placeholder image",
      },
    },
    {
      title: "Stay Informed with Current Data",
      description:
        "Access reliable and up-to-date information whenever you need it.",
      image: {
        src: "/assets/features-3.webp",
        alt: "Feature 3 placeholder image",
      },
    },
  ],
};

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  heading: string;
  description: string;
  features: { title: string; description: string; image: ImageProps }[];
  session: Session | null;
};

type FeatureSectionListProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const FeatureSectionList = (props: FeatureSectionListProps) => {
  const { heading, description, features, session } = {
    ...FeatureSectionListDefaults,
    ...props,
  } as Props;

  const handleSignUp = () => {
    if (session) {
      // User is already logged in
      alert("You are already logged in.");
    } else {
      // Redirect to login page
      window.location.href = "/auth/register";
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 text-center lg:mb-20">
          <h1 className="text-4xl font-bold lg:text-6xl">{heading}</h1>
          <p className="mt-4 text-lg">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {features.map((feature, index) => (
            <div key={index} className="mb-4 overflow-hidden text-center">
              <Image
                src={feature.image.src}
                alt={feature.image.alt!}
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
            <Button variant="outline">Learn More</Button>
          </Link>

          <Button variant="outline" onClick={handleSignUp}>
            Sign Up <span className="ml-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  inputPlaceholder: string;
  button: ButtonProps;
  termsAndConditions: string;
  image: ImageProps;
};

export type HeroSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const HeroSection = (props: HeroSectionProps) => {
  const {
    heading,
    description,
    inputPlaceholder,
    button,
    termsAndConditions,
    image,
  } = {
    ...HeroSectionDefaults,
    ...props,
  } as Props;

  const [emailInput, setEmailInput] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      emailInput,
    });
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:grid-cols-2 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <div>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                onSubmit={handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={inputPlaceholder}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <Button {...button} variant="outline">
                  {button.title}
                </Button>
              </form>
              <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image.src}
            className="w-full rounded-lg object-cover opacity-80"
            alt={image.alt!}
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export const HeroSectionDefaults: HeroSectionProps = {
  heading: "Empowering You with Knowledge of Your Rights",
  description:
    "At our startup, we are dedicated to providing you with essential information about your rights in various situations. Discover how our innovative AI app can guide you through your specific case and ensure you receive the support you deserve.",
  inputPlaceholder: "Enter your email",
  button: { title: "Sign up" },
  termsAndConditions: `
        <p class='text-xs'>
          By clicking Sign Up you're confirming that you agree with our
          <a href='#' class='underline'>Terms and Conditions</a>.
        </p>
        `,
  image: {
    src: "/assets/ai-law.jpg",
    alt: "Relume placeholder image",
  },
};

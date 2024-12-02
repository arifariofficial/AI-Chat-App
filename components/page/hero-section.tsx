"use client";

import { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { IconSpinner } from "../ui/icons";
import { useRouter } from "next/navigation";
import TermsModal from "../terms-modal";
import { Session } from "next-auth";

const HeroSectionDefaults: HeroSectionProps = {
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
    src: "/assets/family-legal-advice.jpg",
    alt: "Family Legal Advice",
  },
};

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
  session: Session | null;
};

type HeroSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

// Function to dynamically create email validation schema
const createEmailSchema = (sessionEmail: string | null) =>
  z.object({
    email: z
      .string()
      .min(1, "No email entered")
      .email("Please enter a valid email address")
      .refine((email) => !sessionEmail || email !== sessionEmail, {
        message: "You have already signed up with this email.",
      }),
  });

export const HeroSection = (props: HeroSectionProps) => {
  const { heading, description, inputPlaceholder, button, image, session } = {
    ...HeroSectionDefaults,
    ...props,
  } as Props;

  const sessionEmail = session?.user?.email || null;

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createEmailSchema(sessionEmail)),
    defaultValues: { email: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit: SubmitHandler<
    z.infer<ReturnType<typeof createEmailSchema>>
  > = (data) => {
    setIsSubmitting(true);

    if (session) {
      // If user is already logged in, alert the user and close the modal
      alert(
        "You are already logged in. Please sign out to register witha new email.",
      );
      setIsSubmitting(false);
      return;
    }

    // Navigate to the register page with the email as a query parameter
    router.push(`/auth/register?email=${encodeURIComponent(data.email)}`);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:grid-cols-2 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <div>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mb-2 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder={inputPlaceholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                  >
                    {isSubmitting ? <IconSpinner /> : button.title}
                  </Button>
                </form>
              </Form>
              <div className="text-xs">
                By clicking Sign Up you&apos;re confirming that you agree with
                our{" "}
                <button
                  className="m-0 inline p-0 align-baseline text-inherit underline hover:no-underline focus:outline-none"
                  onClick={handleOpenModal} // Open the modal
                >
                  Terms and Conditions
                </button>
                .
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <Image
            src={image.src}
            className="w-full rounded-lg object-cover opacity-80"
            alt={image.alt!}
            width={600}
            height={600}
            priority
          />
        </div>
      </div>
      {/* Modal */}
      <TermsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

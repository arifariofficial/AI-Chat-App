"use client";

import { useState } from "react";
import { Button } from "../ui/button";
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
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";

type Props = {
  session: Session | null;
  dictionary: Dictionary;
  lang: Locale;
};

type HeroSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

// Function to dynamically create email validation schema
const createEmailSchema = (
  sessionEmail: string | null,
  dictionary: Dictionary,
) =>
  z.object({
    email: z
      .string()
      .min(1, dictionary.validation.emailRequired)
      .email(dictionary.validation.emailInvalid)
      .refine((email) => !sessionEmail || email !== sessionEmail, {
        message: dictionary.validation.emailExists,
      }),
  });

export const HeroSection = (props: HeroSectionProps) => {
  const { lang, dictionary, session } = {
    ...props,
  } as Props;

  const sessionEmail = session?.user?.email || null;

  const router = useRouter();

  const routes = localizedRoutes[lang];

  const form = useForm({
    resolver: zodResolver(createEmailSchema(sessionEmail, dictionary)),
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
      alert(dictionary.validation.emailAlreadyLoggedIn);
      setIsSubmitting(false);
      return;
    }

    // Navigate to the register page with the email as a query parameter
    router.push(
      `/${lang}${routes.auth.register}?email=${encodeURIComponent(data.email)}`,
    );
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <section className="relative py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="md:mb-18 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:grid-cols-2 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {dictionary.hero.heading}
          </h1>
          <div>
            <p className="md:text-md">{dictionary.hero.description}</p>
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
                            placeholder={dictionary.hero.inputPlaceholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="dark:text-foreground/40" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} variant="black">
                    {isSubmitting ? <IconSpinner /> : dictionary.auth.signup}
                  </Button>
                </form>
              </Form>
              <div className="text-xs">
                {dictionary.hero.termsAndConditions.text}
                <button
                  className="m-0 ml-1 inline p-0 align-baseline text-inherit underline hover:no-underline focus:outline-none"
                  onClick={handleOpenModal} // Open the modal
                >
                  {dictionary.hero.termsAndConditions.link}
                </button>
                .
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg">
          <Image
            src="/assets/family-legal-advice.jpg"
            className="w-full rounded-lg object-cover opacity-80"
            alt="Family Legal Advice"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>
      {/* Modal */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dictionary={dictionary}
      />
    </section>
  );
};

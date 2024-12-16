"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/verification";
import { FormSucccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";

interface VerificationFormProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function VerificationForm({
  dictionary,
  lang,
}: VerificationFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams?.get("token");

  //IN DEVELOPMENT MODE ONSUBMIT WILL BE CALLED TWICE IN STRICT MODE
  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token");
      return;
    }
    await newVerification(token)
      .then((data) => {
        console.log("API Response:", data); // Log the response to see what's included
        if (data.error) {
          setError(data.error);
          setSuccess(undefined); // Ensure success is not set if there's an error
        } else if (data.success) {
          setSuccess(data.success);
          setError(undefined); // Ensure error is not set if operation is successful
        }
      })
      .catch((error) => {
        console.error("Error during verification:", error);
        setError("Something went wrong");
      })
      .finally(() => {
        setTimeout(() => {
          window.location.href = "/profile";
        }, 2000);
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      onSubmit();
    } else {
      setError("Token found");
    }
  }, [token, onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to Home"
      backButtonHref="/"
      dictionary={dictionary}
      lang={lang}
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        {!success && !error && <BeatLoader />}
        {success && <FormSucccess message={success} time={false} />}
        {error && <FormError message={error} time={false} />}
      </div>
    </CardWrapper>
  );
}

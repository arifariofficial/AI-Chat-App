import { Dictionary } from "@/lib/types";
import React from "react";

interface PrivacyPolicyProps {
  dictionary: Dictionary;
}

const PrivacyPolicy = ({ dictionary }: PrivacyPolicyProps) => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Your AI Company";
  const companyWebsite =
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "example.com";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 text-foreground">
      <h1 className="mb-6 text-center text-4xl font-bold">
        {dictionary.privacyPolicy.title}
      </h1>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        {dictionary.privacyPolicy.lastUpdated}:{" "}
        <span className="font-medium">01.12.2024</span>
      </p>

      <p className="mb-4">
        <span
          dangerouslySetInnerHTML={{
            __html: dictionary.privacyPolicy.description.replace(
              /{companyName}/g,
              `<strong>${companyName}</strong>`,
            ),
          }}
        />
      </p>

      {Object.entries(dictionary.privacyPolicy.sections).map(
        ([key, section]) => (
          <section className="mb-6" key={key}>
            <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
            {"content" in section && (
              <p>
                {section.content
                  .replace(/{companyWebsite}/g, companyWebsite)
                  .replace(/{companyName}/g, companyName)}
              </p>
            )}
            {"list" in section && (
              <ul className="mt-3 list-inside list-disc space-y-2">
                {section.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {"note" in section && section.note && (
              <p className="mt-2 text-sm italic text-muted-foreground">
                {section.note}
              </p>
            )}
          </section>
        ),
      )}
    </div>
  );
};

export default PrivacyPolicy;

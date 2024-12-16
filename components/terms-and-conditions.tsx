import React from "react";
import { Dictionary } from "@/lib/types";

interface TermsAndConditionsProps {
  dictionary: Dictionary;
}

const TermsAndConditions = ({ dictionary }: TermsAndConditionsProps) => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Our Company";
  const countryName = process.env.NEXT_PUBLIC_COUNTRY_NAME || "Our Country";

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {dictionary.terms_modal.title}
      </h2>
      <div className="space-y-6 text-gray-600">
        <p>
          {dictionary.terms_modal.welcome.replace("{companyName}", companyName)}
        </p>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.definitions_title}
          </h3>
          <p>
            {dictionary.terms_modal.definitions_content.replace(
              "{companyName}",
              companyName,
            )}
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.services_title}
          </h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>{dictionary.terms_modal.services_content.item1}</li>
            <li>{dictionary.terms_modal.services_content.item2}</li>
            <li>{dictionary.terms_modal.services_content.item3}</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.intellectual_property_title}
          </h3>
          <p>
            {dictionary.terms_modal.intellectual_property_content.replace(
              "{companyName}",
              companyName,
            )}
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.limitation_liability_title}
          </h3>
          <p>
            {dictionary.terms_modal.limitation_liability_content.replace(
              "{companyName}",
              companyName,
            )}
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.governing_law_title}
          </h3>
          <p>
            {dictionary.terms_modal.governing_law_content.replace(
              "{countryName}",
              countryName,
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;

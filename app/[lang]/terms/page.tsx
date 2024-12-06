import React from "react";

const TermsAndConditions = () => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Our Company";
  const countryName = process.env.NEXT_PUBLIC_COUNTRY_NAME || "Our Country";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 text-foreground">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Terms and Conditions
      </h1>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Last updated: <span className="font-medium">01.12.2024</span>
      </p>

      <p className="mb-4">
        Welcome to <strong>{companyName}</strong>! These terms and conditions
        outline the rules and regulations for the use of our website.
      </p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">1. Definitions</h2>
        <p className="mb-3">
          <strong>“Company”</strong> refers to {companyName}, its employees,
          agents, and affiliates.
        </p>
        <p>
          <strong>“User”</strong> refers to any person accessing our website or
          using our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">2. Use of Our Services</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Users must be at least 18 years old or have parental consent to use
            our services.
          </li>
          <li>
            Users agree not to use the website in any way that may damage or
            impair its functionality.
          </li>
          <li>Users agree not to use our services for illegal activities.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          3. Intellectual Property
        </h2>
        <p>
          All content on this website, including text, images, and software, is
          owned by {companyName} or its licensors. Users are prohibited from
          reproducing or redistributing any content without prior written
          permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">4. Privacy Policy</h2>
        <p>
          We are committed to protecting your privacy. Please review our{" "}
          <a href="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          5. Limitation of Liability
        </h2>
        <p>
          {companyName} is not liable for any direct, indirect, or consequential
          damages arising from the use of our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of {countryName}.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">7. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Users are encouraged to
          review them regularly.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;

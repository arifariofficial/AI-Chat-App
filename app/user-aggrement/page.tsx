// components/UserAgreement.js

import React from "react";

const UserAgreement = () => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Your AI Company";
  const countryName = process.env.NEXT_PUBLIC_COUNTRY_NAME || "Your Country";
  const companyWebsite =
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://example.com";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 text-gray-800">
      <h1 className="mb-6 text-center text-4xl font-bold">User Agreement</h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Last updated: <span className="font-medium">01.12.2024</span>
      </p>

      <p className="mb-4">
        Welcome to <strong>{companyName}</strong>. This User Agreement outlines
        the terms and conditions for using our services. By accessing or using
        our platform, you agree to comply with and be bound by this agreement.
      </p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using our services, you acknowledge that you have read, understood,
          and agree to be bound by this User Agreement and our Privacy Policy.
          If you do not agree to these terms, please do not use our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">2. Use of Services</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            You agree to use our platform only for lawful purposes and in
            compliance with applicable laws and regulations.
          </li>
          <li>
            You will not misuse our services by attempting to access
            unauthorized areas, reverse-engineer, or disrupt the functionality
            of our platform.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">3. AI-Generated Content</h2>
        <p>
          Our platform leverages AI and machine learning to generate information
          and responses. While we strive for accuracy, the content generated may
          not always be correct, complete, or up to date.
        </p>
        <p className="mt-2">
          <strong>{companyName}</strong> is not liable for any actions taken
          based on AI-generated content. Users are encouraged to verify the
          accuracy of critical information independently.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          4. Intellectual Property
        </h2>
        <p>
          All content, including text, images, software, and AI models, is the
          property of {companyName} or its licensors. Users may not copy,
          reproduce, or distribute any content without explicit permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          5. User Responsibilities
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            You agree not to misuse our platform or use it for illegal
            activities.
          </li>
          <li>
            You are solely responsible for the content you submit or generate
            using our services.
          </li>
          <li>
            You agree to notify us immediately of any unauthorized use of your
            account.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          6. Limitation of Liability
        </h2>
        <p>
          {companyName} is not responsible for any indirect, incidental, or
          consequential damages arising from the use or inability to use our
          platform. Our total liability is limited to the amount paid by the
          user for our services, if any.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you
          breach this agreement or engage in prohibited activities. Upon
          termination, your access to our services will cease immediately.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">8. Governing Law</h2>
        <p>
          This User Agreement is governed by and construed in accordance with
          the laws of {countryName}. Any disputes arising under this agreement
          will be resolved in the courts of {countryName}.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          9. Changes to This Agreement
        </h2>
        <p>
          We may update this agreement periodically. Users are encouraged to
          review this agreement regularly. Continued use of our services
          constitutes acceptance of any updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">10. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this agreement, you
          can reach us at{" "}
          <a
            href={`mailto:user@${companyWebsite}`}
            className="text-blue-600 underline"
          >
            {`support@${companyWebsite}`}
          </a>
        </p>
      </section>
    </div>
  );
};

export default UserAgreement;

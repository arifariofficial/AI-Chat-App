import React from "react";

const PrivacyPolicy = () => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Your AI Company";
  const companyWebsite =
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://example.com";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 text-foreground">
      <h1 className="mb-6 text-center text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Last updated: <span className="font-medium">01.12.2024</span>
      </p>

      <p className="mb-4">
        At <strong>{companyName}</strong>, we are committed to protecting your
        privacy and ensuring the safety of your personal data. This policy
        explains how we collect, use, and safeguard your information when you
        use our services.
      </p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          1. Information We Collect
        </h2>
        <p className="mb-3">
          We may collect the following types of information:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Personal Information:</strong> Information you provide when
            creating an account or contacting us, such as your name, email
            address, and phone number.
          </li>
          <li>
            <strong>Usage Data:</strong> Data about how you use our website and
            services, including IP address, browser type, and interactions.
          </li>
          <li>
            <strong>Machine Learning Insights:</strong> Information generated by
            our AI models based on your inputs, limited to publicly available
            data.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>To provide, improve, and personalize our AI services.</li>
          <li>
            To communicate updates, new features, or support-related matters.
          </li>
          <li>
            To ensure security and detect fraudulent or unauthorized activity.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">3. Data Security</h2>
        <p>
          Your data&apos;s security is our priority. We use industry-standard
          encryption and secure storage solutions to protect your information
          from unauthorized access, alteration, or disclosure.
        </p>
        <p className="mt-2">
          However, please note that no online platform can guarantee 100&#37;
          security. We continuously strive to improve our security practices.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          4. Use of AI and Machine Learning
        </h2>
        <p>
          Our services rely on AI and machine learning models to provide
          information and insights. While we strive for accuracy,{" "}
          <strong>{companyName}</strong> cannot guarantee that all AI-generated
          responses will be free from errors or inaccuracies.
        </p>
        <p className="mt-2">
          We primarily use publicly available information to train our models
          and generate outputs.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          5. Sharing of Information
        </h2>
        <p>
          We do not sell, rent, or trade your personal information to third
          parties. However, we may share data with trusted partners for the
          purposes of providing or improving our services, with strict adherence
          to confidentiality agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">6. Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your personal
          information at any time. If you have any concerns about how we handle
          your data, please contact us at{" "}
          <a
            href={`mailto:privacy@${companyWebsite}`}
            className="text-blue-600 underline"
          >
            {`privacy@${companyWebsite}`}
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          7. Changes to this Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices or regulatory requirements. Users are encouraged to
          review this policy regularly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">8. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding our Privacy Policy,
          feel free to reach out to us at{" "}
          <a
            href={`mailto:privacy@${companyWebsite}`}
            className="text-blue-600 underline"
          >
            {`privacy@${companyWebsite}`}
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
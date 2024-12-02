// components/TermsAndConditions.js

import React from "react";

const TermsAndConditions = () => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME;
  const countryName = process.env.NEXT_PUBLIC_COUNTRY_NAME;

  return (
    <div
      style={{
        padding: "2rem",
        lineHeight: "1.6",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Terms and Conditions</h1>
      <p>Last updated: [Insert Date]</p>

      <p>
        Welcome to <strong>{companyName}</strong>! These terms and conditions
        outline the rules and regulations for the use of our website.
      </p>

      <h2>1. Definitions</h2>
      <p>
        <strong>“Company”</strong> refers to {companyName}, its employees,
        agents, and affiliates.
        <br />
        <strong>“User”</strong> refers to any person accessing our website or
        using our services.
      </p>

      <h2>2. Use of Our Services</h2>
      <ul>
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

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this website, including text, images, and software, is
        owned by {companyName}
        or its licensors. Users are prohibited from reproducing or
        redistributing any content without prior written permission.
      </p>

      <h2>4. Privacy Policy</h2>
      <p>
        We are committed to protecting your privacy. Please review our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        {companyName} is not liable for any direct, indirect, or consequential
        damages arising from the use of our website.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of {countryName}.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Users are encouraged to
        review them regularly.
      </p>
    </div>
  );
};

export default TermsAndConditions;

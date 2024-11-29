const CookiePolicy = () => {
  return (
    <div className="container mx-auto rounded-lg bg-background p-8 pb-32 text-foreground shadow-md">
      <h1 className="mb-6 text-3xl font-bold">Cookie Policy</h1>

      <section className="mb-6">
        <p>
          At <span className="font-semibold">Sipe AI</span>, we are committed to
          protecting your privacy and ensuring transparency about the data we
          collect through cookies. This Cookie Policy explains how and why we
          use cookies, the types of cookies we use, and your choices regarding
          cookie management.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They are widely used to make websites work efficiently,
          enhance your user experience, and provide analytical data to website
          owners. Cookies can store information such as your preferences, login
          status, and browsing activities.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Types of Cookies We Use</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Necessary Cookies:</strong> These cookies are essential for
            the website to function properly. They enable core functionalities
            such as security, authentication, and accessibility.
          </li>
          <li>
            <strong>Performance Cookies:</strong> These cookies help us analyze
            website performance and improve your experience by collecting
            anonymized data about how users interact with the site.
          </li>
          <li>
            <strong>Functional Cookies:</strong> These cookies allow us to
            remember your preferences, such as language selection and other
            customizable features, to provide a more personalized experience.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> These cookies track your
            online activity to provide you with relevant advertisements based on
            your interests.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">How We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Ensure the proper functioning of our website.</li>
          <li>Improve website performance and user experience.</li>
          <li>
            Analyze user behavior and website traffic to optimize content.
          </li>
          <li>Provide personalized recommendations and advertisements.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Managing Cookies</h2>
        <p>
          You have the right to manage or disable cookies as per your
          preferences. Most browsers allow you to control cookies through their
          settings. However, disabling certain cookies may affect the
          functionality of the website.
        </p>
        <p className="mt-2">
          To learn more about managing cookies, visit the help section of your
          browser:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline hover:opacity-80"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline hover:opacity-80"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-us/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline hover:opacity-80"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline hover:opacity-80"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. Please review this policy periodically to stay informed about
          our use of cookies.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Cookie Policy, please
          contact us at:
        </p>
        <p className="mt-2 font-semibold">Email: support@sipeai.com</p>
        <p>Phone: +358 123 456 789</p>
      </section>
    </div>
  );
};

export default CookiePolicy;

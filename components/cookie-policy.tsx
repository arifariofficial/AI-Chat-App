import { Dictionary } from "@/lib/types";

interface CookiePolicyProps {
  dictionary: Dictionary;
}

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME;

const CookiePolicy = ({ dictionary }: CookiePolicyProps) => {
  return (
    <div className="container mx-auto rounded-lg bg-background p-8 pb-32 text-foreground shadow-md">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold">
        {dictionary.cookiePolicy.title}
      </h1>

      {/* Introduction */}
      <section className="mb-6">
        <p>
          {dictionary.cookiePolicy.at}{" "}
          <span className="font-semibold">{companyName}</span>,{" "}
          {dictionary.cookiePolicy.introduction}
        </p>
      </section>

      {/* What Are Cookies */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.whatAreCookies.title}
        </h2>
        <p>{dictionary.cookiePolicy.whatAreCookies.description}</p>
      </section>

      {/* Types of Cookies */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.typesOfCookies.title}
        </h2>
        <ul className="list-inside list-disc space-y-2">
          {Object.entries(dictionary.cookiePolicy.typesOfCookies)
            .filter(([key]) => key !== "title") // Exclude the title
            .map(([key, value]) => (
              <li key={key}>
                <span dangerouslySetInnerHTML={{ __html: value }} />
              </li>
            ))}
        </ul>
      </section>

      {/* How We Use Cookies */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.howWeUseCookies.title}
        </h2>
        <ul className="list-inside list-disc space-y-2">
          {dictionary.cookiePolicy.howWeUseCookies.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Managing Cookies */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.managingCookies.title}
        </h2>
        <p>{dictionary.cookiePolicy.managingCookies.description}</p>
        <p className="mt-2">
          {dictionary.cookiePolicy.managingCookies.learnMore}
        </p>
        <ul className="mt-2 list-inside list-disc space-y-2">
          {Object.entries(dictionary.cookiePolicy.managingCookies.browsers).map(
            ([browser, label]) => (
              <li key={browser}>
                <a
                  href={getBrowserHelpLink(browser)} // Helper function for browser links
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline hover:opacity-80"
                >
                  {label}
                </a>
              </li>
            ),
          )}
        </ul>
      </section>

      {/* Changes to Policy */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.changesToPolicy.title}
        </h2>
        <p>{dictionary.cookiePolicy.changesToPolicy.description}</p>
      </section>

      {/* Contact Us */}
      <section>
        <h2 className="mb-2 text-xl font-semibold">
          {dictionary.cookiePolicy.contactUs.title}
        </h2>
        <p>{dictionary.cookiePolicy.contactUs.description}</p>
        <p className="mt-2 font-semibold">
          {dictionary.cookiePolicy.contactUs.email}
        </p>
        <p>{dictionary.cookiePolicy.contactUs.phone}</p>
      </section>
    </div>
  );
};

// Helper function to return browser-specific help links
const getBrowserHelpLink = (browser: string) => {
  const browserLinks: Record<string, string> = {
    chrome: "https://support.google.com/chrome/answer/95647",
    firefox:
      "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences",
    safari: "https://support.apple.com/en-us/guide/safari/sfri11471/mac",
    edge: "https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d",
  };
  return browserLinks[browser] || "#";
};

export default CookiePolicy;

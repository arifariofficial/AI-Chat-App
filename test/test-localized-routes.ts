import { Locale } from "@/i18n.config";
import { findRouteKeyFromPath } from "@/lib/locale-utils";

const testCases = [
  { path: "/en/about-us", locale: "en", expected: "aboutUs" },
  { path: "/fi/miesta", locale: "fi", expected: "aboutUs" },
  { path: "/sv/om-oss", locale: "sv", expected: "aboutUs" },
  { path: "/en/contact", locale: "en", expected: "contact" },
  { path: "/invalid-path", locale: "en", expected: undefined },
];

testCases.forEach(({ path, locale, expected }) => {
  const result = findRouteKeyFromPath(path, locale as Locale);
  console.log(
    `Path: '${path}', Locale: '${locale}', Expected: '${expected}', Result: '${result}'`,
  );
});

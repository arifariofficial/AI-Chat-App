import { getDictionary } from "@/lib/dictionary";
import ChatLayout from "./chat-layout";
import type { Locale } from "@/i18n.config";

export default async function ServerWrapper({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  // Fetch the dictionary based on the `lang` param
  const dictionary = await getDictionary(lang);

  // Pass the dictionary as a prop to the client layout
  return (
    <ChatLayout dictionary={dictionary} lang={lang}>
      {children}
    </ChatLayout>
  );
}

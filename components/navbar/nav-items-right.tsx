import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import UserButtonDesktop from "./user-button-desktop";
import { Session } from "next-auth";
import { LocaleSwitcher } from "./locale-switcher";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";

interface NavItemsMRightProps {
  session?: Session | null;
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
}

function NavItemsRight({
  className,
  session,
  lang,
  dictionary,
}: NavItemsMRightProps) {
  return (
    <div className={cn(className, "mr-1 hidden h-full items-center sm:flex")}>
      <LocaleSwitcher className="px-2" lang={lang} dictionary={dictionary} />
      <ModeToggle dictionary={dictionary} />
      <UserButtonDesktop session={session} className="h-full" variant="nav" />
    </div>
  );
}
export default NavItemsRight;

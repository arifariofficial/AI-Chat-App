import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface ProfileLayoutDeskopProps {
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
}

export default function ProfileSideBarDeskop({
  className,
  lang,
  dictionary,
  routes,
}: ProfileLayoutDeskopProps) {
  return (
    <div
      className={cn(
        className,
        "h-full flex-col border-l border-r border-r-border/30 bg-background md:w-[300px] lg:w-[400px] 2xl:border-l-border/30",
      )}
    >
      <div className="md:mt-2">
        <NavLinks lang={lang} dictionary={dictionary} routes={routes} />
      </div>
    </div>
  );
}

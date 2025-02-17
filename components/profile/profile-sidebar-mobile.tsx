import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface ProfileSidebarMobileProps {
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
}

function ProfileSidebarMobile({
  className,
  lang,
  dictionary,
  routes,
}: ProfileSidebarMobileProps) {
  return (
    <div className={cn(className, "flex w-full flex-row")}>
      <NavLinks lang={lang} dictionary={dictionary} routes={routes} />
    </div>
  );
}
export default ProfileSidebarMobile;

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { localizedRoutes } from "@/lib/localized-routes";
import { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemsMiddleProps {
  className?: string;
  lang: Locale;
  dictionary: Dictionary;
}

const NavItemsMiddle = ({
  className,
  lang,
  dictionary,
}: NavItemsMiddleProps) => {
  const { navigation } = dictionary;
  const routes = localizedRoutes[lang];

  return (
    <div className={cn(className, "flex w-full justify-center text-lg")}>
      <Link href={`/${lang}${routes.home}`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">{navigation.home}</p>
        </Button>
      </Link>
      <Link href={`/${lang}${routes.chat}`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">{navigation.sipeChat}</p>
        </Button>
      </Link>
      <Link href={`/${lang}${routes.aboutUs}`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">{navigation.aboutUs}</p>
        </Button>
      </Link>
      <Link href={`/${lang}${routes.contact}`} className="h-full">
        <Button variant="nav" className="hidden size-full sm:flex">
          <p className="text-base font-bold">{navigation.contact}</p>
        </Button>
      </Link>
    </div>
  );
};

export default NavItemsMiddle;

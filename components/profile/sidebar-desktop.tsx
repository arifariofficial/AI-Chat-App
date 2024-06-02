import { cn } from "@lib/utils";
import NavLinks from "./nav-links";

interface ProfileLayoutDeskopProps {
  className?: string;
}

export default function ProfileSideBarDeskop({
  className,
}: ProfileLayoutDeskopProps) {
  return (
    <div
      className={cn(
        className,
        "h-full flex-col border-l border-r border-r-border/30 bg-background md:w-[300px] lg:w-[400px] 2xl:border-l-border/30",
      )}
    >
      <div className="md:mt-2">
        <NavLinks />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";

interface ProfileSidebarMobileProps {
  className?: string;
}

function ProfileSidebarMobile({ className }: ProfileSidebarMobileProps) {
  return (
    <div className={cn(className, "flex w-full flex-row")}>
      <NavLinks />
    </div>
  );
}
export default ProfileSidebarMobile;

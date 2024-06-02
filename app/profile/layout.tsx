import ProfileSidebarMobile from "@components/profile/profile-sidebar-mobile";
import ProfileSideBarDeskop from "@components/profile/sidebar-desktop";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex size-full max-w-screen-2xl flex-col md:flex-row">
      <ProfileSideBarDeskop className="hidden md:flex " />
      <ProfileSidebarMobile className="sticky top-[56px] h-fit border-t border-border/20 bg-background pt-1 md:hidden" />

      <div className="flex size-full p-4">{children}</div>
    </div>
  );
}

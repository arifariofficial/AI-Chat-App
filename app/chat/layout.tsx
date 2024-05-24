import { SidebarDesktop } from "@components/chat/sidebar-desktop";

import { SidebarToggle } from "@components/chat/sidebar-toggle";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full overflow-hidden">
      <SidebarToggle />
      <SidebarDesktop />
      {children}
    </div>
  );
}

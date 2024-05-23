import ProfileSideBar from "@components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="safe-bottom mx-auto flex w-full max-w-screen-2xl flex-row ">
      <div>
        <ProfileSideBar />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

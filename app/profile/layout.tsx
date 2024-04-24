import ProfileSideBar from "@components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex  max-w-screen-xl flex-row ">
      <div>
        <ProfileSideBar />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

import ProfileInfo from "./profile-info";
import Subscription from "./subscription";

export default function UserProfile() {
  return (
    <div className="mx-auto flex h-screen max-w-screen-xl flex-row">
      <ProfileInfo />
      <Subscription />
    </div>
  );
}

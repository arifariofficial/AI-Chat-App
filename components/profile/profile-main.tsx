import ProfileInfo from "./profile-info";
import Subscription from "./subscription";

export default function UserProfile() {
  return (
    <div className="flex flex-row h-screen">
      <ProfileInfo />
      <Subscription />
    </div>
  );
}

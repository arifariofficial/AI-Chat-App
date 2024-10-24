import Account from "@/components/profile/account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Account",
  description: "Profile Settings",
  icons: "/favicon.ico",
};

export default async function ProfilePage() {
  return <Account />;
}

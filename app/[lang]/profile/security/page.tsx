import Security from "@/components/profile/security";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Security",
  description: "Security Settings",
  icons: "/favicon.ico",
};

export default function SecurityPage() {
  return <Security />;
}

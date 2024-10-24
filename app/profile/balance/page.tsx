import Balance from "@/components/profile/balance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Balance",
  description: "Balance Settings",
  icons: "/favicon.ico",
};

export default function SubscriptionPage() {
  return <Balance />;
}

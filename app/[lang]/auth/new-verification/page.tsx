import VerificationForm from "@/components/auth/verification-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Email Verification",
  description: "Please create an account to continue",
  icons: "/favicon.ico",
};

export default function NewVerificationPage() {
  return <VerificationForm />;
}

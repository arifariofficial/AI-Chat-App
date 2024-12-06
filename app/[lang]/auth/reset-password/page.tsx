import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Reset Password",
  description: "Please enter your new password to reset your password",
  icons: "/favicon.ico",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

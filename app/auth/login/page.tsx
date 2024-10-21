import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPE | Log in",
  description: "Please log in to continue",
  icons: "/favicon.ico",
};

export default function LoginPage() {
  return <LoginForm headerLabel="Welcome" />;
}

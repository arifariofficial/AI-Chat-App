import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Kirjaudu sisään",
  description: "Kirjaudu sisään jatkaaksesi",
  icons: "/favicon.ico",
};

export default function LoginPage() {
  return <LoginForm headerLabel="Tervetuloa" />;
}

import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SipeAI - Kirjautunut ulos",
  description: "Kirjaudu sisään uudelleen jatkaaksesi",
  icons: "/favicon.ico",
};

export default function LogotPage() {
  return <LoginForm headerLabel="Kirjautunut ulos" />;
}

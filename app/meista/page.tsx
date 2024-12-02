import { AboutUsPage } from "@/components/about-us/about-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meistä - Sipe AI",
  description: "Sipe AI:n visio ja missio",
  icons: "/favicon.ico",
};

const MeistaSivu = () => {
  return <AboutUsPage />;
};
export default MeistaSivu;

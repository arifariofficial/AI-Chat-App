import Meista from "@components/meista/meista";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meistä - Sipe AI",
  description: "Sipe AI:n visio ja missio",
  icons: "/favicon.ico",
};

const MeistaSivu = () => {
  return <Meista />;
};
export default MeistaSivu;

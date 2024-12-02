import { AboutUsPage } from "@/components/about-us/about-us";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meistä - Sipe AI",
  description: "Sipe AI:n visio ja missio",
  icons: "/favicon.ico",
};

const MeistaSivu = () => {
  return (
    <div>
      <AboutUsPage />
      <Footer />
    </div>
  );
};
export default MeistaSivu;

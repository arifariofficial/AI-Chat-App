import Questionary from "@components/Questionary";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SIPE | Query",
  description: "Do your initial assessment",
  icons: "/favicon.ico",
};

export default function QuestionaryComponent() {
  return (
    <div className="grid h-screen place-content-center">
      <Questionary />
    </div>
  );
}

import HeroSection from "./hero-section";
import InnovationSection from "./innovation";
import MissionSection from "./mission";

export default function Etusivu() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col p-10">
      <HeroSection />
      <MissionSection />
      <InnovationSection />
    </div>
  );
}

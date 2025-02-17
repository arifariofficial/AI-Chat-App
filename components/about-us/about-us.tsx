import { Dictionary } from "@/lib/types";
import { TeamMember } from "./team-member";

interface AboutUsProps {
  dictionary: Dictionary;
}

export const AboutUs = ({ dictionary }: AboutUsProps) => {
  return (
    <section className="container mx-auto mt-10 flex max-w-screen-2xl flex-col px-[5%] md:px-[10%]">
      <div className="container">
        <div className="md:mb-18 mx-auto mb-12 max-w-lg text-center lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {dictionary.aboutUs.heading}
          </h2>
          <p className="md:text-md">{dictionary.aboutUs.description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {dictionary.aboutUs.teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

import { Dictionary } from "@/lib/types";
import { Button } from "../ui/button";
import { TeamMember } from "./team-member";

interface AboutUsProps {
  dictionary: Dictionary;
}

export const AboutUs = ({ dictionary }: AboutUsProps) => {
  return (
    <section className="container mx-auto mt-10 flex max-w-screen-2xl flex-col px-[5%] md:px-[10%]">
      <div className="container">
        <div className="md:mb-18 mx-auto mb-12 max-w-lg text-center lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">
            {dictionary.aboutUs.tagline}
          </p>
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
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {dictionary.aboutUs.footer.heading}
          </h4>
          <p className="md:text-md">{dictionary.aboutUs.footer.description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button {...dictionary.aboutUs.footer.button}>
              {dictionary.aboutUs.footer.button.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

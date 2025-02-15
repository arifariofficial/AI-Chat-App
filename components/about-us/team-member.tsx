// TeamMember.tsx

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TeamMember as TeamMemberType } from "@/lib/types";
import { BiLogoLinkedinSquare } from "react-icons/bi";

interface TeamMemberProps {
  member: TeamMemberType;
}

export const TeamMember = ({ member }: TeamMemberProps) => {
  const imageClasses = member.image.className
    ? cn("object-cover scale-[1.4]", member.image.className)
    : "object-cover";

  return (
    <div className="mx-auto flex flex-col items-center justify-center text-center">
      <div className="relative mb-5 max-h-[250px] max-w-[250px] overflow-hidden rounded-full border-4 border-border/50 md:mb-6">
        <Image
          src={member.image.src}
          alt={member.image.alt!}
          width={300}
          height={300}
          priority
          className={imageClasses}
        />
      </div>
      <div className="mb-1 md:mb-2">
        <h5 className="text-md font-semibold md:text-lg">{member.name}</h5>
        {/* <h6 className="md:text-md">{member.jobTitle}</h6> */}
        <p className="md:text-md text-foreground/80">
          {member.email}
          {/* {member.mobile && <br />}
          {member.mobile} */}
        </p>
      </div>
      {/* <p>{member.description}</p> */}
      <div className="grid grid-flow-col grid-cols-[max-content] self-center">
        {member.socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoLinkedinSquare className="size-7" />
          </Link>
        ))}
      </div>
    </div>
  );
};

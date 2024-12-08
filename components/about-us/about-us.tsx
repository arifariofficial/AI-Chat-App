import { BiLogoLinkedinSquare } from "react-icons/bi";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

type Footer = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type SocialLink = {
  href: string;
  icon: React.ReactNode;
};

type TeamMember = {
  image: ImageProps;
  name: string;
  jobTitle: string;
  email: string;
  mobile?: string;
  description: string;
  socialLinks: SocialLink[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  teamMembers: TeamMember[];
  footer: Footer;
};

export type AboutUsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const AboutUs = (props: AboutUsProps) => {
  const { tagline, heading, description, teamMembers, footer } = {
    ...AboutUsDefaults,
    ...props,
  } as Props;
  return (
    <section className="mx-auto max-w-screen-xl px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mx-auto mb-12 max-w-lg text-center lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {footer.heading}
          </h4>
          <p className="md:text-md">{footer.description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button {...footer.button}>{footer.button.title}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }: { member: TeamMember }) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center text-center">
      <div className="relative mb-5 max-h-[250px] max-w-[250px] overflow-hidden rounded-full border-4 border-border/50 md:mb-6">
        <Image
          src={member.image.src}
          alt={member.image.alt!}
          width={300}
          height={300}
          priority
          className={cn("object-cover", member.image.className)}
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{member.name}</h5>
        <h6 className="md:text-md">{member.jobTitle}</h6>
        <p className="md:text-md text-foreground/80">
          {member.email}
          {member.mobile && <br />}
          {member.mobile}
        </p>
      </div>
      <p>{member.description}</p>
      <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center">
        {member.socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const AboutUsDefaults: AboutUsProps = {
  tagline: "Innovate",
  heading: "Our team",
  description: "Meet the brilliant minds behind our innovative solutions.",
  teamMembers: [
    {
      image: {
        src: "/assets/Elina.jpeg",
        alt: "Elina Eriksson",
      },
      name: "Elina Eriksson",
      jobTitle: "CEO & Founder",
      email: "eriksson.elina@sipe.ai",
      mobile: "+358 40 7798881",
      description:
        "Passionate about leveraging AI to solve real-world challenges and drive innovation.",
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/elina-eriksson/",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
      ],
    },
    {
      image: {
        src: "/assets/Sampo.jpeg",
        alt: "Sampo Kaarenmaa",
      },
      name: "Sampo Kaarenmaa",
      jobTitle: "Product Manager & Developer",
      email: "kaarenmaa.sampo@sipe.ai",
      mobile: "+358 40 5800869",
      description:
        "Focused on creating user-centric products that enhance customer experience.",
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/sampo-kaarenmaa-75a76587/",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
      ],
    },
    {
      image: {
        src: "/assets/Mia.jpeg",
        alt: "Mia Almgren",
      },
      name: "Mia Almgren",
      jobTitle: "Marketing Director",
      email: "almgren.mia@sipe.ai",
      mobile: "+358 40 8296048",
      description:
        "Committed to building our brand and engaging with our community.",
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/mia-almgren-1327a9b8/",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
      ],
    },
    {
      image: {
        src: "/assets/Amir.jpeg",
        alt: "Amir Ingher",
      },
      name: "Amir Ingher",
      jobTitle: "Software Engineer",
      email: "ingher.amir@sipe.ai",
      mobile: "+358 40 3012289",
      description:
        "Experienced in software engineering with a strong passion for innovation and expertise in AI-driven solutions.",
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/amir-ingher-ba24a7129/",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
      ],
    },
    {
      image: {
        src: "/assets/Ariful.jpeg",
        alt: "Ariful Islam",
        className: "scale-[1.4]",
      },
      name: "Ariful Islam",
      jobTitle: "Full Stack Engineer",
      email: "islam.ariful@sipe.ai",
      mobile: "+358 40 555699",
      description:
        "Full Stack Engineer with expertise in AI and a passion for creating scalable, intelligent solutions.",
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/arifariofficial/",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
      ],
    },
  ],
  footer: {
    heading: "We're hiring!",
    description: "Join our dynamic team and shape the future.",
    button: { title: "Open positions", variant: "outline" },
  },
};

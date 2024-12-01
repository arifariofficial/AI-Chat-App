import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { Button, ButtonProps } from "../ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type LinkProps = {
  label: string;
  url: string;
};

type Map = {
  url: string;
  image: ImageProps;
};

type Contact = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: LinkProps;
  button?: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  contacts: Contact[];
  map: Map;
};

export type ContactSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ContactSection = (props: ContactSectionProps) => {
  const { tagline, heading, description, contacts, map } = {
    ...ContactSectionDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 md:mb-18 mb-12 max-w-lg lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-20 md:gap-y-16">
          <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-10">
            {contacts.map((contact, index) => (
              <div key={index}>
                <div className="mb-3 md:mb-4">{contact.icon}</div>
                <h3 className="text-md mb-2 font-bold leading-[1.4] md:text-xl">
                  {contact.title}
                </h3>
                <p className="mb-2">{contact.description}</p>
                {contact.title === "Office" && contact.button ? (
                  <div className="mt-5 md:mt-6">
                    <Button {...contact.button} className="w-full">
                      {contact.button.title}
                    </Button>
                  </div>
                ) : (
                  contact.link && (
                    <a className="underline" href={contact.link.url}>
                      {contact.link.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
          {/* insert your map code here */}
          <a
            href={map.url}
            className="justify-self-end md:w-[321.6px] lg:w-auto"
          >
            <img
              src={map.image.src}
              alt={map.image.alt}
              className="size-full h-[400px] object-cover md:h-[516px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export const ContactSectionDefaults: ContactSectionProps = {
  tagline: "Connect",
  heading: "Contact us",
  description: "We're here to assist you with your inquiries.",
  contacts: [
    {
      icon: <BiEnvelope className="size-8" />,
      title: "Email",
      description: "Reach us at",
      link: {
        label: "info@sipe.ai",
        url: "#",
      },
    },
    {
      icon: <BiPhone className="size-8" />,
      title: "Phone",
      description: "Call us anytime",
      link: {
        label: "+358440000500",
        url: "#",
      },
    },
    {
      icon: <BiMap className="size-8" />,
      title: "Office",
      description: "123 Postiljooninkatu, Helsinki, Finland",
      button: {
        title: "Get Directions",
        variant: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
  map: {
    url: "#",
    image: {
      src: "https://relume-assets.s3.us-east-1.amazonaws.com/placeholder-map-image.svg",
      alt: "Relume placeholder map image",
    },
  },
};

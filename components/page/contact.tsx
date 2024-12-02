"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

const ContactSectionDefaults: ContactSectionProps = {
  tagline: "Connect",
  heading: "Contact Us",
  description: "We're here to assist you with your inquiries.",
  contacts: [
    {
      icon: <BiEnvelope className="size-8" />,
      title: "Email",
      description: "Reach us at",
      link: {
        label: "info@sipe.ai",
        url: "mailto:info@sipe.ai",
      },
    },
    {
      icon: <BiPhone className="size-8" />,
      title: "Phone",
      description: "Call us anytime",
      link: {
        label: "+358440000500",
        url: "tel:+358440000500",
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
        onClick: () => {
          window.open(
            "https://www.google.com/maps/dir/?api=1&destination=123+Postiljooninkatu,+Helsinki,+Finland",
            "_blank",
          );
        },
      },
    },
  ],
  map: {
    url: "https://www.google.com/maps/dir/?api=1&destination=123+Postiljooninkatu,+Helsinki,+Finland",
    embedUrl: `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=123+Postiljooninkatu,+Helsinki,+Finland`,
    image: {
      src: "/assets/map-placeholder.jpg",
      alt: "Map placeholder",
    },
  },
};

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
  embedUrl?: string; // Optional property for embedded map
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

type ContactSectionProps = React.ComponentPropsWithoutRef<"section"> &
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
          <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
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
                {contact.button && contact.title === "Office" ? (
                  <div className="mt-5 md:mt-6">
                    <Button {...contact.button} className="w-full">
                      {contact.button.title}
                    </Button>
                  </div>
                ) : contact.link ? (
                  <a className="underline" href={contact.link.url}>
                    {contact.link.label}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
          {/* insert your map code here */}
          <Link
            href={map.url}
            className="w-full justify-self-center overflow-hidden rounded-md shadow-sm"
          >
            {map.embedUrl ? (
              <iframe
                src={map.embedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[400px] w-full rounded-md md:h-[516px]"
              ></iframe>
            ) : (
              <Link href={map.url} className="w-full justify-self-center">
                <Image
                  src={map.image.src}
                  alt={map.image.alt!}
                  width={400}
                  height={400}
                  className="size-full h-[400px] w-auto object-cover md:h-[516px]"
                />
              </Link>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

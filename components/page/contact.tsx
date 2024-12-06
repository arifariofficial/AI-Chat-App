"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dictionary } from "@/lib/types";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

interface ContactSectionProps {
  dictionary: Dictionary;
}

export const ContactSection = ({ dictionary }: ContactSectionProps) => {
  const icons = [BiEnvelope, BiMap, BiPhone, RxChevronRight];

  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container mx-auto">
        <div className="rb-12 md:mb-18 mb-12 max-w-lg lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">
            {dictionary.contactSection.tagline}
          </p>
          <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {dictionary.contactSection.heading}
          </h2>
          <p className="md:text-md">{dictionary.contactSection.description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-20 md:gap-y-16">
          <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-10">
            {dictionary.contactSection.contacts.map((contact, index) => (
              <div key={index}>
                <div className="mb-3 md:mb-4">
                  {React.createElement(icons[index], { className: "size-8" })}
                </div>
                <h3 className="text-md mb-2 font-bold leading-[1.4] md:text-xl">
                  {contact.title}
                </h3>
                <p className="mb-2">{contact.description}</p>
                {contact.button ? (
                  <div className="mt-5 md:mt-6">
                    <Button
                      variant="link"
                      iconRight={<RxChevronRight />}
                      onClick={() => {
                        window.open(
                          "https://www.google.com/maps/dir/?api=1&destination=123+Postiljooninkatu,+Helsinki,+Finland",
                          "_blank",
                        );
                      }}
                      className="w-full"
                    >
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
            href="https://www.google.com/maps/dir/?api=1&destination=123+Postiljooninkatu,+Helsinki,+Finland"
            className="w-full justify-self-center overflow-hidden rounded-md shadow-sm"
          >
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=123+Postiljooninkatu,+Helsinki,+Finland`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[400px] w-full rounded-md md:h-[516px]"
            ></iframe>
          </Link>
        </div>
      </div>
    </section>
  );
};

"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { toast } from "./ui/use-toast";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";
import Link from "next/link";

interface FooterProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const Footer = ({ dictionary, lang }: FooterProps) => {
  const [emailInput, setEmailInput] = useState<string>("");

  if (!dictionary || !lang) {
    console.log(
      "dictionary or lang not provided to Footer component. Skipping rendering.",
    );
    return null;
  }

  const socialMediaIcons = [
    BiLogoFacebookCircle,
    BiLogoInstagram,
    BiLogoLinkedinSquare,
    BiLogoYoutube,
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailInput.trim() === "") {
      toast({
        title: dictionary.validation.emailInvalidTitle,
        description: dictionary.validation.emailInvalid,
        variant: "default",
      });
      return;
    }

    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
      variant: "default", // Success variant
    });
    setEmailInput(""); // Clear input field
  };
  return (
    <footer className="md:py-18 px-[5%] py-12 lg:py-20">
      <div className="container mx-auto">
        <div className="rb-12 md:mb-18 mb-12 block items-start justify-between lg:mb-20 lg:flex">
          <div className="rb-6 mb-6 lg:mb-0">
            <h1 className="md:text-md font-semibold">
              {dictionary.footer.newsletterHeading}
            </h1>
            <p>{dictionary.footer.newsletterDescription}</p>
          </div>
          <div className="max-w-md lg:min-w-[25rem]">
            <form
              className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-y-4 md:gap-4"
              onSubmit={handleSubmit}
            >
              <Input
                id="email"
                type="email"
                placeholder={dictionary.input.emailPlaceholder}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button>{dictionary.footer.button.title}</Button>
            </form>
            <div
              dangerouslySetInnerHTML={{
                __html: dictionary.footer.termsAndConditions,
              }}
            />
          </div>
        </div>
        <div className="rb-12 md:mb-18 mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-3 md:gap-y-12 lg:mb-20 lg:grid-cols-6">
          <Link
            href="/"
            className="sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto"
          >
            <Image
              src="/assets/Logo-main.svg"
              alt="Logo image"
              width={100}
              height={100}
              className="bg-primary p-2"
            />
          </Link>
          {dictionary.footer.columnLinks.map((column, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start"
            >
              <h2 className="mb-3 font-semibold md:mb-4">{column.title}</h2>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm">
                    <a href={link.url} className="flex items-center gap-3">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start pb-4 pt-6 text-sm md:justify-start md:pb-0 md:pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col-reverse items-start md:flex-row md:gap-6 lg:items-center">
            <p className="mt-8 md:mt-0">{dictionary.footer.footerText}</p>
            <div className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:justify-center md:gap-x-6 md:gap-y-0 lg:text-left">
              {dictionary.footer.footerLinks.map((link, index) => (
                <p key={index} className="underline">
                  <Link href={`${lang}/${link.url}`}>{link.title}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="mb-8 flex items-center justify-center gap-3 lg:mb-0">
            {dictionary.footer.socialMediaLinks.map((link, index) => (
              <Link key={index} href={`${lang}/${link.url}`}>
                {React.createElement(socialMediaIcons[index], {
                  className: "size-8",
                })}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

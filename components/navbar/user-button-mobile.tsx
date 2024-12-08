import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import SignOutButtonMobile from "@/components/auth/signout-client-mobile";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  IconAboutUs,
  IconChat,
  IconContact,
  IconHome,
  UserIcon,
} from "../ui/icons";
import SignInButtonMobile from "@/components/auth/signin-client-mobile";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { localizedRoutes } from "@/lib/localized-routes";

interface UserButtonMobileProps {
  session?: Session | null;
  className?: string;
  buttonClassName?: string;
  style?: React.CSSProperties;
  lang: Locale;
  dictionary: Dictionary;
  variant?:
    | "nav"
    | "outline"
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "inherit"
    | "black"
    | "navMobile";
}

export default function UserButtonMobile({
  session,
  className,
  buttonClassName,
  style,
  variant,
  lang,
  dictionary,
}: UserButtonMobileProps) {
  const { auth } = dictionary;
  const routes = localizedRoutes[lang];

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger
          asChild
          className="flex min-w-0 items-center justify-center px-2"
          style={style}
        >
          {/* Attach the ref to the Button */}
          <Button variant={variant} className={cn(buttonClassName)}>
            <HamburgerMenuIcon className="size-8 w-10" />
          </Button>
        </SheetTrigger>
        <SheetContent className="inset-y-0 flex max-h-screen flex-col justify-start border border-border/20 bg-backgroundSecondary text-title sm:hidden">
          <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
          <DialogDescription className="sr-only">
            Navigate through the menu options using the buttons.
          </DialogDescription>
          {session && (
            <SheetHeader className="flex w-full items-center justify-center">
              <Avatar className="size-28 border shadow-md">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "Nimi ei saatavilla"}
                  />
                )}
                <AvatarFallback className="size-28 rounded-none">
                  Ei kuvaa
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl">{session.user.name || "Ei nimeä"}</p>
                <p>{session.user.email}</p>
              </div>
            </SheetHeader>
          )}

          {/* { Account } */}
          {session && (
            <>
              <Separator />
              <SheetClose asChild className="h-[60px]">
                <Link className="" href="/profile">
                  <Button
                    variant="navMobile"
                    asChild
                    className="flex justify-between px-7"
                    iconRight={<UserIcon />}
                  >
                    <p className="text-2xl font-bold">Account</p>
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}
          {/* Etusivu */}
          {!session && <div className="h-[50px]" />}
          <SheetClose asChild className="h-[60px]">
            <Link className="" href="/">
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconHome />}
              >
                <p className="text-2xl font-bold">Home</p>
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild className="h-[60px]">
            <Link className="" href="/chat">
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconChat />}
              >
                <p className="text-2xl font-bold">SipeChat</p>
              </Button>
            </Link>
          </SheetClose>

          <SheetClose asChild className="h-[60px]">
            <Link className="" href="/about-us">
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconAboutUs />}
              >
                <p className="text-2xl font-bold">About Us</p>
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild className="h-[60px]">
            <Link className="" href="/contact">
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconContact />}
              >
                <p className="text-2xl font-bold">Contact</p>
              </Button>
            </Link>
          </SheetClose>

          <div>
            {session ? (
              <SheetClose asChild>
                <SignOutButtonMobile
                  className="flex h-[60px] w-full justify-between px-7"
                  spanClassName="flex flex-row items-center justify-between  w-full"
                  variant="navMobile"
                />
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <SignInButtonMobile
                  className="flex h-[60px] w-full justify-between px-7"
                  spanClassName="flex flex-row items-center justify-between  w-full"
                  variant="navMobile"
                />
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

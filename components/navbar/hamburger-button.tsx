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
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/types";
import { LocalizedRoutes } from "@/lib/localized-routes";
import SignInButtonMobile from "../auth/signin-client-mobile";
import { ThemeNavMobile } from "./theme-nav-mobile";
import { LocaleSwitcherMobile } from "./locale-switcher-mobile";

interface HamburgerButtonProps {
  session?: Session | null;
  className?: string;
  buttonClassName?: string;
  style?: React.CSSProperties;
  lang: Locale;
  dictionary: Dictionary;
  routes: LocalizedRoutes[Locale];
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

export default function HamburgerButton({
  session,
  className,
  buttonClassName,
  style,
  variant,
  lang,
  dictionary,
  routes,
}: HamburgerButtonProps) {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger
          asChild
          className="flex min-w-0 items-center justify-center px-2 hover:bg-inherit"
          style={style}
        >
          {/* Attach the ref to the Button */}
          <Button
            variant={variant}
            className={cn(
              "rounded-md transition-colors duration-200",
              buttonClassName,
            )}
          >
            <HamburgerMenuIcon className="size-8 w-10" />
          </Button>
        </SheetTrigger>
        <SheetContent className="inset-y-0 flex max-h-screen flex-col justify-start gap-1 overflow-y-scroll border border-border/20 bg-backgroundSecondary text-title sm:hidden">
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
                    alt={session.user.name || dictionary.image.imageAlt}
                  />
                )}
                <AvatarFallback className="size-28 rounded-none">
                  {dictionary.image.imageError}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl">
                  {session.user.name || dictionary.userButton.noName}
                </p>
                <p>{session.user.email}</p>
              </div>
            </SheetHeader>
          )}

          {/* { Account } */}
          {session && (
            <>
              <Separator className="mb-1 bg-foreground/20" />
              <SheetClose asChild>
                <Link href={`/${lang}${routes.account}`}>
                  <Button
                    variant="navMobile"
                    asChild
                    className="flex justify-between px-7"
                    iconRight={<UserIcon />}
                  >
                    <p className="text-2xl font-bold">
                      {dictionary.profile.account.header}
                    </p>
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}
          {/* Etusivu */}
          {!session && <div className="h-[50px]" />}
          <SheetClose asChild>
            <Link className="" href="/">
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconHome />}
              >
                <p className="text-2xl font-bold">
                  {dictionary.navigation.home}
                </p>
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={`/${lang}${routes.chat}`}>
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

          <SheetClose asChild>
            <Link href={`/${lang}${routes.aboutUs}`}>
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconAboutUs />}
              >
                <p className="text-2xl font-bold">
                  {dictionary.navigation.aboutUs}
                </p>
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={`/${lang}${routes.contact}`}>
              <Button
                variant="navMobile"
                asChild
                className="flex justify-between px-7"
                iconRight={<IconContact />}
              >
                <p className="text-2xl font-bold">
                  {dictionary.navigation.contact}
                </p>
              </Button>
            </Link>
          </SheetClose>
          <ThemeNavMobile
            className="flex w-full justify-between"
            dictionary={dictionary}
          />
          <LocaleSwitcherMobile lang={lang} dictionary={dictionary} />

          {session ? (
            <SheetClose asChild>
              <SignOutButtonMobile
                className="flex w-full justify-between px-7"
                spanClassName="flex flex-row items-center justify-between  w-full"
                lang={lang}
                dictionary={dictionary}
                routes={routes}
              />
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Link href={`/${lang}${routes.auth.signIn}`}>
                <SignInButtonMobile
                  className="flex w-full justify-between px-7"
                  dictionary={dictionary}
                />
              </Link>
            </SheetClose>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

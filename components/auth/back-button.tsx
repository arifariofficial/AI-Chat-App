"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackBottonButtonProps {
  href: string;
  label: string;
}

export const BackBotton = ({ href, label }: BackBottonButtonProps) => {
  return (
    <Button
      variant={"link"}
      size={"sm"}
      asChild
      className="w-full font-normal text-foreground"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

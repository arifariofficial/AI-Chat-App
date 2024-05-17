"use client";

import { Poppins } from "next/font/google";
import { Typography } from "@mui/material";
import { cn } from "@lib/utils";
import { Avatar } from "@components/ui/avatar";
import { LockIcon } from "@components/ui/icons";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div
      className={cn(
        font,
        "flex w-full flex-col items-center justify-center gap-1",
      )}
    >
      <Avatar className="p-1">
        <LockIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        className="font-bold text-[#2a3d3d] dark:text-white"
      >
        {label}
      </Typography>
    </div>
  );
};

"use client";

import { Poppins } from "next/font/google";
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { cn } from "@lib/utils";

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
        "flex w-full flex-col items-center justify-center gap-y-4",
      )}
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h4"
        className="font-bold text-[#2a3d3d]"
      >
        {label}
      </Typography>
    </div>
  );
};

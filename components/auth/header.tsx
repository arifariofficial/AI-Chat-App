"use client";

import { Poppins } from "next/font/google";
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {label}
      </Typography>
    </div>
  );
};

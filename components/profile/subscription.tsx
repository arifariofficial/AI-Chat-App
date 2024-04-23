import { Typography } from "@mui/material";

export default function Subscription() {
  return (
    <div className="mt-10 flex w-full flex-col p-4">
      <Typography variant="h6">Subscription Details</Typography>
      <div>
        <Typography color="text.secondary">Plan: Premium</Typography>
        <Typography color="text.secondary">Status: Active</Typography>
      </div>
    </div>
  );
}

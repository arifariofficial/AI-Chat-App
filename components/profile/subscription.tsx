import { Card, CardContent, Typography } from "@mui/material";

export default function Subscription() {
  return (
    <div className="flex flex-col p-4 mt-10 w-full">
      <Typography variant="h6">Subscription Details</Typography>
      <div>
        <Typography color="text.secondary">Plan: Premium</Typography>
        <Typography color="text.secondary">Status: Active</Typography>
      </div>
    </div>
  );
}

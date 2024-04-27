"use client";

import React, { useState } from "react";
/* import { loadStripe, Stripe } from "@stripe/stripe-js"; */
import {
  Button,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import theme from "@components/theme";

export default function Subscription() {
  const [credits, setCredits] = useState<number>(1);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setCredits(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-10">
        <h1 className="mb-1 text-2xl font-semibold text-gray-800">
          Subscription
        </h1>
        <p className="text-gray-600">Manage your subscription settings</p>
      </div>
      <div className="flex max-w-md flex-col items-center space-y-4 rounded-xl border bg-white p-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Buy Credits For Your SIPE Chat
        </h1>
        <FormControl fullWidth>
          <InputLabel id="credits-select-label">Credits</InputLabel>
          <Select
            labelId="credits-select-label"
            id="credits-select"
            value={credits}
            label="Credits"
            onChange={handleSelectChange}
          >
            <MenuItem value={1}>1 EUR (20 credits)</MenuItem>
            <MenuItem value={2}>2 EUR (45 credits)</MenuItem>
          </Select>
        </FormControl>
        <Button fullWidth>Purchase</Button>
      </div>
    </ThemeProvider>
  );
}

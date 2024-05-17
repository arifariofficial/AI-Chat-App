"use client";

import React, { useState } from "react";
import {
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import theme from "@components/theme";
import { useToast } from "@components/ui/use-toast";
import axios from "axios";
import { Button } from "@components/ui/button";

type CreditOption = {
  value: number;
  label: string;
};

// Credit options
const creditOptions: CreditOption[] = [
  { value: 1, label: "1 EUR" },
  { value: 10, label: "10 EUR" },
  { value: 15, label: "15 EUR" },
  { value: 20, label: "20 EUR" },
];

export default function Balance() {
  const [loading, setLoading] = useState(false);
  const [credit, setCredit] = useState<number>(creditOptions[0].value);
  const { toast } = useToast();

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setCredit(Number(event.target.value)); // Number
  };

  const buyCredits = async () => {
    const amount = creditOptions.find((option) => option.value === credit);

    try {
      setLoading(true);

      const response = await axios.get("/api/stripe", {
        params: { amount: amount?.value },
      });

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        // Handle cases where the response does not contain the expected data
        toast({
          variant: "destructive",
          description:
            "Received an unexpected response. Please try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-10 dark:bg-inherit dark:text-white/80">
        <h1 className="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/80">
          Balance
        </h1>
        <p className="text-gray-600 dark:text-white/80">
          Manage your payment settings
        </p>
      </div>
      <div className="flex max-w-md flex-col items-center space-y-4 rounded-xl border bg-white px-8 py-6 dark:border-white/30 dark:bg-inherit dark:text-white/80">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white/80">
          Top Up Your Sipe Account
        </h1>
        <FormControl fullWidth>
          <InputLabel
            id="credit-select-label"
            className="mb-2  dark:border-white/30 dark:text-white/80"
          >
            Amount
          </InputLabel>
          <Select
            size="small"
            labelId="credit-select-label"
            id="credit-select"
            value={credit}
            label="Credits"
            onChange={handleSelectChange}
            className=" dark:bg-[#0b1322] dark:text-white/80"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "inherit",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "inherit",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "inherit",
              },
            }}
            MenuProps={{
              PaperProps: {
                className:
                  "dark:bg-[#0e172a] dark:text-white/80 dark:border-white/30 dark:border  dark:hover:text-white/",
              },
            }}
          >
            {creditOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                className="my-1 py-2 dark:hover:bg-[#162444] dark:active:bg-[#0e172a]"
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button disabled={loading} className="w-full" onClick={buyCredits}>
          Purchase
        </Button>
      </div>
    </ThemeProvider>
  );
}

"use client";

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

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
      console.error("Error purchasing credits:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex size-full flex-col items-center">
      <div className="mb-10 w-full bg-background text-foreground">
        <h1 className="mb-1 text-2xl font-semibold">Saldo</h1>
        <p>Hallitse maksuasetuksiasi</p>
      </div>
      <div className="flex w-full max-w-md flex-col items-center space-y-6 rounded-xl border border-border/30 bg-background px-8 py-6 text-foreground">
        <h1 className="text-lg font-semibold">Lataa saldoa Sipe-tilillesi</h1>
        <FormControl
          fullWidth
          className="text-foreground focus:text-foreground"
        >
          <InputLabel id="credit-select-label" className="mb-6">
            Määrä
          </InputLabel>
          <Select
            size="medium"
            labelId="credit-select-label"
            id="credit-select"
            value={credit}
            label="Credits"
            onChange={handleSelectChange}
          >
            {creditOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          disabled={loading}
          variant="default"
          className="h-ful my-10 w-2/3 p-5"
          onClick={buyCredits}
        >
          Osto
        </Button>
      </div>
    </div>
  );
}

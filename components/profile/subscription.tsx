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

/* const stripePromise = loadStripe("pk_test_yourStripePublicKey"); */

export default function Subscription() {
  const [credits, setCredits] = useState<number>(10);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setCredits(Number(event.target.value));
  };

  //TODO: Activate the subscription
  /*   const handlePurchase = async () => {
    const stripe: Stripe | null = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js hasn't loaded yet.");
      return;
    }
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: credits === 10 ? "price_10EUR_ID" : "price_20EUR_ID", // TODO: Replace  price IDs
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      console.error("Error:", error);
    }
  }; */

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
            onChange={handleSelectChange} // Now correctly typed
          >
            <MenuItem value={10}>10 EUR (20 credits)</MenuItem>
            <MenuItem value={20}>20 EUR (40 credits)</MenuItem>
          </Select>
        </FormControl>
        <Button /* onClick={handlePurchase} */ fullWidth>Purchase</Button>
      </div>
    </ThemeProvider>
  );
}

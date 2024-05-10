import { updateBalance } from "@actions/balance";
import prisma from "@lib/prisma";
import { stripe } from "@lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: unknown) {
    console.log("WEBHOOK_ERROR", error);
    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unknown error occurred";
    }
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("User ID is required in session metadata");
      return new NextResponse("User ID is required", { status: 400 });
    }
    if (!session.amount_total) {
      console.error("Amount is required in session metadata");
      return new NextResponse("Amount is required", { status: 400 });
    }

    const amount = session.amount_total / 100;

    try {
      await prisma.userPayment.create({
        data: {
          userId: userId,
          stripePaymentIntentId: session.payment_intent as string,
          amount: session.amount_total || 0,
          paymentStatus: "succeeded",
        },
      });

      await updateBalance(amount, userId);
    } catch (error) {
      console.error("Database operation error:", error);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  return new NextResponse("Webhook processed successfully", { status: 200 });
}

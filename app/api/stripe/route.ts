import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

const subscriptionUrl = absoluteUrl("/profile/balance");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");
  const amountNumber = parseInt(amount || "0");

  if (amountNumber <= 0) {
    console.log("Amount must be greater than 0.");
    return new NextResponse("Invalid amount", { status: 400 });
  }

  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!user.email || !user.id) {
      console.log(
        "User email and id is required for creating a Stripe session.",
      );
      return new NextResponse("User email and id is required", { status: 400 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: subscriptionUrl,
      cancel_url: subscriptionUrl,
      payment_method_types: ["card", "mobilepay", "paypal", "klarna"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.email, // Use the email from the user session
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${amountNumber} EUR`,
              description: `Buy ${amountNumber} EUR For Your SIPE Account `,
            },
            unit_amount: amountNumber * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("STRIPE_GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

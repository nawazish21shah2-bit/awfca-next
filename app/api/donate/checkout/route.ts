import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

const schema = z.object({
  amount: z.number().min(1).max(100000),
  frequency: z.enum(["one_time", "monthly"]),
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid donation data" },
        { status: 400 },
      );
    }

    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error:
            "Payments are not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Payments are not configured." },
        { status: 503 },
      );
    }

    const { amount, frequency, name, email } = parsed.data;
    const origin = new URL(request.url).origin;
    const unitAmount = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      customer_email: email,
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
      metadata: { donor_name: name, frequency },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: frequency === "monthly" ? "Monthly Donation" : "Donation",
              description: `Gift from ${name}`,
            },
            ...(frequency === "monthly"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to create checkout session." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[donate/checkout]", err);
    return NextResponse.json(
      { error: "Checkout failed. Please try again." },
      { status: 500 },
    );
  }
}

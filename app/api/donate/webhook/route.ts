import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  try {
    const rawBody = await request.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.info("[donate/webhook] donation completed", {
          id: session.id,
          email: session.customer_email,
          amount_total: session.amount_total,
          metadata: session.metadata,
        });
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[donate/webhook]", err);
    return NextResponse.json(
      { error: "Webhook verification failed." },
      { status: 400 },
    );
  }
}

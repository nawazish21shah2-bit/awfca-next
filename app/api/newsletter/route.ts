import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeNewsletter } from "@/lib/mail";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid email" },
        { status: 400 },
      );
    }
    await subscribeNewsletter(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}

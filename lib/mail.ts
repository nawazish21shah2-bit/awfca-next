/** Newsletter store stub — swap for Resend/Mailchimp/DB later. */
const subscribers = new Set<string>();

export async function subscribeNewsletter(email: string) {
  subscribers.add(email.toLowerCase());
  if (process.env.RESEND_API_KEY) {
    // Hook for Resend when configured
    console.info("[newsletter] would send via Resend:", email);
  } else {
    console.info("[newsletter] subscribed:", email);
  }
  return { ok: true as const };
}

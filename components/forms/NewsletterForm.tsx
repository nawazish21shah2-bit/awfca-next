"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("ok");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="newsletter-form">
      <div className="newsletter-form__field">
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
          className="newsletter-form__input"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="newsletter-form__submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
        >
          {status === "loading" ? (
            "…"
          ) : (
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M13.4442 1.43172C13.4442 0.948461 13.0523 0.556709 12.5692 0.556705L4.69414 0.556641C4.21089 0.556636 3.81914 0.948382 3.81914 1.43164C3.81913 1.91488 4.21088 2.30664 4.69413 2.30664L11.6941 2.3067V9.30669C11.6941 9.78995 12.0858 10.1817 12.5691 10.1817C13.0523 10.1817 13.4441 9.78995 13.4441 9.30669L13.4442 1.43172ZM2.0509 13.1872L13.1879 2.05043L11.9505 0.812981L0.813477 11.9497L2.0509 13.1872Z" />
            </svg>
          )}
        </button>
      </div>
      {message ? (
        <p
          className={`newsletter-form__message ${
            status === "ok" ? "is-success" : "is-error"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

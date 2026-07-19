"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  endpoint: "/api/contact" | "/api/volunteer";
  submitLabel: string;
  variant?: "contact" | "volunteer";
};

export function SubmissionForm({
  endpoint,
  submitLabel,
  variant = "contact",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      consent: fd.get("consent") === "on",
      ...(variant === "volunteer"
        ? {
            city: String(fd.get("city") ?? ""),
            country: String(fd.get("country") ?? ""),
            availability: String(fd.get("availability") ?? ""),
            skills: String(fd.get("skills") ?? ""),
            preferredRoles: String(fd.get("preferredRoles") ?? ""),
          }
        : {}),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "Thank you!");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className="contact-page__form" onSubmit={onSubmit} noValidate>
      <div className="contact-page__form-row">
        <label>
          First name
          <input name="firstName" required maxLength={80} autoComplete="given-name" />
        </label>
        <label>
          Last name
          <input name="lastName" required maxLength={80} autoComplete="family-name" />
        </label>
      </div>
      <div className="contact-page__form-row">
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            maxLength={160}
            autoComplete="email"
          />
        </label>
        <label>
          Phone
          <input name="phone" maxLength={40} autoComplete="tel" />
        </label>
      </div>

      {variant === "volunteer" ? (
        <>
          <div className="contact-page__form-row">
            <label>
              City
              <input name="city" maxLength={100} />
            </label>
            <label>
              Country
              <input name="country" maxLength={100} />
            </label>
          </div>
          <label>
            Availability
            <input name="availability" maxLength={500} placeholder="Weekends, evenings…" />
          </label>
          <label>
            Skills
            <textarea name="skills" maxLength={1000} rows={3} />
          </label>
          <label>
            Preferred roles
            <input
              name="preferredRoles"
              maxLength={500}
              placeholder="Events, packing, outreach…"
            />
          </label>
        </>
      ) : null}

      <label>
        Message
        <textarea name="message" maxLength={4000} rows={5} />
      </label>

      {/* Honeypot — hidden from users */}
      <label
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}
      >
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="contact-page__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to AWFCA contacting me about this inquiry and processing my
          details as described in the privacy policy.
        </span>
      </label>

      {status === "success" ? (
        <p className="contact-page__form-success" role="status">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="contact-page__form-error" role="alert">
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="contact-page__submit"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

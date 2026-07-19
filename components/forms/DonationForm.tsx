"use client";

import { useState } from "react";
import { donationPresets } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  compact?: boolean;
};

export function DonationForm({ compact }: Props) {
  const [amount, setAmount] = useState(36);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");

  const selected = custom ? Number(custom) : amount;
  const isValidAmount = Number.isFinite(selected) && selected >= 1;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      if (!selected || selected < 1) throw new Error("Enter a valid amount");
      const res = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selected,
          frequency,
          name,
          email,
        }),
      });
      const data = (await res.json()) as {
        url?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-3xl bg-white p-6 shadow-xl text-primary",
        compact ? "w-full max-w-[635px]" : "mx-auto max-w-xl p-8",
      )}
    >
      <h3 className="text-2xl font-bold">Donate now</h3>
      <p className="mt-2 text-sm text-muted">
        Choose an amount. Monthly gifts of $36 help kids access life-changing
        benefits.
      </p>

      <fieldset className="mt-5 border-0 p-0">
        <legend className="sr-only">Donation frequency</legend>
        <div className="flex gap-2">
          {(
            [
              ["one_time", "One-time"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={frequency === value}
              onClick={() => setFrequency(value)}
              className={cn(
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold",
                frequency === value
                  ? "bg-accent text-white"
                  : "bg-surface text-primary",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5 border-0 p-0">
        <legend className="sr-only">Donation amount</legend>
        <div className="grid grid-cols-3 gap-2">
          {donationPresets.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={!custom && amount === p}
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={cn(
                "rounded-xl border px-3 py-3 text-sm font-semibold",
                !custom && amount === p
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-[var(--color-divider)]",
              )}
            >
              ${p}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-4 block text-sm font-medium">
        Custom amount
        <input
          type="number"
          inputMode="decimal"
          min={1}
          step={1}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Enter amount"
          className="mt-1 w-full rounded-xl border border-[var(--color-divider)] px-4 py-3 outline-none focus:border-accent"
        />
      </label>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-divider)] px-4 py-3 outline-none focus:border-accent"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-divider)] px-4 py-3 outline-none focus:border-accent"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={status === "loading" || !isValidAmount}
        showIcon={false}
      >
        {status === "loading"
          ? "Redirecting…"
          : `Donate $${isValidAmount ? selected : amount}${
              frequency === "monthly" ? "/mo" : ""
            }`}
      </Button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: ComponentProps<"button">["onClick"];
  disabled?: boolean;
  showIcon?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  showIcon = true,
}: Props) {
  const classes = cn(
    "giveon-button",
    `giveon-button--${variant}`,
    !showIcon && "giveon-button--no-icon",
    disabled && "giveon-button--disabled",
    className,
  );

  const content = (
    <>
      <span className="giveon-button__label">{children}</span>
      {showIcon ? (
        <span className="giveon-button__icon" aria-hidden="true">
          <svg viewBox="0 0 14 14" focusable="false">
            <path d="M13.4442 1.43172C13.4442 0.948461 13.0523 0.556709 12.5692 0.556705L4.69414 0.556641C4.21089 0.556636 3.81914 0.948382 3.81914 1.43164C3.81913 1.91488 4.21088 2.30664 4.69413 2.30664L11.6941 2.3067V9.30669C11.6941 9.78995 12.0858 10.1817 12.5691 10.1817C13.0523 10.1817 13.4441 9.78995 13.4441 9.30669L13.4442 1.43172ZM2.0509 13.1872L13.1879 2.05043L11.9505 0.812981L0.813477 11.9497L2.0509 13.1872Z" />
          </svg>
        </span>
      ) : null}
    </>
  );

  if (href) {
    const external = /^https?:\/\//i.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as ComponentProps<"a">["onClick"]}
        aria-disabled={disabled || undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

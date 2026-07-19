import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/effects/Preloader";
import { MagicCursor } from "@/components/effects/MagicCursor";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "AWFCA — Arrahman Welfare Foundation Canada | Building a Brighter Future",
    template: "%s — AWFCA",
  },
  description:
    "Arrahman Welfare Foundation Canada is a CRA-registered charity fighting poverty through food support, education, healthcare, and emergency relief.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon.png", type: "image/png", sizes: "300x300" },
      { url: "/images/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {isAdmin ? (
          children
        ) : (
          <>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary"
            >
              Skip to content
            </a>
            <Preloader />
            <MagicCursor />
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}

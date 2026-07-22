import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/effects/Preloader";
import { MagicCursor } from "@/components/effects/MagicCursor";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('awfca-theme');
                  if (saved) {
                    const theme = JSON.parse(saved);
                    if (theme.id === 'emerald-hope') {
                      // Migrate old default theme to Crimson Compassion
                      document.documentElement.style.setProperty('--giveon-primary', '#1b2436');
                      document.documentElement.style.setProperty('--giveon-primary-soft', '#2a354c');
                      document.documentElement.style.setProperty('--giveon-accent', '#B10D13');
                      document.documentElement.style.setProperty('--giveon-accent-deep', '#940a0e');
                    } else {
                      if (theme.primary) document.documentElement.style.setProperty('--giveon-primary', theme.primary);
                      if (theme.primarySoft) document.documentElement.style.setProperty('--giveon-primary-soft', theme.primarySoft);
                      if (theme.accent) document.documentElement.style.setProperty('--giveon-accent', theme.accent);
                      if (theme.accentDeep) document.documentElement.style.setProperty('--giveon-accent-deep', theme.accentDeep);
                    }
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}

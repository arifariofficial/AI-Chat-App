import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import NavBarServer from "@/components/navbar/navbar-server";
import React from "react";
import { getChats } from "@/data/get-chat";
import CookieConsent from "@/components/cookie-consent";
import { i18n, Locale } from "@/i18n.config";

export const metadata: Metadata = {
  title: "Sipe AI - Innovating the Future",
  description:
    "Sipe AI provides intelligent solutions to help people find and utilize their rights effectively.",
  icons: "/favicon.ico",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const session = await auth().catch(() => null);
  const chats = session
    ? await getChats(session?.user?.id || "").catch(() => [])
    : [];

  const { lang } = await params;

  const navBar = await NavBarServer({ lang });

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn("bg-background text-foreground antialiased")}>
        <Toaster position="top-center" />

        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          chats={chats}
        >
          <SessionProvider basePath="/api/auth" session={session}>
            <main className="relative mx-auto flex size-full flex-col">
              {navBar}
              <CookieConsent />
              {children}
              <ShadToaster />
            </main>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

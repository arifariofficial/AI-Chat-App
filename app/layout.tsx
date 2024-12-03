import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import NavBarServer from "@/components/navbar/navbar-server";
import React, { Suspense } from "react";
import { getChats } from "@/data/get-chat";
import CookieConsent from "@/components/cookie-consent";
import { Loading } from "@/components/loading";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const chats = await getChats(session?.user?.id || ("" as string));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background text-foreground antialiased")}>
        <Toaster position="top-center" />
        <Suspense fallback={<Loading />}>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            chats={chats}
          >
            <SessionProvider basePath="/api/auth" session={session}>
              <main className="relative mx-auto flex size-full flex-col">
                <NavBarServer />
                <CookieConsent />
                {children}
                <ShadToaster />
              </main>
            </SessionProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

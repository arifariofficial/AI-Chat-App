import { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavBarServer from "@/components/navbar/navbar-server";

const inter = Inter({ subsets: ["latin"] });

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

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          GeistSans.variable,
          GeistMono.variable,
          "bg-background text-foreground antialiased",
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider basePath="/api/auth" session={session}>
            <main className="relative flex size-full flex-col">
              <NavBarServer />
              {children}
              <ShadToaster />
            </main>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

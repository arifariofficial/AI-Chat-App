import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@auth";
import NavBar from "@components/navbar/nav-bar";
import { cn } from "@lib/utils";
import { Providers } from "@components/providers";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import { Toaster as ShadToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SIPE | AI assistant",
  description: "Legal AI assistant",
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
          "bg-background text-foreground antialiased ",
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <div className="flex h-screen min-h-screen flex-col ">
              <NavBar session={session} />
              <main className="flex h-full flex-1  flex-col">{children}</main>
              <ShadToaster />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

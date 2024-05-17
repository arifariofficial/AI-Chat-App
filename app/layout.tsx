import { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@auth";
import NavBar from "@components/navbar/nav-bar";
import { ProModal } from "@components/pro-modals";
import { Toaster } from "@components/ui/toaster";
import { ThemeProvider } from "@components/theme-provider";
import { cn } from "@lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIPE | AI assistant",
  description: "Legal AI assistant",
  icons: "/favicon.ico",
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
        className={cn(inter.className, "dark:bg-[#0e172a] dark:text-white")}
      >
        <SessionProvider basePath="/api/auth" session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

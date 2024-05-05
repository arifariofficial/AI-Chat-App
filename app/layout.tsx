import { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@auth";
import NavBar from "@components/navbar/nav-bar";
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
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider basePath="/api/auth" session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

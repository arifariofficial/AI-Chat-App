import { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import NavBar from "@components/navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@auth";

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
        <SessionProvider baseUrl="/" session={session}>
          <NavBar session={session} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

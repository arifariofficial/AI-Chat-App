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

  console.log(process.env.NEXTAUTH_URL);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

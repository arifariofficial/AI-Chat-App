import { Metadata } from "next";
import "@./styles/globals.css";
import { ReactNode } from "react";
import SessionProvider from "@providers/SessionProvider";
import { getServerSession } from "next-auth";
import Nav from "@components/navbar/Navbar";

export const metadata: Metadata = {
  title: "SIPE | AI assistant",
  description: "Legal AI assistant",
  icons: "/favicon.ico",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Nav />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}

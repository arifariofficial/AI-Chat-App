import Nav from "@components/Navbar";
import Head from "next/head";
import { Metadata } from "next";
import "@./styles/globals.css";

import { ReactNode, Suspense } from "react";
import SessionProvider from "@./components/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "SIPE",
  description: "Legal AI assistant",
  icons: "/favicon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <SessionProvider session={session}>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

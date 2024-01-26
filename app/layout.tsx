import "@/styles/globals.css";
import Nav from "@components/Navbar";
import { Metadata } from "next";

import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "SIPE",
  description: "Legal AI assistant. Easing legal processes and counseling through AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}

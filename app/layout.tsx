import "@/styles/globals.css";
import Nav from "@components/Navbar";

import { ReactNode } from "react";

export const metadata = {
  title: "SIPE",
  description: "Legal AI assistant. Easing legal processes and counseling through AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}

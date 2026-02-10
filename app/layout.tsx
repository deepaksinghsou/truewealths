import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "True Wealths | Real Learning. Real Growth.",
  description:
    "Education-first financial advisory platform focused on long-term wealth creation through discipline and clarity."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}

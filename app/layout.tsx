import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep — AI Sales CRM",
  description:
    "AI-powered sales CRM for tracking deals, pipeline health, and customer conversations.",
};

export const viewport: Viewport = {
  themeColor: "#054640",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}

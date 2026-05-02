import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 Project",
  description: "Base project for v0 generated UI"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

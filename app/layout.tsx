import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedTouch.ai - AI Triage System",
  description: "Smart Emergency Triage Dashboard powered by AI - Multilingual Support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

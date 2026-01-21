import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MCA Express LLC | Professional Trucking & Freight Services",
  description:
    "MCA Express LLC provides reliable, nationwide trucking and freight transportation services. Delivering your cargo safely and on time across America.",
  keywords: [
    "trucking",
    "freight",
    "transportation",
    "logistics",
    "shipping",
    "cargo",
    "MCA Express",
  ],
  authors: [{ name: "MCA Express LLC" }],
  openGraph: {
    title: "MCA Express LLC | Professional Trucking & Freight Services",
    description:
      "Reliable, nationwide trucking and freight transportation services. Delivering your cargo safely and on time.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1565C0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

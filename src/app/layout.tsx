import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "A little invitation 💕",
    template: "%s",
  },
  description:
    "There's a little invitation waiting for you. Made with care, just for you.",
  openGraph: {
    type: "website",
    title: "I have something to ask you 💕",
    description:
      "There's a little invitation waiting for you. Made with care, just for you.",
    siteName: "Date Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title: "I have something to ask you 💕",
    description:
      "There's a little invitation waiting for you. Made with care, just for you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff5f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

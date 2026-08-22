import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const geist = GeistSans;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-bodoni",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Gini | The first blood test built for women",
  description:
    "A blood test built for women's bodies - timed to your cycle and read against your symptoms and history, so your next appointment starts with real context. Join the beta.",
  icons: {
    icon: "/ginitabicon.png?v=3",
    apple: "/ginitabicon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} ${bodoni.variable} ${cormorant.variable}`}>
      <body className="bg-gini-surface font-sans antialiased text-neutral-950">
        {children}
      </body>
    </html>
  );
}

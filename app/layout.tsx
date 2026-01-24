import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garet = localFont({
  src: [
    {
      path: "../public/fonts/Garet-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Garet-Heavy.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Garet-Regular.ttf",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-garet",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fazal-e-Insaaniyat Charity Works",
  description: "Charity organization focused on humanitarian aid and community development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garet.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

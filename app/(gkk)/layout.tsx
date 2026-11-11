import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

export const dynamic = "force-dynamic";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/site/Poppins-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/site/Poppins-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/site/Poppins-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/site/Poppins-800.woff2",
      weight: "800",
      style: "normal",
    }
  ],
  variable: "--font-poppins",
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
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

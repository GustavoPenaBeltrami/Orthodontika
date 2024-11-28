import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "STS Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

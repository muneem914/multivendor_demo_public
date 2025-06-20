import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import ClientProvider from "./ClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fourbtech App",
  description: "An E-commerce application for reliability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ClientProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

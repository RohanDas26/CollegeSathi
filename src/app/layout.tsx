import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppContext";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "College Sathi",
  description: "Discover the Right College that Fits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <AppProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}

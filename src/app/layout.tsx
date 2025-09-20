import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const FunnelFont = Funnel_Display({
  weight: ["300", "400", "500", "600", "700","800"],
  variable: "--font-funnel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons:{
    icon: '/favicon.ico'
  },
  title: "CashBook",
  description: "A personal finance app to help you manage your money better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      
    <html lang="en">
      <body
        className={`${FunnelFont.variable} text-zinc-100 bg-zinc-900 antialiased`}
        >
      <Navbar />
        {children}
        <Toaster richColors position="top-right" toastOptions={{
    style: {
      background: 'black',
      color: 'white',
    },
  }}/>
      </body>
    </html>
        </ClerkProvider>
  );
}

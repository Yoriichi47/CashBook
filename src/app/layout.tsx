import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Navbar from "./components/Navbar";

const FunnelFont = Funnel_Display({
  weight: ["300", "400", "500", "600", "700","800"],
  variable: "--font-funnel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/Finance_Uchiha_icon.png",
  },
  title: "Finance Uchiha",
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
        className={`${FunnelFont.variable} bg-zinc-900 antialiased`}
        >
      <Navbar />
        {children}
      </body>
    </html>
        </ClerkProvider>
  );
}

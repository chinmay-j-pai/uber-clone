import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Script from "next/script";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      {/* <header> */}
        
      <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
        <Header />
        {/* <UserButton /> <UserButton showName/> */}
        </SignedIn>

      {/* </header> */}
        {children}</body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
    </ClerkProvider>
  );
}
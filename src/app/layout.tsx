import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedOut,
} from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import ClientProvider from "./ClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bipolar Management Dashboard",
  description: "Generated by create next app",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ClientProvider>
            <Navbar />
            {children}
          </ClientProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}

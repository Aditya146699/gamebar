import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Bar",
  description: "Variety of classic games like Tic-Tac-Toe, Memory Cards, Hangman, Rock Paper Scissors, Connect 4, and 2048",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<div className="navbar bg-base-100">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" href="/">Game BAR</Link>
  </div>
  <div className="flex-none gap-2">

  <ThemeProvider>

  </ThemeProvider>
</div>
</div>


        {children}
      </body>
    </html>
  );
}

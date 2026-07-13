import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shustota AI - AI-powered Healthcare Assistant for Everyone",
  description:
    "Shustota একটি AI-চালিত Healthcare Platform, যা আপনাকে স্বাস্থ্য-সংক্রান্ত তথ্য, প্রাথমিক নির্দেশনা এবং চিকিৎসা-সহায়ক সেবা প্রদান করে। Experience intelligent healthcare guidance powered by advanced AI.",
  keywords: [
    "AI Healthcare",
    "Health Assistant",
    "Doctor Discovery",
    "Medicine Intelligence",
    "Shustota",
    "স্বাস্থ্যসেবা",
  ],
};

import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" translate="no" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

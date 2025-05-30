import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ParallaxProviderWrapper from "@/components/ParallaxProviderWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moonrunners Community Takeover Proposal | 🐺 Wolves of Many Talents",
  description: "Join the pack! A community-driven proposal to take over the Moonrunners project with our Wolf Council leadership team. Vote now to shape the future of Moonrunners.",
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
        <ParallaxProviderWrapper>
          {children}
        </ParallaxProviderWrapper>
      </body>
    </html>
  );
}

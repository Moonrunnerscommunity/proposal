import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ParallaxProviderWrapper from "@/components/ParallaxProviderWrapper";
import "./globals.css";
import { AppProviders } from "@/components/unstake/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8a6fb7' },
    { media: '(prefers-color-scheme: dark)', color: '#2d1b69' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://moonrunners.ai'),
  title: "Moonrunners 2.0 | 🐺 Wolves of Many Talents",
  description: "The pack is back. Community-owned and building forward. Protect the Pack.",
  keywords: ["Moonrunners", "NFT", "Community", "Wolf Council", "Web3", "Cryptocurrency"],
  authors: [{ name: "Moonrunners Wolf Council" }],
  creator: "Moonrunners Wolf Council",
  publisher: "Moonrunners Community",

  // Open Graph tags for Facebook, LinkedIn, Discord, etc.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moonrunners.ai',
    siteName: 'Moonrunners Community',
    title: 'Moonrunners 2.0 | Wolves of Many Talents',
    description: 'The pack is back. Community-owned and building forward. Protect the Pack.',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Moonrunners Community - Wolves of Many Talents',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    site: '@MoonrunnersNFT',
    creator: '@MoonrunnersNFT',
    title: 'Moonrunners 2.0 | Wolves of Many Talents',
    description: 'The pack is back. Community-owned and building forward. Protect the Pack.',
    images: ['/social-card.png'],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // App-specific metadata
  applicationName: 'Moonrunners',
  referrer: 'origin-when-cross-origin',
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
        <AppProviders>
          <ParallaxProviderWrapper>
            {children}
          </ParallaxProviderWrapper>
        </AppProviders>
      </body>
    </html>
  );
}

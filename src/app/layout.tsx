import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Moonrunners Community Takeover Proposal | 🐺 Wolves of Many Talents",
  description: "Join the pack! A community-driven proposal to take over the Moonrunners project with our Wolf Council leadership team. Vote now to shape the future of Moonrunners.",
  keywords: ["Moonrunners", "NFT", "Community", "Takeover", "Proposal", "Wolf Council", "Web3", "Cryptocurrency"],
  authors: [{ name: "Moonrunners Wolf Council" }],
  creator: "Moonrunners Wolf Council",
  publisher: "Moonrunners Community",
  
  // Open Graph tags for Facebook, LinkedIn, etc.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moonrunners.ai',
    siteName: 'Moonrunners Community Proposal',
    title: 'Moonrunners Community Takeover Proposal | 🐺 Wolves of Many Talents',
    description: 'Join the pack! A community-driven proposal to take over the Moonrunners project with our Wolf Council leadership team. Vote now to shape the future of Moonrunners.',
    images: [
      {
        url: '/social-card.svg',
        width: 1200,
        height: 630,
        alt: 'Moonrunners Community Takeover Proposal - Wolves of Many Talents',
        type: 'image/svg+xml',
      },
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Moonrunners Community Takeover Proposal - Wolves of Many Talents',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    site: '@MoonrunnersNFT',
    creator: '@MoonrunnersNFT',
    title: 'Moonrunners Community Takeover Proposal | 🐺 Wolves of Many Talents',
    description: 'Join the pack! A community-driven proposal to take over the Moonrunners project with our Wolf Council leadership team. Vote now! 🗳️',
    images: ['/social-card.svg', '/social-card.png'],
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
  
  // Verification and other tags
  verification: {
    // Add verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  
  // App-specific metadata
  applicationName: 'Moonrunners Proposal',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8a6fb7' },
    { media: '(prefers-color-scheme: dark)', color: '#2d1b69' },
  ],
  
  // Manifest
  manifest: '/manifest.json', // You might want to create this later
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

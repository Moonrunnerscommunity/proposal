import type { Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8a6fb7' },
    { media: '(prefers-color-scheme: dark)', color: '#2d1b69' },
  ],
};

export default function UnstakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
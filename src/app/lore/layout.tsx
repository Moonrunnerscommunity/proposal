'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Vollkorn } from 'next/font/google';
import { loreSeasons } from '@/config/lore';

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lore',
});

export default function LoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getCurrentSeason = () => {
    const match = pathname.match(/\/lore\/(.+)/);
    return match ? match[1] : 'season-1';
  };

  const currentSeason = getCurrentSeason();

  return (
    <div className={`relative w-full min-h-screen ${vollkorn.variable}`}>
      <style jsx global>{`
        .font-lore {
          font-family: var(--font-lore), serif;
        }
      `}</style>
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallax/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 lg:w-64 bg-black/60 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col">
          {/* Logo area */}
          <div className="p-3 lg:py-4 lg:px-3 border-b border-purple-500/30 overflow-hidden">
            <Link href="/" className="flex flex-col items-center text-center w-full hover:opacity-80 transition-opacity">
              <span className="text-2xl lg:text-4xl">🐺</span>
              <span className="hidden lg:block text-base font-bold text-white mt-1">Moonrunners 2.0</span>
              <span className="hidden lg:block text-[10px] text-purple-300 italic">Protect the Pack</span>
            </Link>
          </div>

          {/* Back to Home Link */}
          <div className="p-2 border-b border-purple-500/30">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-600/20 hover:text-white transition-all"
            >
              <span className="text-lg">&#8592;</span>
              <span className="hidden lg:block text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Lore Title */}
          <div className="p-3 lg:p-4 border-b border-purple-500/30">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-xl">📖</span>
              <span className="hidden lg:block text-lg font-bold text-white">Lore</span>
            </div>
          </div>

          {/* Season Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {loreSeasons.map((season) => (
                <li key={season.id}>
                  <Link
                    href={`/lore/${season.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                      currentSeason === season.id
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">
                      {season.id === 'season-1' ? '1️⃣' : season.id === 'season-2' ? '2️⃣' : season.id === 'season-3' ? '3️⃣' : '4️⃣'}
                    </span>
                    <div className="hidden lg:block">
                      <span className="text-sm font-medium block">{season.title}</span>
                      <span className="text-xs text-gray-400">{season.subtitle}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="p-3 lg:p-4 border-t border-purple-500/30">
            <a
              href="https://discord.gg/CNg6gBCF7T"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-white transition-colors"
            >
              <span className="text-lg">💬</span>
              <span className="hidden lg:block text-sm font-medium">Join Discord</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-16 sm:ml-20 lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Overview', icon: '🏠' },
  { href: '/todo', label: 'Todo List', icon: '📋' },
  { href: '/operations', label: 'Operations', icon: '⚙️' },
  { href: '/contracts', label: 'Contracts', icon: '📜' },
  { href: '/team', label: 'Team', icon: '🐺' },
  { href: '/vision', label: 'Vision', icon: '✨' },
  { href: '/comms', label: 'Communications', icon: '💬' },
  { href: '/unstake', label: 'Unstaking', icon: '🔓' },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallax/bg.png"
          alt="Background"
          fill
          className="parallax-image object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Mountains layer - fixed at bottom */}
      <div className="fixed sm:bottom-[-100px] bottom-[100px] left-0 right-0 z-10 pointer-events-none">
        <Image
          src="/parallax/mountains.png"
          alt="Mountains"
          width={1600}
          height={1000}
          className="parallax-image object-contain object-bottom w-full"
          unoptimized
        />
      </div>

      {/* Clouds layer - fixed at top right (avoiding sidebar) */}
      <div className="fixed top-5 sm:top-0 left-64 right-0 z-20 pointer-events-none">
        <Image
          src="/parallax/clouds.png"
          alt="Clouds"
          width={1200}
          height={600}
          className="parallax-image object-contain w-full max-w-4xl mx-auto opacity-60"
          unoptimized
        />
      </div>

      {/* Main content with sidebar */}
      <div className="relative z-40">
        <div className="flex min-h-screen">
          {/* Left Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 lg:w-64 bg-black/60 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col">
            {/* Logo area */}
            <div className="p-3 lg:py-4 lg:px-3 border-b border-purple-500/30 overflow-hidden">
              <Link href="/" className="flex flex-col items-center text-center w-full">
                <span className="text-2xl lg:text-4xl">🐺</span>
                <span className="hidden lg:block text-base font-bold text-white mt-1">Moonrunners 2.0</span>
                <span className="hidden lg:block text-[10px] text-purple-300 italic">Protect the Pack</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                          : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <span className="hidden lg:block text-sm font-medium truncate">
                        {item.label}
                      </span>
                      {/* Active indicator for mobile */}
                      {isActive(item.href) && (
                        <div className="lg:hidden absolute right-0 w-1 h-8 bg-purple-400 rounded-l-full" />
                      )}
                    </Link>
                  </li>
                ))}
                {/* Lore Link */}
                <li>
                  <Link
                    href="/lore"
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                      pathname.startsWith('/lore')
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">📖</span>
                    <span className="hidden lg:block text-sm font-medium truncate">
                      Lore
                    </span>
                  </Link>
                </li>
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
    </div>
  );
}

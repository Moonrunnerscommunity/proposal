'use client';

import React from 'react';

interface NavigationCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: 'contracts',
    icon: '📜',
    title: 'Contracts',
    description: 'Smart contracts, ownership status, and on-chain assets',
    accent: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 'operations',
    icon: '⚙️',
    title: 'Operations',
    description: 'Domains, socials, and infrastructure handover',
    accent: 'from-blue-500/20 to-cyan-600/20',
  },
  {
    id: 'team',
    icon: '🐺',
    title: 'Team',
    description: 'Meet the pack leading this community initiative',
    accent: 'from-purple-500/20 to-violet-600/20',
  },
  {
    id: 'todo',
    icon: '📋',
    title: 'Progress',
    description: 'Track what we\'ve done and what\'s next',
    accent: 'from-emerald-500/20 to-green-600/20',
  },
  {
    id: 'unstaking',
    icon: '🔓',
    title: 'Unstaking',
    description: 'Retrieve staked NFTs from legacy contracts',
    accent: 'from-rose-500/20 to-pink-600/20',
  },
  {
    id: 'vision',
    icon: '✨',
    title: 'Vision',
    description: 'Our goals and direction for the community',
    accent: 'from-yellow-500/20 to-amber-600/20',
  },
];

interface OverviewTabProps {
  onNavigate?: (tabId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
        {/* Wolf Icon */}
        <div className="mb-6">
          <span className="text-6xl sm:text-7xl lg:text-8xl inline-block animate-float">
            🐺
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Moonrunners <span className="text-gradient">Community Takeover</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
          The pack is back. Community-owned and building forward.
        </p>
      </div>

      {/* Mission Card */}
      <div
        className="glass p-6 sm:p-8 rounded-2xl mb-12 animate-fade-in-up-delay-1 relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-amber-400/40 rounded-tl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-amber-400/40 rounded-br-lg" />

        <div className="text-center relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-amber-400">///</span>
            Our Mission
            <span className="text-amber-400">///</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            Restore the assets. Rebuild the community. Run together.
          </p>
          <div className="inline-block">
            <p className="text-xl sm:text-2xl font-bold text-gradient">
              Protect the Pack
            </p>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 animate-fade-in-up-delay-2">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">6/9</div>
          <div className="text-xs sm:text-sm text-gray-400">Contracts Transferred</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1">15K+</div>
          <div className="text-xs sm:text-sm text-gray-400">NFTs Preserved</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">100%</div>
          <div className="text-xs sm:text-sm text-gray-400">Metadata Restored</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">Open</div>
          <div className="text-xs sm:text-sm text-gray-400">Governance</div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="animate-fade-in-up-delay-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => onNavigate?.(card.id)}
              className={`
                group relative p-5 rounded-xl text-left
                bg-gradient-to-br ${card.accent}
                border border-purple-500/20 hover:border-purple-400/40
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10
                flex gap-4
              `}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Icon - floated left */}
              <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {card.icon}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title with arrow */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                    {card.title}
                  </h4>
                  <span className="text-purple-400/50 group-hover:text-purple-300 group-hover:translate-x-1 transition-all flex-shrink-0">
                    →
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {card.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center animate-fade-in-up-delay-3">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://discord.gg/CNg6gBCF7T"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            💬 Join Discord
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="https://twitter.com/MoonrunnersNFT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            🐦 Follow on Twitter
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="/lore"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            📖 Read the Lore
          </a>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;

'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ExperimentalCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  status: 'alpha' | 'beta' | 'wip';
}

const experiments: ExperimentalCard[] = [
  {
    title: 'Specs Viewer',
    description: 'Markdown-based documentation and specification viewer for internal docs.',
    href: '/specs',
    icon: '📄',
    status: 'beta',
  },
  {
    title: 'GitHub',
    description: 'Source code and community repos for Moonrunners projects.',
    href: 'https://github.com/Moonrunnerscommunity',
    icon: '🐙',
    status: 'beta',
  },
];

const statusColors = {
  alpha: 'bg-red-900/30 text-red-400 border-red-500/30',
  beta: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
  wip: 'bg-purple-900/30 text-purple-400 border-purple-500/30',
};

export default function ExperimentalPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background */}
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

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              🧪 Experimental
            </h1>
            <p className="text-gray-400">
              Early access to tools and features in development. Things might break.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiments.map((experiment) => {
              const isExternal = experiment.href.startsWith('http');
              return (
              <Link
                key={experiment.href}
                href={experiment.href}
                className="group block"
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="glass-dark border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{experiment.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded border ${statusColors[experiment.status]}`}>
                      {experiment.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {experiment.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {experiment.description}
                  </p>
                </div>
              </Link>
              );
            })}

            {/* Placeholder for future experiments */}
            <div className="glass-dark border border-dashed border-purple-500/20 rounded-xl p-6 flex items-center justify-center min-h-[160px]">
              <p className="text-gray-600 text-sm italic">More experiments coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

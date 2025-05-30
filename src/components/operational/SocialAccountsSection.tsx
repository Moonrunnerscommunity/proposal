'use client';

import React from 'react';
import { ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const SocialAccountsSection = () => {
  const discordInfo = {
    serverName: 'Moonrunners',
    serverId: '990394615121195068',
    inviteUrl: 'https://discord.gg/SC3TFQrKwf'
  };

  const twitterInfo = {
    handle: '@MoonrunnersNFT',
    followers: '64.7K',
    url: 'https://x.com/MoonrunnersNFT'
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Discord */}
      <div className="glass-dark p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
          Discord
        </h4>
        
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            Our main community hub with thousands of active members. Server ownership includes admin permissions and community management tools.
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)' }}>
            <span style={{ color: 'var(--foreground)' }}>Server:</span>
            <span className="font-medium" style={{ color: 'var(--color-light-purple)' }}>{discordInfo.serverName}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)' }}>
            <span style={{ color: 'var(--foreground)' }}>ID:</span>
            <span className="font-mono text-xs" style={{ color: 'var(--foreground)' }}>{discordInfo.serverId}</span>
          </div>
          <div className="flex justify-center mt-4">
            <a 
              href={discordInfo.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 rounded transition-colors text-blue-300"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-400" />
              Join Discord
            </a>
          </div>
        </div>
      </div>

      {/* Twitter */}
      <div className="glass-dark p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
          Twitter
        </h4>
        
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
            Our primary public communication channel for announcements and community updates with 64.7K followers.
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)' }}>
            <span style={{ color: 'var(--foreground)' }}>Handle:</span>
            <span className="font-medium" style={{ color: 'var(--color-light-purple)' }}>{twitterInfo.handle}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)' }}>
            <span style={{ color: 'var(--foreground)' }}>Followers:</span>
            <span className="font-medium" style={{ color: 'var(--color-accent-gold)' }}>{twitterInfo.followers}</span>
          </div>
          <div className="flex justify-center mt-4">
            <a 
              href={twitterInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 rounded transition-colors text-blue-300"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-400" />
              Visit Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAccountsSection; 
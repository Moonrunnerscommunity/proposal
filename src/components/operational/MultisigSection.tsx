'use client';

import React, { useState } from 'react';
import { CheckIcon, ArrowTopRightOnSquareIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { findTeamMember } from '../../config/teamData';

const MultisigSection = () => {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  
  // Get Cartel's data from centralized config
  const cartelData = findTeamMember('Cartel');

  // Helper function to truncate wallet addresses for mobile
  const truncateAddress = (address: string, startChars: number = 8, endChars: number = 6) => {
    if (!address) return '';
    return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
  };

  const multisigAddress = '0xf728942638942DF1a31e10722d49C1E758B2F8F1';

  const handleCopyWallet = async (walletAddress: string) => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopiedWallet(walletAddress);
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (err) {
      console.error('Failed to copy wallet address:', err);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
        <CheckIcon className="w-5 h-5 text-green-500" />
        Multisig Wallet
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Wallet Details (Green Theme for Set Up) */}
        <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="font-mono text-sm text-green-200 bg-green-950/50 p-3 rounded border flex-1">
              {truncateAddress(multisigAddress, 10, 8)}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(multisigAddress)}
              className="flex items-center justify-center w-10 h-10 bg-green-800/50 hover:bg-green-700/50 border border-green-500/30 rounded transition-colors"
              title="Copy wallet address"
            >
              <ClipboardIcon className="w-4 h-4 text-green-400" />
            </button>
          </div>
          <div className="text-green-300 text-xs">
            Safe multisig wallet configured and operational
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`https://app.safe.global/home?safe=eth:${multisigAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              View on Safe
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-4">
            <h5 className="text-green-300 font-medium mb-2">Authorized Addresses:</h5>
            <div className="bg-green-950/30 p-4 rounded text-sm text-green-200">
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <div className="font-medium text-green-200">Cartel</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs text-green-400 bg-green-900/30 p-2 rounded flex-1">
                      {truncateAddress(cartelData?.walletAddress || '[Wallet address not found]', 14, 10)}
                    </div>
                    {cartelData?.walletAddress && (
                      <button
                        onClick={() => handleCopyWallet(cartelData.walletAddress!)}
                        className="flex items-center justify-center w-6 h-6 bg-green-800/50 hover:bg-green-700/50 border border-green-500/30 rounded transition-colors"
                        title="Copy wallet address"
                      >
                        {copiedWallet === cartelData.walletAddress ? (
                          <CheckIcon className="w-3 h-3 text-green-300" />
                        ) : (
                          <ClipboardIcon className="w-3 h-3 text-green-400" />
                        )}
                      </button>
                    )}
                  </div>
                  {copiedWallet === cartelData?.walletAddress && (
                    <div className="text-green-300 text-xs">
                      Wallet address copied to clipboard!
                    </div>
                  )}
                </div>
                <div className="text-center text-xs pt-3">
                  <div className="inline-flex items-center px-3 py-2 rounded-lg border-2 border-red-500/50 bg-red-900/20 text-red-400">
                    Additional signers need to be configured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Explanation (Standard Theme) */}
        <div className="glass-dark p-6 rounded-lg space-y-4">
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--color-starlight)' }}>What is a Multisig Wallet?</h5>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              A multisignature (multisig) wallet is a cryptocurrency wallet that requires multiple private keys to authorize transactions, providing enhanced security and shared control over digital assets.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--color-starlight)' }}>Our Implementation</h5>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              This multisig wallet serves as the secure treasury for all Moonrunners assets and funds. Requiring multiple signatures from trusted community leaders ensures that no single individual can make unilateral decisions with community resources, providing transparency and protection against misuse of funds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultisigSection; 
'use client';

import React, { useState } from 'react';
import { CheckIcon, XMarkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, ClipboardIcon, ExclamationTriangleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

interface Domain {
  name: string;
  transferred: boolean;
  label?: string;
  accounts: string[];
}

interface Contract {
  collection: string;
  description: string;
  items: number;
  currentOwner: string;
  contractAddress: string;
  transferred: boolean;
  notIncluded?: boolean;
  imageUrl: string;
  openseaUrl: string;
}

const OperationalSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

  const email = 'communitymoonrunners@gmail.com';

  const domains: Domain[] = [
    { 
      name: 'moonrunners.ai', 
      transferred: true, 
      label: 'This Site',
      accounts: ['GoDaddy', 'Vercel']
    },
    { 
      name: 'moonrunners.io', 
      transferred: false,
      accounts: ['GoDaddy', 'Heroku', 'Others (TBD)']
    },
  ];

  const contracts: Contract[] = [
    {
      collection: 'Moonrunners',
      description: 'Original collection of 10,000 unique Moonrunners NFTs with moon-based mechanics',
      items: 9200,
      currentOwner: 'Antix.eth',
      contractAddress: '0x1485297e942ce64e0870ece60179dfda34b4c625',
      transferred: false,
      imageUrl: '/nft-moonrunners.svg',
      openseaUrl: 'https://opensea.io/collection/moonrunnersnft'
    },
    {
      collection: 'Dragonhorde',
      description: 'Arcane Dragons resurrected in the Alchemy Lab from Primordia\'s ancient past',
      items: 2800,
      currentOwner: 'Antix.eth',
      contractAddress: '0x717c6dd66be92e979001aee2ee169aaa8d6d4361',
      transferred: false,
      imageUrl: '/nft-dragonhorde.svg',
      openseaUrl: 'https://opensea.io/collection/moonrunners-dragonhorde-official'
    },
    {
      collection: 'Secrets of Primordia',
      description: 'Weapons and artifacts with dual utility - burn for blood or reroll Dragonhorde',
      items: 15000,
      currentOwner: 'Antix.eth',
      contractAddress: '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4',
      transferred: false,
      imageUrl: '/nft-weapons.svg',
      openseaUrl: 'https://opensea.io/collection/moonrunners-secrets-of-primordia'
    },
    {
      collection: 'Primordia Land',
      description: 'Digital land parcels with quarterly USDC yield from real-world businesses',
      items: 8088,
      currentOwner: 'Antix.eth',
      contractAddress: '0x8e4f3c6a7b2d9c5e8f1a3b6c9d2e5f8a1b4c7e0d',
      transferred: false,
      notIncluded: true,
      imageUrl: '/nft-land.svg',
      openseaUrl: 'https://opensea.io/collection/moonrunners-primordia-land'
    }
  ];

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleCopyContract = async (contractAddress: string) => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopiedContract(contractAddress);
      setTimeout(() => setCopiedContract(null), 2000);
    } catch (err) {
      console.error('Failed to copy contract address:', err);
    }
  };

  return (
    <section className="section relative">
      <div className="fixed-width">
        <div className="glass p-8 rounded-lg">
          <h2 className="text-responsive-2xl font-bold text-center mb-8 text-gradient">
            Operational Details
          </h2>
          
          <div className="space-y-8">
            <h3 className="text-responsive-xl font-semibold mb-6" style={{ color: 'var(--color-starlight)' }}>
              Handover Checklist
            </h3>
            
            <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                This comprehensive checklist tracks all critical assets, accounts, and operational components that must be successfully transferred to ensure a smooth community takeover. Each item represents a vital piece of the Moonrunners ecosystem, from financial controls and digital assets to communication channels and technical infrastructure. By maintaining transparent visibility into the handover process, we ensure accountability, build community confidence, and guarantee that no essential element is overlooked during this important transition.
              </p>
            </div>

            {/* Multisig Wallet Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
                <XMarkIcon className="w-5 h-5 text-red-500" />
                Multisig Wallet
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Wallet Details (Red Theme for Not Set Up) */}
                <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-6 backdrop-blur-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm text-red-200 bg-red-950/50 p-3 rounded border flex-1 text-center">
                      Not Set Up Yet
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-red-800/50 border border-red-500/30 rounded">
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    </div>
                  </div>
                  <div className="text-red-300 text-xs">
                    Multisig wallet configuration pending
                  </div>
                  <div className="inline-flex items-center gap-2 text-red-400 opacity-50 cursor-not-allowed">
                    <NoSymbolIcon className="w-4 h-4" />
                    Etherscan unavailable
                  </div>
                  <div className="mt-4">
                    <h5 className="text-red-300 font-medium mb-2">Authorized Addresses:</h5>
                    <div className="bg-red-950/30 p-4 rounded text-sm text-center text-red-400 italic">
                      No addresses configured yet
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
                      This multisig wallet will serve as the secure treasury for all Moonrunners assets and funds. Requiring multiple signatures from trusted community leaders ensures that no single individual can make unilateral decisions with community resources, providing transparency and protection against misuse of funds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
                <CheckIcon className="w-5 h-5 text-green-500" />
                Email Address
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Email Details (Green Theme) */}
                <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-6 backdrop-blur-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm text-green-200 bg-green-950/50 p-3 rounded border flex-1">
                      {email}
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center justify-center w-10 h-10 bg-green-800/50 hover:bg-green-700/50 border border-green-500/30 rounded transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <CheckIcon className="w-4 h-4 text-green-300" />
                      ) : (
                        <ClipboardIcon className="w-4 h-4 text-green-400" />
                      )}
                    </button>
                  </div>
                  {copiedEmail && (
                    <div className="text-green-300 text-xs">
                      Email copied to clipboard!
                    </div>
                  )}
                  <a 
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                    Contact Us
                  </a>
                </div>

                {/* Right Column - Explanation (Standard Theme) */}
                <div className="glass-dark p-6 rounded-lg space-y-4">
                  <div>
                    <h5 className="font-medium mb-3" style={{ color: 'var(--color-starlight)' }}>Our Implementation</h5>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                      This email address serves as the primary communication channel for all platform administration, community governance, and operational matters. It ensures transparent and accessible communication between the community leadership and all stakeholders throughout the transition process and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Domains Section */}
            <div className="glass-dark p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                Domains
              </h4>
              
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  Domain ownership controls the primary digital identity and web presence of the Moonrunners brand. These domains host critical infrastructure including websites, APIs, and email services. Successful transfer ensures community control over all public-facing digital assets and prevents potential disruption to user access and brand continuity.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'rgba(138, 111, 183, 0.3)' }}>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Domain</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Status</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Accounts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'rgba(138, 111, 183, 0.2)' }}>
                    {domains.map((domain, index) => (
                      <tr 
                        key={index} 
                        className="transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(28, 13, 54, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium" style={{ color: 'var(--color-light-purple)' }}>
                              {domain.name}
                            </span>
                            {domain.label && (
                              <span className="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-500/30">
                                {domain.label}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {domain.transferred ? (
                              <>
                                <CheckIcon className="w-5 h-5 text-green-500" />
                                <span className="text-green-400 text-sm">Transferred</span>
                              </>
                            ) : (
                              <>
                                <XMarkIcon className="w-5 h-5 text-red-500" />
                                <span className="text-red-400 text-sm">Pending</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {domain.accounts.map((account, accountIndex) => (
                              <span 
                                key={accountIndex}
                                className="text-xs px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: domain.transferred ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                  color: domain.transferred ? 'var(--color-light-purple)' : '#fca5a5',
                                  border: domain.transferred ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                                }}
                              >
                                {account}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contracts Section */}
            <div className="glass-dark p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                Contracts
              </h4>
              
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  Smart contract ownership represents the core technical control of the Moonrunners ecosystem. These contracts govern NFT minting, trading, and utility functions. Transferring contract ownership is critical for community autonomy and requires careful coordination with current technical administrators.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'rgba(138, 111, 183, 0.3)' }}>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Collection</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Description</th>
                      <th className="text-center p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Items</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Current Owner</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Contract</th>
                      <th className="text-center p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Status</th>
                      <th className="text-center p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'rgba(138, 111, 183, 0.2)' }}>
                    {contracts.map((contract, index) => (
                      <tr 
                        key={index} 
                        className={`transition-colors ${contract.notIncluded ? 'opacity-50' : ''}`}
                        onMouseEnter={(e) => {
                          if (!contract.notIncluded) {
                            e.currentTarget.style.backgroundColor = 'rgba(28, 13, 54, 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center overflow-hidden ${contract.notIncluded ? 'bg-gray-700' : 'bg-gray-800'}`}>
                              <img 
                                src={contract.imageUrl} 
                                alt={`${contract.collection} NFT`}
                                className={`w-full h-full object-cover ${contract.notIncluded ? 'opacity-50' : ''}`}
                                onError={(e) => {
                                  // Fallback to initial if image fails to load
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className={`w-6 h-6 rounded text-xs text-white flex items-center justify-center font-bold ${contract.notIncluded ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 'bg-gradient-to-br from-purple-400 to-blue-500'}`} style={{ display: 'none' }}>
                                {contract.collection.charAt(0)}
                              </div>
                            </div>
                            <span className={`font-medium ${contract.notIncluded ? 'text-gray-400' : ''}`} style={{ color: contract.notIncluded ? undefined : 'var(--color-light-purple)' }}>
                              {contract.collection}
                            </span>
                          </div>
                        </td>
                        <td className={`p-3 ${contract.notIncluded ? 'text-gray-400' : ''}`} style={{ color: contract.notIncluded ? undefined : 'var(--foreground)' }}>{contract.description}</td>
                        <td className={`p-3 text-center font-mono ${contract.notIncluded ? 'text-gray-400' : ''}`} style={{ color: contract.notIncluded ? undefined : 'var(--color-accent-gold)' }}>{contract.items.toLocaleString()}</td>
                        <td className={`p-3 font-mono text-xs ${contract.notIncluded ? 'text-gray-400' : ''}`} style={{ color: contract.notIncluded ? undefined : 'var(--foreground)' }}>{contract.currentOwner}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-xs ${contract.notIncluded ? 'text-gray-400' : ''}`} style={{ color: contract.notIncluded ? undefined : 'var(--foreground)' }}>
                              {contract.contractAddress.substring(0, 8)}...{contract.contractAddress.substring(34)}
                            </span>
                            <button
                              onClick={() => handleCopyContract(contract.contractAddress)}
                              className={`flex items-center justify-center w-6 h-6 border rounded transition-colors ${contract.notIncluded ? 'bg-gray-800/30 hover:bg-gray-700/30 border-gray-600/30' : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-500/30'}`}
                              title="Copy contract address"
                              disabled={contract.notIncluded}
                            >
                              {copiedContract === contract.contractAddress ? (
                                <CheckIcon className={`w-3 h-3 ${contract.notIncluded ? 'text-gray-500' : 'text-green-400'}`} />
                              ) : (
                                <ClipboardIcon className={`w-3 h-3 ${contract.notIncluded ? 'text-gray-500' : 'text-gray-400'}`} />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {contract.notIncluded ? (
                              <>
                                <NoSymbolIcon className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-500 text-xs">Not Included</span>
                              </>
                            ) : contract.transferred ? (
                              <>
                                <CheckIcon className="w-5 h-5 text-green-500" />
                                <span className="text-green-400 text-xs">Transferred</span>
                              </>
                            ) : (
                              <>
                                <XMarkIcon className="w-5 h-5 text-red-500" />
                                <span className="text-red-400 text-xs">Pending</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <a
                              href={`https://etherscan.io/address/${contract.contractAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center w-7 h-7 border rounded transition-colors ${contract.notIncluded ? 'bg-gray-900/30 hover:bg-gray-800/50 border-gray-600/30 pointer-events-none' : 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-500/30'}`}
                              title="View on Etherscan"
                            >
                              <ArrowTopRightOnSquareIcon className={`w-3 h-3 ${contract.notIncluded ? 'text-gray-500' : 'text-blue-400'}`} />
                            </a>
                            <a
                              href={contract.openseaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center w-7 h-7 border rounded transition-colors ${contract.notIncluded ? 'bg-gray-900/30 hover:bg-gray-800/50 border-gray-600/30 pointer-events-none' : 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-500/30'}`}
                              title="View on OpenSea"
                            >
                              <span className={`text-xs font-bold ${contract.notIncluded ? 'text-gray-500' : 'text-blue-400'}`}>OS</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Social Accounts Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Discord */}
              <div className="glass-dark p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  Discord
                </h4>
                
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    Discord server ownership controls the primary community hub where thousands of members gather daily. This includes admin permissions, channel management, bot configurations, and community moderation tools. Server ownership transfer ensures continuity of community engagement and maintains the established social infrastructure.
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 rounded transition-colors"
                      style={{ color: 'var(--color-light-purple)' }}
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
                
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    Twitter account ownership provides control over the primary public communication channel for announcements, community updates, and brand representation. This includes posting privileges, follower engagement, DM access, and content moderation. Account transfer ensures continued social media presence and community communication.
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 rounded transition-colors"
                      style={{ color: 'var(--color-light-purple)' }}
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-400" />
                      Visit Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalSection;
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, NoSymbolIcon, ClipboardIcon } from '@heroicons/react/24/outline';

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

const ContractsSection = () => {
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

  const contracts: Contract[] = [
    {
      collection: 'Moonrunners',
      description: 'Original collection of 10,000 unique Moonrunners NFTs with moon-based mechanics',
      items: 9997,
      currentOwner: 'Antix.eth',
      contractAddress: '0x1485297e942ce64e0870ece60179dfda34b4c625',
      transferred: false,
      imageUrl: '/collections/moonrunners.png',
      openseaUrl: 'https://opensea.io/collection/moonrunnersnft'
    },
    {
      collection: 'Dragonhorde',
      description: 'Arcane Dragons resurrected in the Alchemy Lab from Primordia\'s ancient past',
      items: 2311,
      currentOwner: 'Antix.eth',
      contractAddress: '0x717c6dd66be92e979001aee2ee169aaa8d6d4361',
      transferred: false,
      imageUrl: '/collections/dragonhorde.png',
      openseaUrl: 'https://opensea.io/collection/moonrunners-dragonhorde-official'
    },
    {
      collection: 'Secrets of Primordia',
      description: 'Weapons and artifacts with dual utility - burn for blood or reroll Dragonhorde',
      items: 12800,
      currentOwner: 'Antix.eth',
      contractAddress: '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4',
      transferred: false,
      imageUrl: '/collections/secrets.gif',
      openseaUrl: 'https://opensea.io/collection/moonrunners-secrets-of-primordia'
    },
    {
      collection: 'History of Primordia',
      description: 'Lore and storytelling NFTs documenting the ancient tales and chronicles of Primordia',
      items: 233,
      currentOwner: 'Antix.eth',
      contractAddress: '0x4fdF87d4Edae3Fe323b8F6dF502CCac6c8B4ba28',
      transferred: false,
      imageUrl: '/collections/history.gif',
      openseaUrl: 'https://opensea.io/collection/moonrunners-history-of-primordia'
    },
    {
      collection: 'Primordia Land',
      description: 'Digital land parcels with quarterly USDC yield from real-world businesses',
      items: 2888,
      currentOwner: 'Antix.eth',
      contractAddress: '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c',
      transferred: false,
      notIncluded: true,
      imageUrl: '/collections/primordia_land.gif',
      openseaUrl: 'https://opensea.io/collection/primordia-land'
    }
  ];

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
    <div className="glass-dark p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
        Contracts
      </h4>
      
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
          Smart contract ownership controls the NFT collections and their utility functions. Transfer requires coordination with current technical administrators.
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
                      <Image 
                        src={contract.imageUrl} 
                        alt={`${contract.collection} NFT`}
                        width={32}
                        height={32}
                        className={`w-full h-full object-cover ${contract.notIncluded ? 'opacity-50' : ''}`}
                        onError={(e) => {
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
                    <a
                      href={contract.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium hover:underline transition-colors ${
                        contract.notIncluded 
                          ? 'text-gray-400' 
                          : 'text-purple-300 hover:text-blue-400'
                      }`}
                    >
                      {contract.collection}
                    </a>
                  </div>
                </td>
                <td className={`p-3 ${contract.notIncluded ? 'text-gray-400' : 'text-gray-300'}`}>
                  {contract.description}
                </td>
                <td className={`p-3 text-center font-mono ${contract.notIncluded ? 'text-gray-400' : 'text-green-500'}`}>
                  {contract.items.toLocaleString()}
                </td>
                <td className={`p-3 font-mono text-xs ${contract.notIncluded ? 'text-gray-400' : 'text-gray-300'}`}>
                  {contract.currentOwner}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://etherscan.io/address/${contract.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-xs hover:underline transition-colors ${
                        contract.notIncluded 
                          ? 'text-gray-400' 
                          : 'text-gray-300 hover:text-blue-400'
                      }`}
                    >
                      {contract.contractAddress.substring(0, 8)}...{contract.contractAddress.substring(34)}
                    </a>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsSection;
'use client';

import React from 'react';
import { contracts } from '@/config/contractData';
import Image from 'next/image';

// Separate contracts into collections and misc
const collections = contracts.filter(c => c.items && c.items > 0);
const miscContracts = contracts.filter(c => !c.items || c.items === 0);

const ContractCard = ({ contract }: { contract: typeof contracts[0] }) => {
  const isNotTransferred = !contract.transferred;

  return (
    <a
      href={`/contracts/${contract.contractAddress}`}
      className={`p-4 rounded-lg border transition-all duration-300 hover:transform hover:scale-[1.02] group block ${
        isNotTransferred
          ? 'bg-gray-900/60 backdrop-blur-md border-gray-600/30 hover:border-gray-500/50'
          : 'glass border-purple-500/30 hover:border-purple-400/50'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Contract Image */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden ${
          isNotTransferred ? 'bg-gray-800/50' : 'bg-purple-900/30'
        }`}>
          {contract.imageUrl ? (
            <Image
              src={contract.imageUrl}
              alt={contract.name}
              width={48}
              height={48}
              className={`w-full h-full object-cover ${isNotTransferred ? 'grayscale opacity-60' : ''}`}
              style={{ imageRendering: 'pixelated' }}
              unoptimized
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-2xl ${
              isNotTransferred ? 'grayscale opacity-60' : ''
            }`}>
              📜
            </div>
          )}
        </div>

        {/* Contract Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold transition-colors truncate ${
            isNotTransferred
              ? 'text-gray-500 group-hover:text-gray-400'
              : 'text-white group-hover:text-purple-200'
          }`}>
            {contract.name}
          </h3>
          <p className={`text-xs font-mono truncate ${
            isNotTransferred ? 'text-gray-600' : 'text-gray-500'
          }`}>
            {contract.contractAddress.slice(0, 10)}...{contract.contractAddress.slice(-8)}
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {contract.transferred ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Transferred
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium">
                Not Transferred
              </span>
            )}
            {contract.tokenStandard && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                isNotTransferred
                  ? 'bg-gray-700/30 text-gray-500 border-gray-600/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {contract.tokenStandard}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className={`flex-shrink-0 transition-colors ${
          isNotTransferred
            ? 'text-gray-600 group-hover:text-gray-400'
            : 'text-gray-500 group-hover:text-purple-400'
        }`}>
          →
        </div>
      </div>

      {/* Description */}
      {contract.description && (
        <p className={`text-sm mt-3 line-clamp-2 ${
          isNotTransferred ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {contract.description}
        </p>
      )}
    </a>
  );
};

const ContractsTab: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Contracts
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          All smart contracts associated with the Moonrunners ecosystem
        </p>
      </div>

      {/* Collections */}
      <div className="max-w-6xl mx-auto mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">Collections</span>
          <span className="text-sm text-gray-500 font-normal">({collections.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((contract) => (
            <ContractCard key={contract.contractAddress} contract={contract} />
          ))}
        </div>
      </div>

      {/* Miscellaneous */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-gray-400">Miscellaneous</span>
          <span className="text-sm text-gray-500 font-normal">({miscContracts.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {miscContracts.map((contract) => (
            <ContractCard key={contract.contractAddress} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractsTab;

'use client';

import React from 'react';
import { contracts } from '@/config/contractData';
import Image from 'next/image';

const ContractsTab: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          📜 Contracts
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          All smart contracts associated with the Moonrunners ecosystem
        </p>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {contracts.map((contract) => (
          <a
            key={contract.contractAddress}
            href={`/contracts/${contract.contractAddress}`}
            className="glass p-4 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-[1.02] group block"
          >
            <div className="flex items-start gap-4">
              {/* Contract Image */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-purple-900/30">
                {contract.imageUrl ? (
                  <Image
                    src={contract.imageUrl}
                    alt={contract.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    📜
                  </div>
                )}
              </div>

              {/* Contract Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors truncate">
                  {contract.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono truncate">
                  {contract.contractAddress.slice(0, 10)}...{contract.contractAddress.slice(-8)}
                </p>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {contract.transferred ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      ✅ Transferred
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                      Not Transferred
                    </span>
                  )}
                  {contract.tokenStandard && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {contract.tokenStandard}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-gray-500 group-hover:text-purple-400 transition-colors">
                →
              </div>
            </div>

            {/* Description */}
            {contract.description && (
              <p className="text-sm text-gray-400 mt-3 line-clamp-2">
                {contract.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContractsTab;

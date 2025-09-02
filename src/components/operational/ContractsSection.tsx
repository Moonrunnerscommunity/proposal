'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, NoSymbolIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { contracts, ContractInfo } from '@/config/contractData';

const ContractsSection = () => {
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

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
    <div className="glass-dark p-4 md:p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
        Contracts
      </h4>
      
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
          Smart contract ownership controls the NFT collections and their utility functions. Transfer requires coordination with current technical administrators.
        </p>
      </div>
      
      <div className="responsive-table-wrapper">
        <Table className="w-full text-sm">
          <Thead>
            <Tr style={{ borderBottom: '1px solid rgba(138, 111, 183, 0.3)' }}>
              <Th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Name</Th>
              <Th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Description</Th>
              <Th className="text-center p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Items</Th>
              <Th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Current Owner</Th>
              <Th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Contract</Th>
              <Th className="text-center p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Status</Th>
            </Tr>
          </Thead>
          <Tbody style={{ borderColor: 'rgba(138, 111, 183, 0.2)' }}>
            {contracts.map((contract: ContractInfo, index: number) => (
              <Tr 
                key={index} 
                className={`transition-colors contracts-row ${contract.notIncluded ? 'opacity-50' : ''}`}
                style={{
                  borderBottom: '1px solid rgba(138, 111, 183, 0.2)'
                }}
              >
                <Td className="p-3">
                  <div className="flex items-center gap-3 mobile-collection-info">
                    <div className={`w-8 h-8 md:w-8 md:h-8 mobile-image rounded flex items-center justify-center overflow-hidden ${contract.notIncluded ? 'bg-gray-700' : 'bg-gray-800'}`}>
                      {contract.imageUrl ? (
                        <Image 
                          src={contract.imageUrl} 
                          alt={`${contract.name} NFT`}
                          width={32}
                          height={32}
                          className={`w-full h-full pixelated-image object-cover ${contract.notIncluded ? 'opacity-50' : ''}`}
                          unoptimized
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className={`w-6 h-6 rounded text-xs text-white flex items-center justify-center font-bold ${contract.notIncluded ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 'bg-gradient-to-br from-purple-400 to-blue-500'}`}>
                          {contract.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {contract.openseaUrl ? (
                      <a
                        href={contract.openseaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium hover:underline transition-colors mobile-collection-title ${
                          contract.notIncluded 
                            ? 'text-gray-400' 
                            : 'text-purple-300 hover:text-blue-400'
                        }`}
                      >
                        {contract.name}
                      </a>
                    ) : (
                      <span className={`font-medium mobile-collection-title ${contract.notIncluded ? 'text-gray-400' : 'text-purple-300'}`}>{contract.name}</span>
                    )}
                  </div>
                </Td>
                <Td className={`p-3 mobile-description ${contract.notIncluded ? 'text-gray-400' : 'text-gray-300'}`}>
                  {contract.description || <span className="italic text-gray-500">No description</span>}
                </Td>
                <Td className={`p-3 text-center font-mono ${contract.notIncluded ? 'text-gray-400' : 'text-green-500'}`}>
                  {typeof contract.items === 'number' ? contract.items.toLocaleString() : <span className="italic text-gray-500">—</span>}
                </Td>
                <Td className={`p-3 font-mono text-xs ${contract.notIncluded ? 'text-gray-400' : 'text-gray-300'}`}>
                  {contract.currentOwner === '0xf728942638942DF1a31e10722d49C1E758B2F8F1' ? (
                    <a
                      href="https://app.safe.global/transactions/history?safe=eth:0xf728942638942DF1a31e10722d49C1E758B2F8F1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 hover:underline transition-colors font-sans font-semibold"
                    >
                      Safe ↗
                    </a>
                  ) : (
                    contract.currentOwner || <span className="italic text-gray-500">—</span>
                  )}
                </Td>
                <Td className="p-3">
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
                      {contract.contractAddress.substring(0, 8)}...{contract.contractAddress.substring(contract.contractAddress.length - 6)}
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
                </Td>
                <Td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mobile-status">
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
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <style jsx>{`
        .contracts-row:hover:not(.opacity-50) {
          background-color: rgba(28, 13, 54, 0.5) !important;
        }
        
        /* Custom responsive table styles to integrate with existing theme */
        .responsive-table-wrapper :global(.responsiveTable) {
          background: transparent;
          border: none;
          color: var(--foreground);
        }
        
        .responsive-table-wrapper :global(.responsiveTable tbody tr) {
          background: transparent !important;
          border: none !important;
        }
        
        .responsive-table-wrapper :global(.responsiveTable tbody tr:nth-child(even)) {
          background: transparent !important;
        }
        
        .responsive-table-wrapper :global(.responsiveTable thead) {
          background: transparent;
        }
        
        /* Mobile view styling */
        @media (max-width: 40em) {
          .responsive-table-wrapper :global(.responsiveTable),
          .responsive-table-wrapper :global(.responsiveTable thead),
          .responsive-table-wrapper :global(.responsiveTable tbody),
          .responsive-table-wrapper :global(.responsiveTable th),
          .responsive-table-wrapper :global(.responsiveTable td),
          .responsive-table-wrapper :global(.responsiveTable tr) {
            border: none !important;
            background: transparent !important;
          }
          
          .responsive-table-wrapper :global(.responsiveTable tbody tr) {
            border: 1px solid rgba(138, 111, 183, 0.3) !important;
            border-radius: 8px !important;
            margin-bottom: 16px !important;
            padding: 16px !important;
            background: rgba(138, 111, 183, 0.05) !important;
          }
          
          .responsive-table-wrapper :global(.responsiveTable tbody td) {
            border: none !important;
            padding: 12px !important;
            position: relative;
            display: block !important;
            margin-bottom: 8px;
          }
          
          .responsive-table-wrapper :global(.responsiveTable tbody td:before) {
            content: attr(data-th);
            display: block !important;
            font-weight: 600;
            color: var(--color-starlight);
            margin-bottom: 6px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.2;
          }
          
          .responsive-table-wrapper :global(.responsiveTable tbody td > *) {
            display: block !important;
            margin-top: 0 !important;
          }
          
          /* Override the library's width calculation for vertical stacking */
          .responsive-table-wrapper :global(.responsiveTable td .tdBefore) {
            width: 100% !important;
            position: relative !important;
            left: auto !important;
            display: block !important;
            margin-bottom: 6px !important;
          }
          
          /* Mobile-specific enhancements */
          .mobile-image {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1 / 1 !important;
          }
          

          
          .mobile-collection-info {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            width: 100% !important;
          }
          
          .mobile-collection-title {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
          }
          
          .mobile-description {
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
          
          .mobile-status {
            justify-content: flex-start !important;
            align-items: center !important;
          }
          
          .mobile-status span {
            font-size: 0.875rem !important;
          }
          
          /* Keep contract address and copy button inline */
          .responsive-table-wrapper :global(.responsiveTable tbody td) .flex.items-center.gap-2 {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
        }
        
        /* Ensure pixelated rendering for all contract images */
        .responsive-table-wrapper img,
        .responsive-table-wrapper .pixelated-image {
          image-rendering: pixelated !important;
          image-rendering: -moz-crisp-edges !important;
          image-rendering: crisp-edges !important;
          -ms-interpolation-mode: nearest-neighbor !important;
        }
      `}</style>
    </div>
  );
};

export default ContractsSection;
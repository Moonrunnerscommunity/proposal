'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface CollectionStatus {
  name: string;
  downloadCurrent: number;
  downloadTotal: number;
  downloadComplete: boolean;
  uploadComplete: boolean | 'n/a';
  contractUpdated: boolean | 'n/a';
}

const collections: CollectionStatus[] = [
  { name: 'Moonrunners', downloadCurrent: 10000, downloadTotal: 10000, downloadComplete: true, uploadComplete: true, contractUpdated: true },
  { name: 'Dragonhorde', downloadCurrent: 2311, downloadTotal: 2311, downloadComplete: true, uploadComplete: true, contractUpdated: true },
  { name: 'Primordia Land', downloadCurrent: 2884, downloadTotal: 2888, downloadComplete: true, uploadComplete: true, contractUpdated: 'n/a' },
  { name: 'Secrets of Primordia', downloadCurrent: 12, downloadTotal: 12, downloadComplete: true, uploadComplete: true, contractUpdated: true },
  { name: 'Chronicles of Nogard', downloadCurrent: 1, downloadTotal: 1, downloadComplete: true, uploadComplete: true, contractUpdated: true },
  { name: 'History of Primordia', downloadCurrent: 3, downloadTotal: 3, downloadComplete: true, uploadComplete: 'n/a', contractUpdated: 'n/a' },
];

interface TodoItem {
  id: number | string;
  title: string;
  description: string;
  icon: string;
  parentId?: number; // Parent task ID for subtasks
  hasSubtasks?: boolean;
  hasContractLinks?: boolean;
  hasFailedDownloads?: boolean;
  completed?: boolean;
}

interface ContractLink {
  name: string;
  address: string;
  transferred: boolean;
  hasNFTs: boolean;
}

interface FailedDownload {
  tokenId: number;
  collection: string;
  status: 'pending' | 'exists' | 'burned' | 'error' | 'downloaded' | 'no_metadata';
  notes?: string;
}

const contractLinks: ContractLink[] = [
  { name: 'Moonrunners', address: '0x1485297e942ce64e0870ece60179dfda34b4c625', transferred: true, hasNFTs: true },
  { name: 'Dragonhorde', address: '0x6b5483b55b362697000d8774d8ea9c4429B261BB', transferred: true, hasNFTs: true },
  { name: 'Secrets of Primordia', address: '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4', transferred: true, hasNFTs: true },
  { name: 'Chronicles of Nogard', address: '0xc05ba5529d964a9b2c46ebcd60564a4214ab7ba4', transferred: true, hasNFTs: true },
  { name: 'Primordia Land', address: '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c', transferred: false, hasNFTs: true },
  { name: 'History of Primordia', address: '0x4fdF87d4Edae3Fe323b8F6dF502CCac6c8B4ba28', transferred: false, hasNFTs: true },
  { name: 'Staking Contract', address: '0x717c6dd66be92e979001aee2ee169aaa8d6d4361', transferred: false, hasNFTs: false },
  { name: 'WeaponToBlood', address: '0x57b2a85cbea7d5902edb94b8bed4b6b1025f210b', transferred: true, hasNFTs: false },
  { name: 'WeaponBurn', address: '0xa492583f6fe2fbcd21797d0c2904f7249ced79f8', transferred: true, hasNFTs: false },
];

const failedDownloads: FailedDownload[] = [
  { tokenId: 347, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 371, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 1302, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 1941, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 2044, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 2047, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 2053, collection: 'Dragonhorde', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 2164, collection: 'Dragonhorde', status: 'no_metadata', notes: 'OpenSea shows "Content not available yet" - rare rank #9 token' },
  { tokenId: 1474, collection: 'Primordia Land', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 1637, collection: 'Primordia Land', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 1691, collection: 'Primordia Land', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
  { tokenId: 1860, collection: 'Primordia Land', status: 'downloaded', notes: 'Downloaded from OpenSea CDN' },
];

const todoItems: TodoItem[] = [
  {
    id: 1,
    title: 'Update This Website',
    description: 'Improve this site with better UX, clearer messaging, and community resources',
    icon: '🌐',
    completed: true
  },
  {
    id: 2,
    title: 'Restore NFT Images',
    description: 'Fix broken NFT metadata and restore images across all collections',
    icon: '🖼️',
    hasSubtasks: true,
    completed: true
  },
  {
    id: '2a',
    title: 'Retry Failed Downloads',
    description: '11/12 tokens downloaded. #2164 has no metadata available on OpenSea.',
    icon: '🔍',
    parentId: 2,
    hasFailedDownloads: true,
    completed: true
  },
  {
    id: '2b',
    title: 'Repair Moonrunners Wolves',
    description: 'Fix wolf backgrounds, small-pixelated status trait, and dynamic JSON metadata',
    icon: '🐺',
    parentId: 2,
    completed: true
  },
  {
    id: '2c',
    title: 'Moon-Phase Backgrounds',
    description: 'Stretch goal: Restore moon-phase aligned dynamic backgrounds',
    icon: '🌙',
    parentId: 2
  },
  {
    id: 3,
    title: 'Cleanup Contracts',
    description: 'Enhanced contract tracking with on-chain data. Remaining: add dynamic RPC info',
    icon: '📜',
    hasSubtasks: true
  },
  {
    id: '3a',
    title: 'Contract & NFT Detail Pages',
    description: 'Created detail pages for contracts and NFT collections',
    icon: '📄',
    parentId: 3,
    completed: true,
    hasContractLinks: true
  },
  {
    id: 4,
    title: 'Setup Consistent Communication',
    description: 'Establish regular community updates across Discord, Twitter, and other channels',
    icon: '📢'
  },
  {
    id: 5,
    title: 'Strategy!',
    description: 'Develop and execute the roadmap for Moonrunners future growth and sustainability',
    icon: '🎯'
  }
];

// Helper to check if a task can be collapsed (parent marked completed)
function canCollapse(item: TodoItem): boolean {
  return !!item.completed;
}

function StatusCell({ complete, current, total }: { complete: boolean; current?: number; total?: number }) {
  if (complete) {
    return (
      <span className="text-green-400 font-medium">
        <span className="sm:hidden">✅</span>
        <span className="hidden sm:inline">✅ {current?.toLocaleString()}/{total?.toLocaleString()}</span>
      </span>
    );
  }
  if (current !== undefined && total !== undefined && current > 0) {
    return (
      <span className="text-yellow-400 font-medium">
        <span className="sm:hidden">🔄</span>
        <span className="hidden sm:inline">🔄 {current.toLocaleString()}/{total.toLocaleString()}</span>
      </span>
    );
  }
  return (
    <span className="text-gray-400">
      <span className="sm:hidden">⏳</span>
      <span className="hidden sm:inline">⏳ Pending</span>
    </span>
  );
}

function SimpleStatus({ complete }: { complete: boolean | 'n/a' }) {
  if (complete === 'n/a') {
    return <span className="text-gray-500">—</span>;
  }
  if (complete) {
    return (
      <span className="text-green-400">
        <span className="sm:hidden">✅</span>
        <span className="hidden sm:inline">✅ Done</span>
      </span>
    );
  }
  return (
    <span className="text-gray-400">
      <span className="sm:hidden">⏳</span>
      <span className="hidden sm:inline">⏳ Pending</span>
    </span>
  );
}

function FailedDownloadStatus({ status }: { status: FailedDownload['status'] }) {
  switch (status) {
    case 'downloaded':
      return <span className="text-green-400">✅ Downloaded</span>;
    case 'exists':
      return <span className="text-blue-400">🔍 Exists</span>;
    case 'no_metadata':
      return <span className="text-yellow-400">⚠️ No Metadata</span>;
    case 'burned':
      return <span className="text-red-400">🔥 Burned</span>;
    case 'error':
      return <span className="text-red-400">❌ Error</span>;
    default:
      return <span className="text-gray-400">⏳ Pending</span>;
  }
}

const TodoListTab: React.FC = () => {
  // Track which completed items are expanded (default: all collapsed)
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

  const toggleExpand = (id: string | number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
          📋 Priority Todo List
        </h2>
      </div>

      {/* Todo Items */}
      <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
        {todoItems.map((item, index) => {
          const isSubItem = typeof item.id === 'string';
          const isCollapsible = canCollapse(item);
          const isExpanded = expandedItems.has(item.id);
          const showCollapsed = isCollapsible && !isExpanded;

          // Hide subtasks when their parent is collapsed
          if (item.parentId !== undefined) {
            const parent = todoItems.find(t => t.id === item.parentId);
            const parentCollapsible = parent ? canCollapse(parent) : false;
            const parentExpanded = parent ? expandedItems.has(parent.id) : true;
            if (parentCollapsible && !parentExpanded) {
              return null;
            }
          }

          return (
          <div key={item.id} className={isSubItem ? 'ml-2 sm:ml-6' : ''}>
            {/* Collapsed View */}
            {showCollapsed ? (
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full glass p-2 sm:p-3 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Small grey number badge */}
                  <div className="w-6 h-6 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 font-bold text-xs border border-gray-600/50">
                    {item.id}
                  </div>

                  {/* Muted strikethrough title */}
                  <span className="flex-1 text-left text-gray-500 italic line-through text-sm">
                    {item.title}
                  </span>

                  {/* Green check + Expand caret */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" />
                  </div>
                </div>
              </button>
            ) : (
              /* Expanded View */
              <div
                className="glass rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Collapse button for collapsible items */}
                {isCollapsible && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800/30 cursor-pointer hover:bg-gray-700/30 transition-colors border-b border-purple-500/20"
                  >
                    <div className="w-5 h-5 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 font-bold text-[10px] border border-gray-600/50">
                      {item.id}
                    </div>
                    <span className="flex-1 text-left text-gray-400 italic line-through text-xs">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                      <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                )}

                {/* Card content */}
                <div className="p-3 sm:p-4">

                {/* Mobile: stacked centered layout, Desktop: horizontal */}
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-3">
                  {/* Number Badge + Status (mobile: same row) */}
                  <div className="flex items-center gap-2 sm:block">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-purple-400/50 group-hover:border-purple-300 transition-colors">
                      {item.id}
                    </div>
                    {/* Status indicator - visible on mobile next to badge */}
                    <div className="sm:hidden">
                      {item.completed ? (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center" title="Completed">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      ) : (
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" title="In Progress" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <span className="text-lg sm:text-xl">{item.icon}</span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Status indicator - desktop only */}
                  <div className="hidden sm:block flex-shrink-0">
                    {item.completed ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center" title="Completed">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" title="In Progress" />
                    )}
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* NFT Collections Sub-table - only show if expanded or not collapsible */}
            {item.hasSubtasks && !showCollapsed && (
              <div className="mt-2 sm:ml-6">
                <div className="glass rounded-lg border border-purple-500/20 overflow-hidden">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 text-purple-300 font-medium">Collection</th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">
                          <span className="sm:hidden">D/L</span>
                          <span className="hidden sm:inline">Download</span>
                        </th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">
                          <span className="sm:hidden">U/L</span>
                          <span className="hidden sm:inline">Upload</span>
                        </th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">
                          <span className="sm:hidden">ETH</span>
                          <span className="hidden sm:inline">Contract</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {collections.map((col) => (
                        <tr key={col.name} className="border-b border-purple-500/10 last:border-0">
                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white font-medium">{col.name}</td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            <StatusCell
                              complete={col.downloadComplete}
                              current={col.downloadCurrent}
                              total={col.downloadTotal}
                            />
                          </td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            <SimpleStatus complete={col.uploadComplete} />
                          </td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            <SimpleStatus complete={col.contractUpdated} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Failed Downloads Sub-table */}
            {item.hasFailedDownloads && !showCollapsed && (
              <div className="mt-2 sm:ml-6">
                <div className="glass rounded-lg border border-purple-500/20 overflow-hidden">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 text-purple-300 font-medium">Token ID</th>
                        <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 text-purple-300 font-medium">Collection</th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">Status</th>
                        <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 text-purple-300 font-medium hidden sm:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {failedDownloads.map((dl) => (
                        <tr key={`${dl.collection}-${dl.tokenId}`} className="border-b border-purple-500/10 last:border-0">
                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white font-mono">#{dl.tokenId}</td>
                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white">{dl.collection}</td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            <FailedDownloadStatus status={dl.status} />
                          </td>
                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-gray-400 text-xs hidden sm:table-cell">{dl.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contract Links Sub-table */}
            {item.hasContractLinks && !showCollapsed && (
              <div className="mt-2 sm:ml-6">
                <div className="glass rounded-lg border border-purple-500/20 overflow-hidden">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 text-purple-300 font-medium">Contract</th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">Status</th>
                        <th className="text-center py-1.5 sm:py-2 px-1 sm:px-3 text-purple-300 font-medium">Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractLinks.map((contract) => (
                        <tr key={contract.address} className="border-b border-purple-500/10 last:border-0">
                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white font-medium">{contract.name}</td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            {contract.transferred ? (
                              <span className="text-green-400">
                                <span className="sm:hidden">✅</span>
                                <span className="hidden sm:inline">✅ Transferred</span>
                              </span>
                            ) : (
                              <span className="text-gray-400">
                                <span className="sm:hidden">⏳</span>
                                <span className="hidden sm:inline">Not Transferred</span>
                              </span>
                            )}
                          </td>
                          <td className="py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={`/contracts/${contract.address}`}
                                className="text-purple-400 hover:text-purple-300"
                                title="Details"
                              >
                                <span className="sm:hidden">📄</span>
                                <span className="hidden sm:inline underline">Details</span>
                              </a>
                              {contract.hasNFTs && (
                                <a
                                  href={`/contracts/${contract.address}/nfts`}
                                  className="text-blue-400 hover:text-blue-300"
                                  title="NFTs"
                                >
                                  <span className="sm:hidden">🖼️</span>
                                  <span className="hidden sm:inline underline">NFTs</span>
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
        })}
      </div>

    </div>
  );
};

export default TodoListTab;

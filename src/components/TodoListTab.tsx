'use client';

import React from 'react';

interface CollectionStatus {
  name: string;
  downloadCurrent: number;
  downloadTotal: number;
  downloadComplete: boolean;
  uploadComplete: boolean | 'n/a';
  contractUpdated: boolean | 'n/a';
}

const collections: CollectionStatus[] = [
  { name: 'Moonrunners', downloadCurrent: 10000, downloadTotal: 10000, downloadComplete: true, uploadComplete: false, contractUpdated: false },
  { name: 'Dragonhorde', downloadCurrent: 2297, downloadTotal: 2311, downloadComplete: true, uploadComplete: false, contractUpdated: false },
  { name: 'Primordia Land', downloadCurrent: 2883, downloadTotal: 2888, downloadComplete: true, uploadComplete: 'n/a', contractUpdated: 'n/a' },
  { name: 'Secrets of Primordia', downloadCurrent: 12, downloadTotal: 12, downloadComplete: true, uploadComplete: false, contractUpdated: false },
  { name: 'Chronicles of Nogard', downloadCurrent: 1, downloadTotal: 1, downloadComplete: true, uploadComplete: false, contractUpdated: false },
  { name: 'History of Primordia', downloadCurrent: 3, downloadTotal: 3, downloadComplete: true, uploadComplete: 'n/a', contractUpdated: 'n/a' },
];

interface TodoItem {
  id: number | string;
  title: string;
  description: string;
  icon: string;
  hasSubtasks?: boolean;
  hasContractLinks?: boolean;
  completed?: boolean;
}

interface ContractLink {
  name: string;
  address: string;
  transferred: boolean;
  hasNFTs: boolean;
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

const todoItems: TodoItem[] = [
  {
    id: 1,
    title: 'Update This Website',
    description: 'Improve the proposal site with better UX, clearer messaging, and community resources',
    icon: '🌐',
    completed: true
  },
  {
    id: 2,
    title: 'Restore NFT Images',
    description: 'Fix broken NFT metadata and restore images across all collections',
    icon: '🖼️',
    hasSubtasks: true
  },
  {
    id: '2a',
    title: 'Research Failed Downloads',
    description: 'Investigate 12 failed NFT downloads (Dragonhorde: 347, 371, 1302, 1941, 2044, 2047, 2053, 2164 | Primordia Land: 1474, 1637, 1691, 1860)',
    icon: '🔍'
  },
  {
    id: 3,
    title: 'Cleanup Contracts',
    description: 'Enhanced contract tracking with on-chain data. Remaining: add dynamic RPC info',
    icon: '📜'
  },
  {
    id: '3a',
    title: 'Contract & NFT Detail Pages',
    description: 'Created detail pages for contracts and NFT collections',
    icon: '📄',
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

function StatusCell({ complete, current, total }: { complete: boolean; current?: number; total?: number }) {
  if (complete) {
    return (
      <span className="text-green-400 font-medium">
        ✅ {current?.toLocaleString()}/{total?.toLocaleString()}
      </span>
    );
  }
  if (current !== undefined && total !== undefined && current > 0) {
    return (
      <span className="text-yellow-400 font-medium">
        🔄 {current.toLocaleString()}/{total.toLocaleString()}
      </span>
    );
  }
  return <span className="text-gray-400">⏳ Pending</span>;
}

function SimpleStatus({ complete }: { complete: boolean | 'n/a' }) {
  if (complete === 'n/a') {
    return <span className="text-gray-500">N/A</span>;
  }
  if (complete) {
    return <span className="text-green-400">✅ Done</span>;
  }
  return <span className="text-gray-400">⏳ Pending</span>;
}

const TodoListTab: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          📋 Priority Todo List
        </h2>
      </div>

      {/* Todo Items */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {todoItems.map((item, index) => {
          const isSubItem = typeof item.id === 'string';
          return (
          <div key={item.id} className={isSubItem ? 'ml-8' : ''}>
            <div
              className="glass p-5 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-purple-400/50 group-hover:border-purple-300 transition-colors">
                  {item.id}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
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

            {/* NFT Collections Sub-table */}
            {item.hasSubtasks && (
              <div className="mt-2 ml-14 mr-4">
                <div className="glass rounded-lg border border-purple-500/20 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Collection</th>
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Download</th>
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Upload</th>
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Contract</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collections.map((col) => (
                        <tr key={col.name} className="border-b border-purple-500/10 last:border-0">
                          <td className="py-2 px-3 text-white font-medium">{col.name}</td>
                          <td className="py-2 px-3">
                            <StatusCell
                              complete={col.downloadComplete}
                              current={col.downloadCurrent}
                              total={col.downloadTotal}
                            />
                          </td>
                          <td className="py-2 px-3">
                            <SimpleStatus complete={col.uploadComplete} />
                          </td>
                          <td className="py-2 px-3">
                            <SimpleStatus complete={col.contractUpdated} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contract Links Sub-table */}
            {item.hasContractLinks && (
              <div className="mt-2 ml-14 mr-4">
                <div className="glass rounded-lg border border-purple-500/20 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Contract</th>
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Status</th>
                        <th className="text-left py-2 px-3 text-purple-300 font-medium">Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractLinks.map((contract) => (
                        <tr key={contract.address} className="border-b border-purple-500/10 last:border-0">
                          <td className="py-2 px-3 text-white font-medium">{contract.name}</td>
                          <td className="py-2 px-3">
                            {contract.transferred ? (
                              <span className="text-green-400">✅ Transferred</span>
                            ) : (
                              <span className="text-gray-400">Not Transferred</span>
                            )}
                          </td>
                          <td className="py-2 px-3 space-x-2">
                            <a
                              href={`/contracts/${contract.address}`}
                              className="text-purple-400 hover:text-purple-300 underline"
                            >
                              Details
                            </a>
                            {contract.hasNFTs && (
                              <a
                                href={`/nfts/${contract.address}`}
                                className="text-blue-400 hover:text-blue-300 underline"
                              >
                                NFTs
                              </a>
                            )}
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

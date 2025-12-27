import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contracts, findContract, type ContractInfo, NFT_ASSETS_BASE_URL } from '@/config/contractData';
import { CheckIcon, XMarkIcon, NoSymbolIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { CopyButton } from '@/components/contracts/CopyButton';

interface PageProps {
  params: Promise<{ address: string }>;
}

function StatusBadge({ contract }: { contract: ContractInfo }) {
  if (contract.notIncluded) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs">
        <NoSymbolIcon className="h-3 w-3" />
        Not Included
      </span>
    );
  }
  if (contract.transferred) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
        <CheckIcon className="h-3 w-3" />
        Transferred
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
      <XMarkIcon className="h-3 w-3" />
      Pending
    </span>
  );
}

// Separate contracts into collections and misc
const collections = contracts.filter(c => c.items && c.items > 0);
const miscContracts = contracts.filter(c => !c.items || c.items === 0);

export default async function ContractPage({ params }: PageProps) {
  const { address } = await params;
  const contract = findContract(address);

  if (!contract) {
    notFound();
  }

  const isNftCollection = contract.items && contract.items > 0;
  const safeWalletAddress = '0xf728942638942DF1a31e10722d49C1E758B2F8F1';
  const isSafeOwner = contract.currentOwner?.toLowerCase() === safeWalletAddress.toLowerCase();

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar - Contract Navigation */}
      <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 lg:w-56 bg-black/60 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col">
        {/* Logo/Back area */}
        <div className="p-3 lg:py-3 lg:px-3 border-b border-purple-500/30">
          <Link
            href="/"
            className="flex flex-col items-center text-center w-full group"
          >
            <span className="text-xl lg:text-2xl">←</span>
            <span className="hidden lg:block text-xs font-medium text-purple-300 group-hover:text-purple-200 mt-1">
              Back to Home
            </span>
          </Link>
        </div>

        {/* Contract List */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {/* Collections */}
          <div className="hidden lg:block px-3 mb-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Collections</span>
          </div>
          <ul className="space-y-0.5 px-2 mb-3">
            {collections.map((c) => {
              const isActive = c.contractAddress.toLowerCase() === contract.contractAddress.toLowerCase();
              return (
                <li key={c.contractAddress}>
                  <Link
                    href={`/contracts/${c.contractAddress}`}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded overflow-hidden bg-purple-900/30">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">
                          📜
                        </div>
                      )}
                    </div>
                    <span className="hidden lg:block text-xs font-medium truncate">
                      {c.name}
                    </span>
                    {isActive && (
                      <div className="lg:hidden absolute right-0 w-1 h-5 bg-purple-400 rounded-l-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Miscellaneous */}
          <div className="hidden lg:block px-3 mb-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Miscellaneous</span>
          </div>
          <ul className="space-y-0.5 px-2">
            {miscContracts.map((c) => {
              const isActive = c.contractAddress.toLowerCase() === contract.contractAddress.toLowerCase();
              return (
                <li key={c.contractAddress}>
                  <Link
                    href={`/contracts/${c.contractAddress}`}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded overflow-hidden bg-purple-900/30">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">
                          📜
                        </div>
                      )}
                    </div>
                    <span className="hidden lg:block text-xs font-medium truncate">
                      {c.name}
                    </span>
                    {isActive && (
                      <div className="lg:hidden absolute right-0 w-1 h-5 bg-purple-400 rounded-l-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-16 sm:ml-20 lg:ml-56">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with Links */}
          <div className="glass p-4 rounded-lg border border-purple-500/30 mb-4">
            <div className="flex items-start gap-4">
              {/* Collection Image */}
              {contract.imageUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={contract.imageUrl}
                    alt={contract.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                    style={{ imageRendering: 'pixelated' }}
                    unoptimized
                  />
                </div>
              )}

              {/* Title & Status */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-xl font-bold text-white">{contract.name}</h1>
                  <StatusBadge contract={contract} />
                </div>

                {contract.description && (
                  <p className="text-gray-300 text-sm mb-2">{contract.description}</p>
                )}

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3 text-xs">
                  {contract.items !== undefined && contract.items > 0 && (
                    <div>
                      <span className="text-gray-400">Items: </span>
                      <span className="text-white font-medium">{contract.items.toLocaleString()}</span>
                    </div>
                  )}
                  {contract.tokenStandard && (
                    <div>
                      <span className="text-gray-400">Standard: </span>
                      <span className="text-white font-medium">{contract.tokenStandard}</span>
                    </div>
                  )}
                  {contract.symbol && (
                    <div>
                      <span className="text-gray-400">Symbol: </span>
                      <span className="text-white font-medium">{contract.symbol}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Links - Top Right */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {contract.etherscanUrl && (
                  <a
                    href={contract.etherscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs transition-colors"
                    title="Etherscan"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">Etherscan</span>
                  </a>
                )}
                {contract.openseaUrl && (
                  <a
                    href={contract.openseaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs transition-colors"
                    title="OpenSea"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">OpenSea</span>
                  </a>
                )}
                {isSafeOwner && (
                  <a
                    href={`https://app.safe.global/home?safe=eth:${safeWalletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-500 rounded text-white text-xs transition-colors"
                    title="Safe Wallet"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">Safe</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contract Details - 3 Columns */}
          <div className="glass p-4 rounded-lg border border-purple-500/30 mb-4">
            <h2 className="text-sm font-semibold text-white mb-3">Contract Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Contract Address */}
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-gray-400 text-xs mb-1">Contract Address</div>
                <div className="flex items-center gap-2">
                  <div className="text-white font-mono text-xs truncate flex-1">
                    {contract.contractAddress}
                  </div>
                  <CopyButton text={contract.contractAddress} />
                </div>
              </div>

              {/* Current Owner */}
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-gray-400 text-xs mb-1">Current Owner</div>
                <div className="flex items-center gap-2">
                  <div className="text-white font-mono text-xs truncate flex-1">
                    {isSafeOwner ? (
                      <a
                        href={`https://app.safe.global/home?safe=eth:${safeWalletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        Community Safe Wallet
                      </a>
                    ) : (
                      contract.currentOwner || 'Unknown'
                    )}
                  </div>
                  {contract.currentOwner && (
                    <CopyButton text={contract.currentOwner} />
                  )}
                </div>
              </div>

              {/* Verification Status */}
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-gray-400 text-xs mb-1">Etherscan Verified</div>
                <div className={`text-xs ${contract.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {contract.verified ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>

          {/* NFT Gallery Preview (if collection) */}
          {isNftCollection && contract.nftImagesDir && (
            <div className="glass p-4 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white">Collection Preview</h2>
                <Link
                  href={`/contracts/${contract.contractAddress}/nfts`}
                  className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
                >
                  View all {contract.items?.toLocaleString()} items →
                </Link>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {[...Array(Math.min(20, contract.items || 0))].map((_, i) => (
                  <Link
                    key={i}
                    href={`/contracts/${contract.contractAddress}/nfts/${i + 1}`}
                    className="aspect-square bg-black/20 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
                  >
                    <Image
                      src={`${NFT_ASSETS_BASE_URL}${contract.nftImagesDir}/${i + 1}.${contract.nftImageExt || 'png'}`}
                      alt={`${contract.name} #${i + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'pixelated' }}
                      unoptimized
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return contracts.map((contract) => ({
    address: contract.contractAddress,
  }));
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contracts, findContract, type ContractInfo } from '@/config/contractData';
import { CheckIcon, XMarkIcon, NoSymbolIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { CopyButton } from '@/components/contracts/CopyButton';

interface PageProps {
  params: Promise<{ address: string }>;
}

function StatusBadge({ contract }: { contract: ContractInfo }) {
  if (contract.notIncluded) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">
        <NoSymbolIcon className="h-4 w-4" />
        Not Included
      </span>
    );
  }
  if (contract.transferred) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
        <CheckIcon className="h-4 w-4" />
        Transferred
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
      <XMarkIcon className="h-4 w-4" />
      Pending
    </span>
  );
}


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
      <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 lg:w-64 bg-black/60 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col">
        {/* Logo/Back area */}
        <div className="p-3 lg:py-4 lg:px-3 border-b border-purple-500/30">
          <Link
            href="/"
            className="flex flex-col items-center text-center w-full group"
          >
            <span className="text-2xl lg:text-3xl">←</span>
            <span className="hidden lg:block text-sm font-medium text-purple-300 group-hover:text-purple-200 mt-1">
              Back to Home
            </span>
          </Link>
        </div>

        {/* Contract List */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="hidden lg:block px-3 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contracts</span>
          </div>
          <ul className="space-y-1 px-2">
            {contracts.map((c) => {
              const isActive = c.contractAddress.toLowerCase() === contract.contractAddress.toLowerCase();
              return (
                <li key={c.contractAddress}>
                  <Link
                    href={`/contracts/${c.contractAddress}`}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                    }`}
                  >
                    {/* Contract Image */}
                    <div className="flex-shrink-0 w-8 h-8 rounded overflow-hidden bg-purple-900/30">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={c.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm">
                          📜
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {c.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {c.transferred ? '✓ Transferred' : 'Not transferred'}
                      </span>
                    </div>
                    {/* Active indicator for mobile */}
                    {isActive && (
                      <div className="lg:hidden absolute right-0 w-1 h-8 bg-purple-400 rounded-l-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-16 sm:ml-20 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="glass p-6 rounded-lg border border-purple-500/30 mb-6">
            <div className="flex items-start gap-6">
              {/* Collection Image */}
              {contract.imageUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={contract.imageUrl}
                    alt={contract.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                    style={{ imageRendering: 'pixelated' }}
                    unoptimized
                  />
                </div>
              )}

              {/* Title & Status */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl font-bold text-white">{contract.name}</h1>
                  <StatusBadge contract={contract} />
                </div>

                {contract.description && (
                  <p className="text-gray-300 mb-4">{contract.description}</p>
                )}

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4">
                  {contract.items !== undefined && contract.items > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-400">Items: </span>
                      <span className="text-white font-medium">{contract.items.toLocaleString()}</span>
                    </div>
                  )}
                  {contract.tokenStandard && (
                    <div className="text-sm">
                      <span className="text-gray-400">Standard: </span>
                      <span className="text-white font-medium">{contract.tokenStandard}</span>
                    </div>
                  )}
                  {contract.symbol && (
                    <div className="text-sm">
                      <span className="text-gray-400">Symbol: </span>
                      <span className="text-white font-medium">{contract.symbol}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="glass p-6 rounded-lg border border-purple-500/30 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Contract Details</h2>

            <div className="space-y-4">
              {/* Contract Address */}
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-sm">Contract Address</div>
                  <div className="text-white font-mono text-sm break-all">{contract.contractAddress}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <CopyButton text={contract.contractAddress} />
                  {contract.etherscanUrl && (
                    <a
                      href={contract.etherscanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="View on Etherscan"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-purple-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Current Owner */}
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div>
                  <div className="text-gray-400 text-sm">Current Owner</div>
                  <div className="text-white font-mono">
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
                </div>
                {contract.currentOwner && (
                  <CopyButton text={contract.currentOwner} />
                )}
              </div>

              {/* Verification Status */}
              {contract.verified !== undefined && (
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div>
                    <div className="text-gray-400 text-sm">Etherscan Verified</div>
                    <div className={contract.verified ? 'text-green-400' : 'text-yellow-400'}>
                      {contract.verified ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* External Links */}
          <div className="glass p-6 rounded-lg border border-purple-500/30 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Links</h2>

            <div className="flex flex-wrap gap-3">
              {contract.etherscanUrl && (
                <a
                  href={contract.etherscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Etherscan
                </a>
              )}
              {contract.openseaUrl && (
                <a
                  href={contract.openseaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  OpenSea
                </a>
              )}
              {isSafeOwner && (
                <a
                  href={`https://app.safe.global/home?safe=eth:${safeWalletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Safe Wallet
                </a>
              )}
            </div>
          </div>

          {/* NFT Gallery Preview (if collection) */}
          {isNftCollection && contract.nftImagesDir && (
            <div className="glass p-6 rounded-lg border border-purple-500/30">
              <h2 className="text-xl font-semibold text-white mb-4">Collection Preview</h2>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {[...Array(16)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/nfts/${contract.contractAddress}/${i + 1}`}
                    className="aspect-square bg-black/20 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
                  >
                    <Image
                      src={`${contract.nftImagesDir}/${i + 1}.png`}
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

              <div className="mt-4 text-center">
                <Link
                  href={`/nfts/${contract.contractAddress}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all {contract.items?.toLocaleString()} items →
                </Link>
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

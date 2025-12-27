import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contracts, findContract, NFT_ASSETS_BASE_URL } from '@/config/contractData';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ address: string; tokenId: string }>;
}

interface NftAttribute {
  trait_type: string;
  value: string | number | boolean;
  display_type?: string | null;
}

interface NftMetadata {
  tokenId?: string;
  name?: string;
  image?: string | null;
  description?: string | null;
  attributes?: NftAttribute[];
  traits?: NftAttribute[]; // Some collections use traits instead of attributes
  collectionSlug?: string | null;
  downloadedAt?: string;
  dna?: string;
}

function TraitCard({ trait }: { trait: { trait_type: string; value: string | number | boolean } }) {
  return (
    <div className="bg-purple-900/30 border border-purple-500/30 rounded p-2">
      <div className="text-purple-400 text-[10px] uppercase tracking-wide mb-0.5">
        {trait.trait_type}
      </div>
      <div className="text-white text-sm font-medium truncate">
        {String(trait.value)}
      </div>
    </div>
  );
}

async function fetchMetadata(contractAddress: string, tokenId: string): Promise<NftMetadata | null> {
  const contract = findContract(contractAddress);
  if (!contract?.nftImagesDir) return null;

  const jsonDir = contract.nftImagesDir.replace('/images', '/json');
  const jsonUrl = `${NFT_ASSETS_BASE_URL}${jsonDir}/${tokenId}.json`;

  try {
    const response = await fetch(jsonUrl, { next: { revalidate: 3600 } });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fall through to return null
  }

  return null;
}

function getImageUrl(contractAddress: string, tokenId: string): string | null {
  const contract = findContract(contractAddress);
  if (!contract?.nftImagesDir) return null;

  const ext = contract.nftImageExt || 'png';
  return `${NFT_ASSETS_BASE_URL}${contract.nftImagesDir}/${tokenId}.${ext}`;
}

// Separate contracts into collections and misc
const collections = contracts.filter(c => c.items && c.items > 0);
const miscContracts = contracts.filter(c => !c.items || c.items === 0);

export default async function NftDetailPage({ params }: PageProps) {
  const { address, tokenId } = await params;
  const contract = findContract(address);

  if (!contract) {
    notFound();
  }

  const metadata = await fetchMetadata(address, tokenId);
  const imageUrl = getImageUrl(address, tokenId);

  const imageSrc = imageUrl || metadata?.image || null;
  const name = metadata?.name || `${contract.name} #${tokenId}`;

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
          {/* Back Link */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/contracts/${address}`}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              ← {contract.name}
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href={`/contracts/${address}/nfts`}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              All NFTs
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="glass p-3 rounded-lg border border-purple-500/30">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={name}
                  width={500}
                  height={500}
                  className="w-full rounded-lg"
                  style={{ imageRendering: 'pixelated' }}
                  unoptimized
                  priority
                />
              ) : (
                <div className="aspect-square bg-black/30 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image available</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              {/* Header */}
              <div className="glass p-4 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 text-xs mb-1">{contract.name}</div>
                <h1 className="text-lg font-bold text-white mb-2">{name}</h1>

                {metadata?.description && (
                  <p className="text-gray-300 text-sm">{metadata.description}</p>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {contract.openseaUrl && (
                    <a
                      href={`${contract.openseaUrl}/${tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                      OpenSea
                    </a>
                  )}
                  <a
                    href={`https://etherscan.io/nft/${address}/${tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    Etherscan
                  </a>
                </div>
              </div>

              {/* Attributes/Traits */}
              {((metadata?.attributes && metadata.attributes.length > 0) || (metadata?.traits && metadata.traits.length > 0)) && (
                <div className="glass p-4 rounded-lg border border-purple-500/30">
                  <h2 className="text-sm font-semibold text-white mb-3">Attributes</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(metadata.attributes || metadata.traits || []).map((trait, index) => (
                      <TraitCard key={index} trait={trait} />
                    ))}
                  </div>
                </div>
              )}

              {/* Token Info */}
              <div className="glass p-4 rounded-lg border border-purple-500/30">
                <h2 className="text-sm font-semibold text-white mb-3">Token Info</h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token ID</span>
                    <span className="text-white font-mono">{tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract</span>
                    <span className="text-white font-mono">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  </div>
                  {contract.tokenStandard && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Standard</span>
                      <span className="text-white">{contract.tokenStandard}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <Link
              href={`/contracts/${address}/nfts/${parseInt(tokenId) - 1}`}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                parseInt(tokenId) <= 1
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed pointer-events-none'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              ← Previous
            </Link>
            <Link
              href={`/contracts/${address}/nfts/${parseInt(tokenId) + 1}`}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded text-white text-sm transition-colors"
            >
              Next →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

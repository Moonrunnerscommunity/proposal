import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { findContract, NFT_ASSETS_BASE_URL } from '@/config/contractData';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ contract: string; tokenId: string }>;
}

interface NftMetadata {
  tokenId: string;
  name: string;
  image?: string | null;
  description?: string | null;
  traits?: Array<{
    trait_type: string;
    value: string | number | boolean;
    display_type?: string | null;
  }>;
  collectionSlug?: string | null;
  downloadedAt?: string;
}

function TraitCard({ trait }: { trait: { trait_type: string; value: string | number | boolean } }) {
  return (
    <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
      <div className="text-purple-400 text-xs uppercase tracking-wide mb-1">
        {trait.trait_type}
      </div>
      <div className="text-white font-medium">
        {String(trait.value)}
      </div>
    </div>
  );
}

async function fetchMetadata(contractAddress: string, tokenId: string): Promise<NftMetadata | null> {
  const contract = findContract(contractAddress);
  if (!contract?.nftImagesDir) return null;

  // Derive JSON directory from images directory
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

  return `${NFT_ASSETS_BASE_URL}${contract.nftImagesDir}/${tokenId}.png`;
}

export default async function NftPage({ params }: PageProps) {
  const { contract: contractAddress, tokenId } = await params;
  const contract = findContract(contractAddress);

  if (!contract) {
    notFound();
  }

  // Try to get metadata from GitHub Pages
  const metadata = await fetchMetadata(contractAddress, tokenId);
  const imageUrl = getImageUrl(contractAddress, tokenId);

  // Determine image source - prefer local (GitHub Pages), fallback to metadata
  const imageSrc = imageUrl || metadata?.image || null;
  const name = metadata?.name || `${contract.name} #${tokenId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href={`/contracts/${contractAddress}`}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to {contract.name}
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
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
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-purple-400 text-sm mb-1">{contract.name}</div>
              <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>

              {metadata?.description && (
                <p className="text-gray-300">{metadata.description}</p>
              )}
            </div>

            {/* Traits */}
            {metadata?.traits && metadata.traits.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Traits</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {metadata.traits.map((trait, index) => (
                    <TraitCard key={index} trait={trait} />
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Links</h2>
              <div className="flex flex-wrap gap-3">
                {contract.openseaUrl && (
                  <a
                    href={`${contract.openseaUrl}/${tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    OpenSea
                  </a>
                )}
                <a
                  href={`https://etherscan.io/nft/${contractAddress}/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Etherscan
                </a>
              </div>
            </div>

            {/* Token Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Token Info</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token ID</span>
                  <span className="text-white font-mono">{tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract</span>
                  <span className="text-white font-mono text-xs">
                    {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
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
        <div className="mt-8 flex justify-between">
          <Link
            href={`/nfts/${contractAddress}/${parseInt(tokenId) - 1}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              parseInt(tokenId) <= 1
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed pointer-events-none'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            ← Previous
          </Link>
          <Link
            href={`/nfts/${contractAddress}/${parseInt(tokenId) + 1}`}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors"
          >
            Next →
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // For static generation, we'd need to enumerate all tokens
  // For now, return empty to use dynamic rendering
  return [];
}

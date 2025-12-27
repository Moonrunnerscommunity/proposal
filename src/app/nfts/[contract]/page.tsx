import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contracts, findContract, NFT_ASSETS_BASE_URL } from '@/config/contractData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ contract: string }>;
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 100;

// Known token ranges for each collection (since we can't scan external URLs)
const COLLECTION_TOKEN_RANGES: Record<string, { start: number; end: number }> = {
  '0x1485297e942ce64e0870ece60179dfda34b4c625': { start: 1, end: 10000 }, // Moonrunners
  '0x6b5483b55b362697000d8774d8ea9c4429b261bb': { start: 1, end: 2311 },  // Dragonhorde
  '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c': { start: 1, end: 2888 },  // Primordia Land
  '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4': { start: 1, end: 12 },    // Secrets (ERC1155)
  '0xc05ba5529d964a9b2c46ebcd60564a4214ab7ba4': { start: 1, end: 1 },     // Chronicles
  '0x4fdf87d4edae3fe323b8f6df502ccac6c8b4ba28': { start: 1, end: 3 },     // History
};

function getTokenRange(contractAddress: string): { start: number; end: number } | null {
  const lowerAddress = contractAddress.toLowerCase();
  for (const [addr, range] of Object.entries(COLLECTION_TOKEN_RANGES)) {
    if (addr.toLowerCase() === lowerAddress) {
      return range;
    }
  }
  return null;
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { contract: contractAddress } = await params;
  const { page: pageParam } = await searchParams;

  const contract = findContract(contractAddress);
  const tokenRange = getTokenRange(contractAddress);

  if (!contract || !contract.nftImagesDir || !tokenRange) {
    notFound();
  }

  const page = Math.max(1, parseInt(pageParam || '1', 10));
  const totalItems = tokenRange.end - tokenRange.start + 1;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Get tokens for current page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageTokenIds = Array.from(
    { length: Math.min(ITEMS_PER_PAGE, totalItems - startIndex) },
    (_, i) => tokenRange.start + startIndex + i
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href={`/contracts/${contractAddress}`}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Contract Details
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {contract.imageUrl && (
            <Image
              src={contract.imageUrl}
              alt={contract.name}
              width={64}
              height={64}
              className="rounded-lg"
              style={{ imageRendering: 'pixelated' }}
              unoptimized
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{contract.name}</h1>
            <p className="text-gray-400">
              {totalItems.toLocaleString()} items
              {totalPages > 1 && ` • Page ${page} of ${totalPages}`}
            </p>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-8">
          {pageTokenIds.map((tokenId) => (
            <Link
              key={tokenId}
              href={`/nfts/${contractAddress}/${tokenId}`}
              className="group aspect-square bg-white/5 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`${NFT_ASSETS_BASE_URL}${contract.nftImagesDir}/${tokenId}.png`}
                  alt={`${contract.name} #${tokenId}`}
                  fill
                  className="object-cover"
                  style={{ imageRendering: 'pixelated' }}
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12.5vw, 10vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center pb-1">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    #{tokenId}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/nfts/${contractAddress}?page=${page - 1}`}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors"
              >
                ← Previous
              </Link>
            )}

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/nfts/${contractAddress}?page=${pageNum}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      pageNum === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {page < totalPages && (
              <Link
                href={`/nfts/${contractAddress}?page=${page + 1}`}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return contracts
    .filter(c => c.nftImagesDir)
    .map((contract) => ({
      contract: contract.contractAddress,
    }));
}

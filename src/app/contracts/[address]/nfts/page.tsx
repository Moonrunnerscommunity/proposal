import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contracts, findContract, NFT_ASSETS_BASE_URL } from '@/config/contractData';

interface PageProps {
  params: Promise<{ address: string }>;
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 100;

// Known token ranges for each collection
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

// Separate contracts into collections and misc
const collections = contracts.filter(c => c.items && c.items > 0);
const miscContracts = contracts.filter(c => !c.items || c.items === 0);

export default async function CollectionNftsPage({ params, searchParams }: PageProps) {
  const { address } = await params;
  const { page: pageParam } = await searchParams;

  const contract = findContract(address);
  const tokenRange = getTokenRange(address);

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
          {/* Header */}
          <div className="glass p-4 rounded-lg border border-purple-500/30 mb-4">
            <div className="flex items-center gap-3">
              <Link
                href={`/contracts/${address}`}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                ← Back
              </Link>
              {contract.imageUrl && (
                <Image
                  src={contract.imageUrl}
                  alt={contract.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                  style={{ imageRendering: 'pixelated' }}
                  unoptimized
                />
              )}
              <div>
                <h1 className="text-lg font-bold text-white">{contract.name}</h1>
                <p className="text-gray-400 text-xs">
                  {totalItems.toLocaleString()} items
                  {totalPages > 1 && ` • Page ${page} of ${totalPages}`}
                </p>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
            {pageTokenIds.map((tokenId) => (
              <Link
                key={tokenId}
                href={`/contracts/${address}/nfts/${tokenId}`}
                className="group aspect-square bg-white/5 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`${NFT_ASSETS_BASE_URL}${contract.nftImagesDir}/${tokenId}.${contract.nftImageExt || 'png'}`}
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
                  href={`/contracts/${address}/nfts?page=${page - 1}`}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded text-white text-sm transition-colors"
                >
                  ← Prev
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
                      href={`/contracts/${address}/nfts?page=${pageNum}`}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
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
                  href={`/contracts/${address}/nfts?page=${page + 1}`}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded text-white text-sm transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return contracts
    .filter(c => c.nftImagesDir)
    .map((contract) => ({
      address: contract.contractAddress,
    }));
}

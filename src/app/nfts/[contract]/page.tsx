import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { contracts, findContract } from '@/config/contractData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ contract: string }>;
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 100;

function getAvailableImages(imagesDir: string): string[] {
  const fullPath = path.join(process.cwd(), 'public', imagesDir);

  try {
    if (!fs.existsSync(fullPath)) return [];

    const files = fs.readdirSync(fullPath);
    return files
      .filter(f => /\.(png|jpg|gif|webp)$/i.test(f))
      .map(f => f.replace(/\.[^.]+$/, ''))
      .sort((a, b) => parseInt(a) - parseInt(b));
  } catch {
    return [];
  }
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { contract: contractAddress } = await params;
  const { page: pageParam } = await searchParams;

  const contract = findContract(contractAddress);

  if (!contract || !contract.nftImagesDir) {
    notFound();
  }

  const page = Math.max(1, parseInt(pageParam || '1', 10));
  const availableTokenIds = getAvailableImages(contract.nftImagesDir);
  const totalItems = availableTokenIds.length || contract.items || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Get tokens for current page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageTokenIds = availableTokenIds.length > 0
    ? availableTokenIds.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : Array.from({ length: Math.min(ITEMS_PER_PAGE, totalItems - startIndex) }, (_, i) => String(startIndex + i + 1));

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
                  src={`${contract.nftImagesDir}/${tokenId}.png`}
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

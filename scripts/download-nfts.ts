/**
 * NFT Image Download Script
 *
 * Downloads NFT images and metadata from OpenSea API for specified collections.
 * Supports resume capability - will skip already downloaded files.
 *
 * Prerequisites:
 * - Node.js installed
 * - npm packages installed: run `npm install` in the project root
 * - .env file with OPENSEA_API_KEY in the project root
 *
 * How to run:
 * npx tsx scripts/download-nfts.ts --collection dragonhorde
 * npx tsx scripts/download-nfts.ts --collection primordia-land
 * npx tsx scripts/download-nfts.ts --collection secrets
 * npx tsx scripts/download-nfts.ts --collection chronicles
 * npx tsx scripts/download-nfts.ts --collection history
 *
 * Options:
 * --collection <name>  Collection to download (required)
 * --start <number>     Starting token ID (default: 1)
 * --end <number>       Ending token ID (default: collection max)
 * --dry-run            Show what would be downloaded without downloading
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Collection configurations
const COLLECTIONS: Record<string, {
  contractAddress: string;
  maxTokenId: number;
  outputDir: string;
  name: string;
}> = {
  'dragonhorde': {
    contractAddress: '0x6b5483b55b362697000d8774d8ea9c4429b261bb',
    maxTokenId: 2311,
    outputDir: 'dragonhorde',
    name: 'Dragonhorde'
  },
  'primordia-land': {
    contractAddress: '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c',
    maxTokenId: 2888,
    outputDir: 'primordia-land',
    name: 'Primordia Land'
  },
  'secrets': {
    contractAddress: '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4',
    maxTokenId: 12, // ERC1155 - only 12 unique token types
    outputDir: 'secrets',
    name: 'Secrets of Primordia'
  },
  'chronicles': {
    contractAddress: '0xc05ba5529d964a9b2c46ebcd60564a4214ab7ba4',
    maxTokenId: 1, // Only 1 seasonal drop token
    outputDir: 'chronicles',
    name: 'Chronicles of Nogard'
  },
  'history': {
    contractAddress: '0x4fdF87d4Edae3Fe323b8F6dF502CCac6c8B4ba28',
    maxTokenId: 3, // Only 3 unique token types
    outputDir: 'history',
    name: 'History of Primordia'
  }
};

// Rate limiting
const RATE_LIMIT_MS = 300; // 300ms between requests (safer than 250ms)
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// Paths
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'nfts');
const CHECKPOINT_DIR = path.join(__dirname, 'download-checkpoints');

interface NftTrait {
  trait_type: string;
  value: string | number | boolean;
  display_type?: string | null;
}

interface NftMetadata {
  tokenId: string;
  name: string;
  image?: string | null;
  description?: string | null;
  traits: NftTrait[];
  collectionSlug?: string | null;
  downloadedAt: string;
}

interface Checkpoint {
  collection: string;
  lastProcessedTokenId: number;
  totalDownloaded: number;
  failedTokenIds: number[];
  startedAt: string;
  lastUpdatedAt: string;
}

function parseArgs(): { collection: string; start: number; end: number; dryRun: boolean } {
  const args = process.argv.slice(2);
  let collection = '';
  let start = 1;
  let end = -1;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--collection' && args[i + 1]) {
      collection = args[i + 1];
      i++;
    } else if (args[i] === '--start' && args[i + 1]) {
      start = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--end' && args[i + 1]) {
      end = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    }
  }

  if (!collection || !COLLECTIONS[collection]) {
    console.error('Error: Invalid or missing collection.');
    console.error('Available collections:', Object.keys(COLLECTIONS).join(', '));
    console.error('Usage: npx tsx scripts/download-nfts.ts --collection <name>');
    process.exit(1);
  }

  const config = COLLECTIONS[collection];
  if (end === -1) {
    end = config.maxTokenId;
  }

  return { collection, start, end, dryRun };
}

function ensureDirectories(outputDir: string): void {
  const imagesDir = path.join(PUBLIC_DIR, outputDir, 'images');
  const jsonDir = path.join(PUBLIC_DIR, outputDir, 'json');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Created directory: ${imagesDir}`);
  }
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
    console.log(`Created directory: ${jsonDir}`);
  }
  if (!fs.existsSync(CHECKPOINT_DIR)) {
    fs.mkdirSync(CHECKPOINT_DIR, { recursive: true });
  }
}

function loadCheckpoint(collection: string): Checkpoint | null {
  const checkpointFile = path.join(CHECKPOINT_DIR, `${collection}.json`);
  if (fs.existsSync(checkpointFile)) {
    try {
      return JSON.parse(fs.readFileSync(checkpointFile, 'utf-8'));
    } catch {
      return null;
    }
  }
  return null;
}

function saveCheckpoint(checkpoint: Checkpoint): void {
  const checkpointFile = path.join(CHECKPOINT_DIR, `${checkpoint.collection}.json`);
  checkpoint.lastUpdatedAt = new Date().toISOString();
  fs.writeFileSync(checkpointFile, JSON.stringify(checkpoint, null, 2));
}

function isImageDownloaded(outputDir: string, tokenId: number): boolean {
  const pngPath = path.join(PUBLIC_DIR, outputDir, 'images', `${tokenId}.png`);
  const jpgPath = path.join(PUBLIC_DIR, outputDir, 'images', `${tokenId}.jpg`);
  const gifPath = path.join(PUBLIC_DIR, outputDir, 'images', `${tokenId}.gif`);
  return fs.existsSync(pngPath) || fs.existsSync(jpgPath) || fs.existsSync(gifPath);
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNftMetadata(
  contractAddress: string,
  tokenId: number,
  apiKey: string
): Promise<NftMetadata | null> {
  const url = `https://api.opensea.io/api/v2/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get(url, {
        headers: {
          'X-API-KEY': apiKey,
          'Accept': 'application/json',
        },
        timeout: 30000,
      });

      if (response.data?.nft) {
        const nft = response.data.nft;
        return {
          tokenId: String(tokenId),
          name: nft.name || `#${tokenId}`,
          image: nft.display_image_url || nft.image_url,
          description: nft.description,
          traits: nft.traits || [],
          collectionSlug: nft.collection,
          downloadedAt: new Date().toISOString(),
        };
      }
      return null;
    } catch (error: any) {
      if (error.response?.status === 429) {
        // Rate limited - wait longer
        console.log(`Rate limited on token ${tokenId}, waiting 5 seconds...`);
        await sleep(5000);
      } else if (error.response?.status === 404) {
        // Token doesn't exist
        return null;
      } else if (attempt < MAX_RETRIES) {
        console.log(`Retry ${attempt}/${MAX_RETRIES} for token ${tokenId}: ${error.message}`);
        await sleep(RETRY_DELAY_MS);
      } else {
        console.error(`Failed to fetch token ${tokenId} after ${MAX_RETRIES} attempts: ${error.message}`);
        return null;
      }
    }
  }
  return null;
}

async function downloadImage(
  imageUrl: string,
  outputDir: string,
  tokenId: number
): Promise<boolean> {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 60000,
      maxRedirects: 5,
    });

    // Determine file extension from content-type or URL
    const contentType = response.headers['content-type'] || '';
    let ext = 'png';
    if (contentType.includes('jpeg') || contentType.includes('jpg') || imageUrl.includes('.jpg')) {
      ext = 'jpg';
    } else if (contentType.includes('gif') || imageUrl.includes('.gif')) {
      ext = 'gif';
    } else if (contentType.includes('webp') || imageUrl.includes('.webp')) {
      ext = 'webp';
    }

    const outputPath = path.join(PUBLIC_DIR, outputDir, 'images', `${tokenId}.${ext}`);
    fs.writeFileSync(outputPath, response.data);
    return true;
  } catch (error: any) {
    console.error(`Failed to download image for token ${tokenId}: ${error.message}`);
    return false;
  }
}

async function main(): Promise<void> {
  const { collection, start, end, dryRun } = parseArgs();
  const config = COLLECTIONS[collection];
  const apiKey = process.env.OPENSEA_API_KEY;

  if (!apiKey) {
    console.error('Error: OPENSEA_API_KEY environment variable not set.');
    console.error('Add it to your .env file: OPENSEA_API_KEY=your_api_key_here');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log(`NFT Download Script - ${config.name}`);
  console.log('='.repeat(60));
  console.log(`Collection: ${collection}`);
  console.log(`Contract: ${config.contractAddress}`);
  console.log(`Token range: ${start} to ${end}`);
  console.log(`Dry run: ${dryRun}`);
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('\n[DRY RUN] Would download the following tokens:');
    let count = 0;
    for (let tokenId = start; tokenId <= end; tokenId++) {
      if (!isImageDownloaded(config.outputDir, tokenId)) {
        count++;
        if (count <= 20) {
          console.log(`  Token #${tokenId}`);
        }
      }
    }
    console.log(`\nTotal tokens to download: ${count}`);
    return;
  }

  ensureDirectories(config.outputDir);

  // Load or create checkpoint
  let checkpoint = loadCheckpoint(collection) || {
    collection,
    lastProcessedTokenId: start - 1,
    totalDownloaded: 0,
    failedTokenIds: [],
    startedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
  };

  // Resume from checkpoint if available
  const resumeFrom = Math.max(start, checkpoint.lastProcessedTokenId + 1);
  if (resumeFrom > start) {
    console.log(`Resuming from token ${resumeFrom} (${checkpoint.totalDownloaded} already downloaded)`);
  }

  let downloaded = checkpoint.totalDownloaded;
  let skipped = 0;
  let failed = 0;

  for (let tokenId = resumeFrom; tokenId <= end; tokenId++) {
    // Check if already downloaded
    if (isImageDownloaded(config.outputDir, tokenId)) {
      skipped++;
      checkpoint.lastProcessedTokenId = tokenId;
      if (skipped % 100 === 0) {
        console.log(`Skipped ${skipped} already downloaded tokens...`);
      }
      continue;
    }

    process.stdout.write(`\rDownloading token ${tokenId}/${end} (${downloaded} downloaded, ${failed} failed)...`);

    // Fetch metadata
    const metadata = await fetchNftMetadata(config.contractAddress, tokenId, apiKey);

    if (metadata) {
      // Save metadata
      const metadataPath = path.join(PUBLIC_DIR, config.outputDir, 'json', `${tokenId}.json`);
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

      // Download image
      if (metadata.image) {
        const imageDownloaded = await downloadImage(metadata.image, config.outputDir, tokenId);
        if (imageDownloaded) {
          downloaded++;
        } else {
          failed++;
          checkpoint.failedTokenIds.push(tokenId);
        }
      } else {
        console.log(`\nNo image URL for token ${tokenId}`);
        failed++;
        checkpoint.failedTokenIds.push(tokenId);
      }
    } else {
      // Token doesn't exist or fetch failed
      failed++;
    }

    // Update checkpoint periodically
    checkpoint.lastProcessedTokenId = tokenId;
    checkpoint.totalDownloaded = downloaded;
    if (tokenId % 10 === 0) {
      saveCheckpoint(checkpoint);
    }

    // Rate limiting
    await sleep(RATE_LIMIT_MS);
  }

  // Final checkpoint save
  saveCheckpoint(checkpoint);

  console.log('\n');
  console.log('='.repeat(60));
  console.log('Download Complete!');
  console.log('='.repeat(60));
  console.log(`Total downloaded: ${downloaded}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Failed: ${failed}`);
  if (checkpoint.failedTokenIds.length > 0) {
    console.log(`Failed token IDs: ${checkpoint.failedTokenIds.slice(0, 20).join(', ')}${checkpoint.failedTokenIds.length > 20 ? '...' : ''}`);
  }
  console.log(`Output directory: ${path.join(PUBLIC_DIR, config.outputDir)}`);
}

main().catch(console.error);

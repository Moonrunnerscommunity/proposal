/**
 * NFT JSON Image URL Update Script
 *
 * Updates the `image` field in all NFT JSON metadata files to point
 * to the new GitHub Pages hosted images.
 *
 * How to run:
 * npx tsx scripts/update-json-images.ts
 * npx tsx scripts/update-json-images.ts --collection moonrunners
 * npx tsx scripts/update-json-images.ts --dry-run
 */

const fs = require('fs');
const path = require('path');

// GitHub Pages base URL for images
const GITHUB_PAGES_BASE = 'https://moonrunnerscommunity.github.io/proposal';

// Collection configurations
const COLLECTIONS: {
  name: string;
  dir: string;
  ext: string;
  startId: number;
  endId: number;
}[] = [
  { name: 'Moonrunners', dir: 'moonrunners', ext: 'png', startId: 1, endId: 10000 },
  { name: 'Dragonhorde', dir: 'dragonhorde', ext: 'png', startId: 1, endId: 2311 },
  { name: 'Secrets of Primordia', dir: 'secrets', ext: 'gif', startId: 1, endId: 12 },
  { name: 'Chronicles of Nogard', dir: 'chronicles', ext: 'png', startId: 1, endId: 1 },
];

// Path to gh-pages repo
const GH_PAGES_NFT_DIR = path.join(__dirname, '..', '..', 'proposal-gh-pages', 'nfts');

interface JsonMetadata {
  image?: string;
  [key: string]: unknown;
}

function getNewImageUrl(collection: string, tokenId: number, ext: string): string {
  return `${GITHUB_PAGES_BASE}/nfts/${collection}/images/${tokenId}.${ext}`;
}

function updateCollection(
  collectionConfig: typeof COLLECTIONS[number],
  dryRun: boolean
): { updated: number; skipped: number; errors: string[] } {
  const { name, dir, ext, startId, endId } = collectionConfig;
  const jsonDir = path.join(GH_PAGES_NFT_DIR, dir, 'json');

  console.log(`\n--- Processing ${name} ---`);
  console.log(`JSON directory: ${jsonDir}`);

  if (!fs.existsSync(jsonDir)) {
    console.error(`  ERROR: JSON directory not found: ${jsonDir}`);
    return { updated: 0, skipped: 0, errors: [`Directory not found: ${jsonDir}`] };
  }

  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (let tokenId = startId; tokenId <= endId; tokenId++) {
    const jsonPath = path.join(jsonDir, `${tokenId}.json`);

    if (!fs.existsSync(jsonPath)) {
      // File doesn't exist - might be burned token
      skipped++;
      continue;
    }

    try {
      const content = fs.readFileSync(jsonPath, 'utf-8');
      const metadata: JsonMetadata = JSON.parse(content);

      const newImageUrl = getNewImageUrl(dir, tokenId, ext);
      const oldImageUrl = metadata.image;

      // Check if already updated
      if (oldImageUrl === newImageUrl) {
        skipped++;
        continue;
      }

      // Update the image URL
      metadata.image = newImageUrl;

      if (dryRun) {
        console.log(`  [DRY RUN] Would update ${tokenId}.json:`);
        console.log(`    Old: ${oldImageUrl}`);
        console.log(`    New: ${newImageUrl}`);
      } else {
        fs.writeFileSync(jsonPath, JSON.stringify(metadata, null, 2));
      }

      updated++;

      // Progress indicator every 1000 files
      if (updated % 1000 === 0) {
        console.log(`  Progress: ${updated} files updated...`);
      }
    } catch (err) {
      const errorMsg = `Error processing ${tokenId}.json: ${err}`;
      errors.push(errorMsg);
      console.error(`  ${errorMsg}`);
    }
  }

  console.log(`  Completed: ${updated} updated, ${skipped} skipped, ${errors.length} errors`);
  return { updated, skipped, errors };
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const collectionArg = args.find((_, i, arr) => arr[i - 1] === '--collection');

  console.log('=== NFT JSON Image URL Update Script ===');
  console.log(`GitHub Pages Base: ${GITHUB_PAGES_BASE}`);
  console.log(`GH Pages NFT Dir: ${GH_PAGES_NFT_DIR}`);
  console.log(`Dry Run: ${dryRun}`);

  if (!fs.existsSync(GH_PAGES_NFT_DIR)) {
    console.error(`\nERROR: proposal-gh-pages repo not found at expected path`);
    console.error(`Expected: ${GH_PAGES_NFT_DIR}`);
    console.error(`Make sure the proposal-gh-pages repo is cloned as a sibling directory.`);
    process.exit(1);
  }

  const collectionsToProcess = collectionArg
    ? COLLECTIONS.filter(c => c.dir === collectionArg || c.name.toLowerCase().includes(collectionArg.toLowerCase()))
    : COLLECTIONS;

  if (collectionsToProcess.length === 0) {
    console.error(`\nNo collection found matching: ${collectionArg}`);
    console.error(`Available collections: ${COLLECTIONS.map(c => c.dir).join(', ')}`);
    process.exit(1);
  }

  console.log(`\nCollections to process: ${collectionsToProcess.map(c => c.name).join(', ')}`);

  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const collection of collectionsToProcess) {
    const result = updateCollection(collection, dryRun);
    totalUpdated += result.updated;
    totalSkipped += result.skipped;
    totalErrors += result.errors.length;
  }

  console.log('\n=== Summary ===');
  console.log(`Total Updated: ${totalUpdated}`);
  console.log(`Total Skipped: ${totalSkipped}`);
  console.log(`Total Errors: ${totalErrors}`);

  if (dryRun) {
    console.log('\n[DRY RUN] No files were modified. Run without --dry-run to apply changes.');
  } else if (totalUpdated > 0) {
    console.log('\nNext steps:');
    console.log('1. cd ../proposal-gh-pages');
    console.log('2. git add -A && git commit -m "Update NFT image URLs to GitHub Pages"');
    console.log('3. git push');
  }
}

main();

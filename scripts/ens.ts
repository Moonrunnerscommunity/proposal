(() => {
  const fs = require('fs');
  const path = require('path');
  const { ethers } = require('ethers');
  const dotenv = require('dotenv');

  dotenv.config();

  const AUDIT_RESULTS_FILE = path.join(__dirname, 'auditResults.json');
  const ENS_RESULTS_FILE = path.join(__dirname, 'ensResults.json');
  const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://rpc.ankr.com/eth';
  const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC_URL);

  async function main() {
    // 1. Read audit results
    const auditResults = JSON.parse(fs.readFileSync(AUDIT_RESULTS_FILE, 'utf8'));

    // 2. Collect all unique addresses
    const addressSet = new Set<string>();
    for (const entry of auditResults) {
      if (entry.author?.address && ethers.isAddress(entry.author.address)) {
        addressSet.add(entry.author.address.toLowerCase());
      }
      if (entry.currentOwner?.address && ethers.isAddress(entry.currentOwner.address)) {
        addressSet.add(entry.currentOwner.address.toLowerCase());
      }
    }

    // 3. Load existing ENS cache if present
    let ensCache: Record<string, string> = {};
    if (fs.existsSync(ENS_RESULTS_FILE)) {
      ensCache = JSON.parse(fs.readFileSync(ENS_RESULTS_FILE, 'utf8'));
    }

    // 4. Lookup ENS names
    for (const addr of addressSet) {
      const address = addr as string;
      if (ensCache[address] !== undefined) continue; // Already cached

      if (
        address === '0x0000000000000000000000000000000000000000' ||
        address === 'unknown'
      ) {
        // Don't save nulls anymore
        continue;
      }

      try {
        const ens = await provider.lookupAddress(address);
        if (ens) {
          ensCache[address] = ens;
          console.log(`Address: ${address} => ENS: ${ens}`);
        } else {
          // Don't save nulls
          console.log(`Address: ${address} => ENS: null`);
        }
      } catch (e) {
        console.error(`Failed to lookup ENS for ${address}:`, e);
        // Don't save nulls
      }
      // Save progress after each lookup (for large sets)
      fs.writeFileSync(ENS_RESULTS_FILE, JSON.stringify(ensCache, null, 2));
    }

    // 5. Final save
    fs.writeFileSync(ENS_RESULTS_FILE, JSON.stringify(ensCache, null, 2));
    console.log('ENS lookup complete. Results saved to', ENS_RESULTS_FILE);
  }

  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
})(); 
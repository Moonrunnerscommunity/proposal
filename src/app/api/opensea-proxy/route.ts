export const runtime = 'edge';
interface NftTrait {
  trait_type: string;
  value: string | number | boolean;
  display_type?: string | null;
}

// Simplified based on fields actually used from OpenSea's nft object
interface OpenSeaNft {
  name?: string | null;
  display_image_url?: string | null;
  description?: string | null;
  traits?: NftTrait[];
  collection?: string | null; // This is the collection slug
}

interface OpenSeaSingleNftApiResponse {
  nft: OpenSeaNft | null;
}

// This is the structure we are building for our client-side consumption
interface ClientNftMetadata {
  name: string;
  image?: string | null;
  description?: string | null;
  traits: NftTrait[];
  collectionSlug?: string | null; // from OpenSea's nft.collection
  tokenId: string;
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const queryParams = url.searchParams;

  const primordiaTokens = queryParams.get('primordiaTokens');
  const moonrunnersTokens = queryParams.get('moonrunnersTokens');
  const dragonhordeTokens = queryParams.get('dragonhordeTokens');

  const openSeaApiKey = process.env.OPENSEA_API_KEY;

  if (!openSeaApiKey) {
    console.error("OPENSEA_API_KEY environment variable not provided.");
    return new Response(JSON.stringify({ message: 'Server configuration error: OPENSEA_API_KEY missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const headers = {
    'X-API-KEY': openSeaApiKey,
    'Accept': 'application/json',
  };

  const tokens: { primordia: string[]; moonrunners: string[]; dragonhorde: string[] } = {
    primordia: primordiaTokens ? primordiaTokens.split(',').filter(Boolean) : [],
    moonrunners: moonrunnersTokens ? moonrunnersTokens.split(',').filter(Boolean) : [],
    dragonhorde: dragonhordeTokens ? dragonhordeTokens.split(',').filter(Boolean) : [],
  };

  console.log('[API Route /api/opensea-proxy] Parsed tokens from query:', tokens);

  const collections = {
    primordia: '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c',
    moonrunners: '0x1485297e942ce64e0870ece60179dfda34b4c625',
    dragonhorde: '0x6b5483b55b362697000d8774d8ea9c4429b261bb',
  };

  const metadataResult: { primordia: Record<string, ClientNftMetadata>; moonrunners: Record<string, ClientNftMetadata>; dragonhorde: Record<string, ClientNftMetadata> } = {
    primordia: {},
    moonrunners: {},
    dragonhorde: {},
  };

  try {
    for (const [collectionName, contractAddress] of Object.entries(collections)) {
      const tokenIds = tokens[collectionName as keyof typeof tokens];

      if (!tokenIds || !Array.isArray(tokenIds) || tokenIds.length === 0) {
        console.log(`[API Route /api/opensea-proxy] No tokens found for ${collectionName}`);
        continue;
      }

      console.log(`[API Route /api/opensea-proxy] Fetching metadata for ${collectionName} tokens:`, tokenIds);
      const collectionMetadata: Record<string, ClientNftMetadata> = {};

      for (const tokenId of tokenIds) {
        try {
          const fetchUrl = `https://api.opensea.io/api/v2/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`;
          const response = await fetch(fetchUrl, { headers });

          if (!response.ok) {
            const errorText = await response.text();
            console.warn(`[API Route /api/opensea-proxy] OpenSea API error for ${collectionName} token ${tokenId}:`, response.status, errorText);
            continue;
          }

          const data = await response.json() as OpenSeaSingleNftApiResponse;
          if (data.nft) {
            const nft = data.nft;
            collectionMetadata[tokenId] = {
              name: nft.name || `${collectionName} #${tokenId}`,
              image: nft.display_image_url,
              description: nft.description,
              traits: nft.traits || [],
              collectionSlug: nft.collection, // Renamed for clarity
              tokenId: tokenId,
            };
          }
          await new Promise(resolve => setTimeout(resolve, 250));
        } catch (error) {
          console.error(`[API Route /api/opensea-proxy] Error fetching token ${tokenId} for ${collectionName}:`, error);
        }
      }
      metadataResult[collectionName as keyof typeof metadataResult] = collectionMetadata;
    }

    console.log("[API Route /api/opensea-proxy] Successfully fetched metadata, sending response.");
    return new Response(JSON.stringify(metadataResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("[API Route /api/opensea-proxy] Error in GET handler:", error);
    return new Response(JSON.stringify({ message: 'Failed to fetch NFT metadata via proxy' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
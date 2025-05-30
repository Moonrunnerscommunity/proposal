import { useQuery } from '@tanstack/react-query'
import { useReadContract } from 'wagmi'
import { CONTRACTS } from '@/lib/web3'
import { getContractConfig } from '@/lib/contracts'
import type { StakedNFTData } from '../shared/schema'

export function useStakedNFTs(userAddress?: string) {
  // Fetch Primordia Land NFTs
  const { data: rawPrimordiaTokens, isLoading: isPrimordiaLoading } = useReadContract({
    address: CONTRACTS.PRIMORDIA.address as `0x${string}`,
    abi: getContractConfig(CONTRACTS.PRIMORDIA.address).abi,
    functionName: 'tokensOfOwner',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress,
    },
  })

  // Convert BigInt array to string array
  const primordiaTokens = rawPrimordiaTokens?.map(tokenId => tokenId.toString());

  const { data: rawMoonrunnersData, isLoading: isMoonrunnersLoading } = useReadContract({
    address: CONTRACTS.MOONRUNNERS_DRAGONHORDE.address as `0x${string}`,
    abi: getContractConfig(CONTRACTS.MOONRUNNERS_DRAGONHORDE.address).abi,
    functionName: 'getStake',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress,
    },
  })

  // Convert BigInt values to strings in moonrunners data
  const moonrunnersData = rawMoonrunnersData ? {
    moonrunners: rawMoonrunnersData.tokenIds
      .filter(tokenId => tokenId <= 10000n)
      .map(tokenId => tokenId.toString()),
    dragonhorde: rawMoonrunnersData.tokenIds
      .filter(tokenId => tokenId > 10000n)
      .map(tokenId => (tokenId - 20000n).toString())
  } : null;

  // Fetch NFT metadata from OpenSea
  const { data: nftMetadata, isLoading: isMetadataLoading } = useQuery({
    queryKey: ['nft-metadata', primordiaTokens, moonrunnersData],
    queryFn: async () => {

      const params = new URLSearchParams();

      if (primordiaTokens?.length) {
        params.set('primordiaTokens', primordiaTokens.join(','));
      }
      if (moonrunnersData?.moonrunners?.length) {
        params.set('moonrunnersTokens', moonrunnersData.moonrunners.join(','));
      }
      if (moonrunnersData?.dragonhorde?.length) {
        params.set('dragonhordeTokens', moonrunnersData.dragonhorde.join(','));
      }

      // If no tokens to fetch, return empty metadata to avoid an unnecessary API call
      if (params.toString() === '' && !primordiaTokens?.length && !moonrunnersData?.moonrunners?.length && !moonrunnersData?.dragonhorde?.length) {
        const hasPrimordia = primordiaTokens && primordiaTokens.some(t => t.length > 0);
        const hasMoonrunners = moonrunnersData?.moonrunners && moonrunnersData.moonrunners.some(t => t.length > 0);
        const hasDragonhorde = moonrunnersData?.dragonhorde && moonrunnersData.dragonhorde.some(t => t.length > 0);

        if (!hasPrimordia && !hasMoonrunners && !hasDragonhorde) {
          console.log("No actual tokens to fetch, returning empty metadata from client hook.");
          return { primordia: {}, moonrunners: {}, dragonhorde: {} };
        }
      }

      const response = await fetch(`/api/opensea-proxy?${params.toString()}`);
      if (!response.ok) {
        console.error('[Client Hook] Error response from /api/opensea-proxy:', response);
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      return response.json();
    },
    enabled: !isPrimordiaLoading && !isMoonrunnersLoading,
    staleTime: Infinity,
  })

  const processNFTData = (): {
    primordia: StakedNFTData[]
    moonrunners: StakedNFTData[]
    dragonhorde: StakedNFTData[]
  } => {
    const result = {
      primordia: [] as StakedNFTData[],
      moonrunners: [] as StakedNFTData[],
      dragonhorde: [] as StakedNFTData[]
    }

    // Process Primordia tokens
    if (primordiaTokens && Array.isArray(primordiaTokens)) {
      result.primordia = primordiaTokens.map(tokenIdString => ({
        tokenId: tokenIdString,
        contractAddress: CONTRACTS.PRIMORDIA.address,
        collection: 'primordia' as const,
        name: `Primordia Land #${tokenIdString}`,
        image: getMetadataImage('primordia', tokenIdString),
      }))
    }

    // Process Moonrunners/Dragonhorde tokens
    if (moonrunnersData && typeof moonrunnersData === 'object') {

      if (moonrunnersData.moonrunners) {
        result.moonrunners = moonrunnersData.moonrunners.map(tokenIdString => ({
          tokenId: tokenIdString,
          contractAddress: CONTRACTS.MOONRUNNERS_DRAGONHORDE.address,
          collection: 'moonrunners' as const,
          name: `Moonrunner #${tokenIdString}`,
          image: getMetadataImage('moonrunners', tokenIdString),
        }))
      }

      if (moonrunnersData.dragonhorde) {
        result.dragonhorde = moonrunnersData.dragonhorde.map(tokenIdString => ({
          tokenId: tokenIdString,
          contractAddress: CONTRACTS.MOONRUNNERS_DRAGONHORDE.address,
          collection: 'dragonhorde' as const,
          name: `Dragonhorde #${tokenIdString}`,
          image: getMetadataImage('dragonhorde', tokenIdString),
        }))
      }
    }

    return result
  }

  const getMetadataImage = (collection: string, tokenId: string): string => {
    if (nftMetadata && nftMetadata[collection] && nftMetadata[collection][tokenId]) {
      return nftMetadata[collection][tokenId].image
    }
    return '' // Will show placeholder if no image
  }

  const nftData = processNFTData()
  const isLoading = isPrimordiaLoading || isMoonrunnersLoading || isMetadataLoading

  return {
    ...nftData,
    isLoading,
    totalCount: nftData.primordia.length + nftData.moonrunners.length + nftData.dragonhorde.length
  }
}
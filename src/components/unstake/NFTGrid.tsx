import { useState } from 'react'
import { Button } from '@/components/unstake/ui/button'
import { Card, CardContent } from '@/components/unstake/ui/card'
import { CircleCheck, CheckSquare, Unlock } from 'lucide-react'
import { NFTCard } from '@/components/unstake/NFTCard'
import type { StakedNFTData } from '../../shared/schema'

interface NFTGridProps {
  title: string
  contractAddress: string
  nfts: StakedNFTData[]
  onUnstake: (tokenIds: string[]) => void
  isLoading?: boolean
}

export function NFTGrid({ title, contractAddress, nfts, onUnstake, isLoading }: NFTGridProps) {
  const [selectedTokenIds, setSelectedTokenIds] = useState<Set<string>>(new Set())

  const handleSelectionChange = (tokenId: string, selected: boolean) => {
    const newSelected = new Set(selectedTokenIds)
    if (selected) {
      newSelected.add(tokenId)
    } else {
      newSelected.delete(tokenId)
    }
    setSelectedTokenIds(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedTokenIds.size === nfts.length) {
      setSelectedTokenIds(new Set())
    } else {
      setSelectedTokenIds(new Set(nfts.map(nft => nft.tokenId)))
    }
  }

  const handleUnstakeSelected = () => {
    if (selectedTokenIds.size > 0) {
      onUnstake(Array.from(selectedTokenIds))
      setSelectedTokenIds(new Set())
    }
  }

  const formatContractAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (nfts.length === 0 && !isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Unlock className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Staked NFTs</h3>
          <p className="text-slate-600">
            No staked {title} NFTs found for your wallet address.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="flex items-center space-x-2"
              disabled={nfts.length === 0}
            >
              <CheckSquare className="w-4 h-4" />
              <span>{selectedTokenIds.size === nfts.length ? 'Deselect All' : 'Select All'}</span>
            </Button>

            <Button
              onClick={handleUnstakeSelected}
              disabled={selectedTokenIds.size === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unstake Selected</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-slate-200 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map(nft => (
              <NFTCard
                key={nft.tokenId}
                nft={nft}
                isSelected={selectedTokenIds.has(nft.tokenId)}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
        )}

        {/* Selection Summary */}
        {nfts.length > 0 && (
          <div className="mt-6 p-4 rounded-lg border bg-background">
            <div className="flex items-center justify-center">
              <span className="text-slate-500">
                {selectedTokenIds.size} of {nfts.length} NFTs selected
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

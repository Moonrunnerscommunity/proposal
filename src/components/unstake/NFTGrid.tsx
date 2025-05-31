import { useState } from 'react'
import { Button } from '@/components/unstake/ui/button'
import { Card, CardContent } from '@/components/unstake/ui/card'
import { CheckSquare, Unlock } from 'lucide-react'
import { NFTCard } from '@/components/unstake/NFTCard'
import type { StakedNFTData } from '../../shared/schema'

interface NFTGridProps {
  title: string
  nfts: StakedNFTData[]
  onUnstake: (tokenIds: string[]) => void
  isLoading?: boolean
}

export function NFTGrid({ title, nfts, onUnstake, isLoading }: NFTGridProps) {
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

  if (nfts.length === 0 && !isLoading) {
    return (
      <Card>
        <CardContent>
          <div>
            <Unlock />
          </div>
          <h3>No Staked NFTs</h3>
          <p>
            No staked {title} NFTs found for your wallet address.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-dark border border-[rgba(138,111,183,0.15)] shadow-lg mb-8">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-responsive-xl font-bold text-starlight drop-shadow-md tracking-wide">{title}</h3>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={nfts.length === 0}
              className="btn-secondary border border-[rgba(138,111,183,0.3)]"
            >
              <CheckSquare className="mr-1" />
              <span>{selectedTokenIds.size === nfts.length ? 'Deselect All' : 'Select All'}</span>
            </Button>

            <Button
              onClick={handleUnstakeSelected}
              disabled={selectedTokenIds.size === 0}
              className="btn-primary border border-[rgba(255,215,0,0.2)]"
            >
              <Unlock className="mr-1" />
              <span>Unstake Selected</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden glass-dark border border-[rgba(138,111,183,0.15)] animate-pulse">
                <div className="w-full h-48 bg-[rgba(138,111,183,0.15)]" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[rgba(138,111,183,0.15)] rounded" />
                  <div className="h-3 bg-[rgba(138,111,183,0.10)] rounded w-2/3" />
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
          <div className="mt-6 flex justify-end">
            <span className="text-sm text-starlight bg-[rgba(74,43,123,0.2)] px-4 py-2 rounded-lg border border-[rgba(138,111,183,0.15)]">
              {selectedTokenIds.size} of {nfts.length} NFTs selected
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

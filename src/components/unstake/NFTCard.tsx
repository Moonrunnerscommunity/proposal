import { Card } from '@/components/unstake/ui/card'
import { Checkbox } from '@/components/unstake/ui/checkbox'
import { ImageIcon } from 'lucide-react'
import type { StakedNFTData } from '../../shared/schema'

interface NFTCardProps {
  nft: StakedNFTData
  isSelected: boolean
  onSelectionChange: (tokenId: string, selected: boolean) => void
}

export function NFTCard({ nft, isSelected, onSelectionChange }: NFTCardProps) {
  const handleCardClick = () => {
    onSelectionChange(nft.tokenId, !isSelected)
  }

  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange(nft.tokenId, checked)
  }

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-200 group ${isSelected
        ? 'border-primary border-2'
        : 'border-border border-2 hover:border-primary'
        }`}
      onClick={handleCardClick}
    >
      <div className="relative">
        {nft.image ? (
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}

        {/* Fallback placeholder */}
        <div className={`w-full h-48 bg-muted flex items-center justify-center ${nft.image ? 'hidden' : ''}`}>
          <ImageIcon className="w-12 h-12 text-muted-foreground" />
        </div>

        <div className="absolute top-3 right-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 border-2 border-white bg-white/80 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>

        <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
          #{nft.tokenId}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-card-foreground mb-2">{nft.name}</h4>
        <p className="text-sm text-muted-foreground">
          Staked {nft.collection === 'primordia' ? 'Primordia Land' : nft.collection === 'moonrunners' ? 'Moonrunners' : nft.collection === 'dragonhorde' ? 'Dragonhorde' : 'Unknown'} NFT
        </p>
      </div>
    </Card>
  )
}
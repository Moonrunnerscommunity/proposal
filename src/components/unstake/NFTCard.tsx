import { Card } from '@/components/unstake/ui/card'
import { Checkbox } from '@/components/unstake/ui/checkbox'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image';
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
      onClick={handleCardClick}
      className={`glass border border-[rgba(138,111,183,0.18)] shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer relative p-0 overflow-hidden ${isSelected ? 'ring-2 ring-accent-gold' : ''}`}
    >
      <div className="relative w-full h-48 bg-[rgba(74,43,123,0.10)] flex items-center justify-center">
        {nft.image ? (
          <Image
            src={nft.image}
            alt={nft.name}
            width={0}
            height={192}
            className="w-full h-48 object-cover rounded-t-lg pixelated-image"
            priority
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}

        {/* Fallback placeholder */}
        <div className={`absolute inset-0 flex items-center justify-center bg-[rgba(44,27,80,0.7)] ${nft.image ? 'hidden' : ''}`}>
          <ImageIcon className="w-12 h-12 text-starlight opacity-60" />
        </div>

        {/* Checkbox in top right */}
        <div className="absolute top-2 right-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            className="border-accent-gold bg-[rgba(249,247,232,0.1)]"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h4 className="text-starlight font-semibold text-base truncate">{nft.name}</h4>
        <p className="text-xs text-[rgba(194,190,201,0.8)] mb-1">
          Staked {nft.collection === 'primordia' ? 'Primordia Land' : nft.collection === 'moonrunners' ? 'Moonrunners' : nft.collection === 'dragonhorde' ? 'Dragonhorde' : 'Unknown'} NFT
        </p>
        <div className="text-xs text-accent-gold font-mono">#{nft.tokenId}</div>
      </div>
    </Card>
  )
}
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/unstake/ui/dialog'
import { Button } from '@/components/unstake/ui/button'
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onRetry?: () => void
  transactionHash?: string
  status: 'pending' | 'success' | 'error'
  errorMessage?: string
  nftCount?: number
  gasEstimate?: string
}

export function TransactionModal({
  isOpen,
  onClose,
  onRetry,
  transactionHash,
  status,
  errorMessage,
  nftCount = 0
}: TransactionModalProps) {
  const [showRetry, setShowRetry] = useState(false)

  useEffect(() => {
    setShowRetry(status === 'error')
  }, [status])

  const getEtherscanUrl = (hash: string) => {
    return `https://etherscan.io/tx/${hash}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border border-[rgba(255,215,0,0.10)] shadow-2xl max-w-md w-full rounded-xl p-0">
        <div className="p-6 flex flex-col items-center justify-center gap-5 w-full">
          {/* Loading State */}
          {status === 'pending' && (
            <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
              <DialogHeader className="w-full">
                <DialogTitle className="text-starlight text-2xl font-bold mb-2 w-full text-center">Processing Transaction</DialogTitle>
                <DialogDescription className="text-[rgba(194,190,201,0.8)] text-base w-full text-center">
                  Please confirm the transaction in your wallet...
                </DialogDescription>
              </DialogHeader>
              <div className="animate-spin text-accent-gold drop-shadow-glow mx-auto">
                <Loader2 className="w-12 h-12" />
              </div>
              <div className="flex flex-col items-center gap-1 mt-2">
                <span className="text-base text-starlight">NFTs to unstake:</span>
                <span className="text-xl font-mono text-accent-gold">{nftCount}</span>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
              <DialogHeader className="w-full">
                <DialogTitle className="text-accent-gold text-2xl font-bold mb-2 w-full text-center">Transaction Successful!</DialogTitle>
                <DialogDescription className="text-[rgba(194,190,201,0.8)] text-base w-full text-center">
                  Your NFTs have been successfully unstaked.
                </DialogDescription>
              </DialogHeader>
              <CheckCircle className="w-14 h-14 text-accent-gold animate-float drop-shadow-glow mx-auto" />
              {transactionHash && (
                <a
                  href={getEtherscanUrl(transactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold underline flex items-center gap-1 hover:text-accent-gold/80 text-base justify-center mx-auto"
                >
                  View on Etherscan
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
              <DialogHeader className="w-full">
                <DialogTitle className="text-red-300 text-2xl font-bold mb-2 flex items-center justify-center gap-2 w-full text-center">
                  <XCircle className="w-10 h-10 text-red-400 animate-pulse drop-shadow-glow-red" />
                  Transaction Failed
                </DialogTitle>
                <DialogDescription className="w-full text-center">
                  <div className="max-h-32 overflow-y-auto break-all text-base text-red-200 bg-[rgba(44,27,80,0.7)] p-3 rounded-lg border-l-4 border-accent-gold shadow-inner w-full mt-2 font-mono mx-auto">
                    {errorMessage || 'The transaction was rejected or failed to process.'}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </div>
          )}

          <div className="flex gap-3 justify-center w-full mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="btn-secondary border border-[rgba(138,111,183,0.3)] px-5 py-2 rounded-lg text-base"
            >
              Close
            </Button>
            {showRetry && onRetry && (
              <Button
                onClick={onRetry}
                className="btn-primary border border-[rgba(255,215,0,0.2)] px-5 py-2 rounded-lg text-base"
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* Add these to your global CSS for extra polish:
.drop-shadow-glow { filter: drop-shadow(0 0 8px var(--color-accent-gold)); }
.drop-shadow-glow-red { filter: drop-shadow(0 0 8px #ff4d4f); }
*/
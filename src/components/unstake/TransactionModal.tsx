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
  nftCount = 0,
  gasEstimate = '0.015 ETH'
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
      <DialogContent className="max-w-md">
        <div className="text-center p-6">
          {/* Loading State */}
          {status === 'pending' && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold text-center">Processing Transaction</DialogTitle>
                <DialogDescription className="text-slate-500 text-center">
                  Please confirm the transaction in your wallet...
                </DialogDescription>
              </DialogHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-left">
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>NFTs to unstake:</span>
                    <span className="font-medium">{nftCount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold text-center">Transaction Successful!</DialogTitle>
                <DialogDescription className="text-slate-600 text-center">
                  Your NFTs have been successfully unstaked.
                </DialogDescription>
              </DialogHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              {transactionHash && (
                <a
                  href={getEtherscanUrl(transactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                >
                  View on Etherscan
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold text-center">Transaction Failed</DialogTitle>
                <DialogDescription className="text-slate-600 text-center">
                  {errorMessage || 'The transaction was rejected or failed to process.'}
                </DialogDescription>
              </DialogHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {showRetry && onRetry && (
              <Button
                onClick={onRetry}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
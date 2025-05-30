"use client";

import { useState } from 'react'
import Image from 'next/image';
import { useAppKitAccount } from '@reown/appkit/react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/unstake/ui/tabs'
import { Badge } from '@/components/unstake/ui/badge'
import { WalletConnect } from '@/components/unstake/WalletConnect'
import { NFTGrid } from '@/components/unstake/NFTGrid'
import { TransactionModal } from '@/components/unstake/TransactionModal'
import { useStakedNFTs } from '@/hooks/useStakedNFTs'
import { useToast } from '@/hooks/use-toast'
import { CONTRACTS } from '@/lib/web3'
import { getContractConfig } from '@/lib/contracts'
import { Wallet, Boxes } from 'lucide-react'

export default function unstakePage() {
  const { address, isConnected } = useAppKitAccount()
  const { data: returnedHash, writeContractAsync, isPending: isWriteContractPending, error: writeContractError } = useWriteContract()
  const { toast } = useToast()

  const [transactionHash, setTransactionHash] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [unstakeData, setUnstakeData] = useState<{ nftCount: number; gasEstimate: string }>()

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}`,
  })

  const {
    primordia,
    moonrunners,
    dragonhorde,
    isLoading,
    totalCount
  } = useStakedNFTs(address)

  const handleUnstake = async (tokenIds: string[], contractAddress: string, collection?: string) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to unstake NFTs.",
        variant: "destructive",
      })
      return
    }

    try {
      const config = getContractConfig(contractAddress)
      const tokenIdsBigInt = tokenIds.map(id => BigInt(id))
      let writeMethod: 'unStake' | 'unstake' | 'unstakeDragons' = config.writeMethod as 'unStake' | 'unstake';

      if (collection === 'dragonhorde') {
        writeMethod = 'unstakeDragons'
      }

      setUnstakeData({
        nftCount: tokenIds.length,
        gasEstimate: `~${(tokenIds.length * 0.005).toFixed(3)} ETH`
      })
      setTransactionStatus('pending')
      setIsModalOpen(true)

      // Use writeContractAsync to get the hash
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: config.abi,
        functionName: writeMethod,
        args: [tokenIdsBigInt],
      })

      if (hash) {
        setTransactionHash(hash)
      } else {
        console.error("writeContractAsync resolved but no hash was returned.");
        setTransactionStatus('error');
        setErrorMessage('Failed to submit transaction: No hash returned.');
        setIsModalOpen(true);
        return;
      }

      toast({
        title: "Transaction Submitted",
        description: "Your unstake transaction has been submitted. Please wait for confirmation.",
      })

    } catch (error: any) {
      console.error('unstake failed:', error)
      setTransactionStatus('error')
      setErrorMessage(error.message || 'Transaction failed. Please try again.')

      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to unstake NFTs. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle transaction receipt
  if (receipt && transactionHash && transactionStatus === 'pending') {
    if (receipt.status === 'success') {
      setTransactionStatus('success')
      toast({
        title: "NFTs Unstaked Successfully!",
        description: "Your NFTs have been unstaked and returned to your wallet.",
      })
    } else {
      setTransactionStatus('error')
      setErrorMessage('Transaction failed on the blockchain.')
    }
  }

  const handleRetryTransaction = () => {
    setIsModalOpen(false)
    setTransactionStatus('pending')
    setTransactionHash(undefined)
  }

  return (
    <div className="relative w-full">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallax/bg.png"
          alt="Background"
          fill
          className="parallax-image object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Mountains layer - fixed at bottom */}
      <div className="fixed bottom-[-100px] left-0 right-0 z-10">
        <Image
          src="/parallax/mountains.png"
          alt="Mountains"
          width={1600}
          height={1000}
          className="parallax-image object-contain object-bottom w-full"
          unoptimized
        />
      </div>

      {/* Clouds layer - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Image
          src="/parallax/clouds.png"
          alt="Clouds"
          width={1200}
          height={600}
          className="parallax-image object-contain w-full max-w-4xl mx-auto"
          unoptimized
        />
      </div>

      <div className="fixed top-5 right-5 z-50">
        <WalletConnect />
      </div>

      <div className="relative z-40">
        <div className="relative z-10 w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center flex flex-col items-center">

              {/* Logo - responsive sizing */}
              <div className="mb-0 w-full flex justify-center transition-all duration-1000">
                <Image
                  src="/moonrunners.svg"
                  alt="Moonrunners Logo"
                  width={512}
                  height={256}
                  className="pixelated-image w-full h-auto max-h-32 sm:max-h-48 md:max-h-56 lg:max-h-64 max-w-2xl"
                  priority
                />
              </div>

              {/* Title - responsive typography */}
              <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-300">
                <h1 className="text-responsive-3xl font-bold text-white leading-tight text-center">
                  unstake Portal
                </h1>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!isConnected ? (
            <div className="text-center py-16 glass p-8 rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wallet className="text-muted-foreground text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-8">
                  Please connect your wallet to view your staked NFTs and access the unstake portal.
                </p>
                <WalletConnect />
              </div>
            </div>
          ) : totalCount === 0 && !isLoading ? (
            <div className="text-center py-16 glass p-8 rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Boxes className="text-muted-foreground text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No Staked NFTs Found</h3>
                <p className="text-muted-foreground mb-8">
                  We couldn't find any staked NFTs associated with your wallet address. If you believe this is an error, please try refreshing the page.
                </p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="primordia" className="glass p-6 sm:p-8 lg:p-8 rounded-lg sm:rounded-xl w-full">
              <div className="border-b border-border mb-8">
                <TabsList className="grid w-full grid-cols-3 bg-transparent">
                  <TabsTrigger
                    value="primordia"
                    className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent"
                  >
                    Primordia Land
                    <Badge variant="secondary" className="ml-2">
                      {primordia.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="moonrunners"
                    className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent"
                  >
                    Moonrunners
                    <Badge variant="secondary" className="ml-2">
                      {moonrunners.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dragonhorde"
                    className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent"
                  >
                    Dragonhorde
                    <Badge variant="secondary" className="ml-2">
                      {dragonhorde.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="primordia">
                <NFTGrid
                  title="Primordia Land"
                  contractAddress={CONTRACTS.PRIMORDIA.address}
                  nfts={primordia}
                  onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.PRIMORDIA.address)}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="moonrunners">
                <NFTGrid
                  title="Moonrunners"
                  contractAddress={CONTRACTS.MOONRUNNERS_DRAGONHORDE.address}
                  nfts={moonrunners}
                  onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.MOONRUNNERS_DRAGONHORDE.address, 'moonrunners')}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="dragonhorde">
                <NFTGrid
                  title="Dragonhorde"
                  contractAddress={CONTRACTS.MOONRUNNERS_DRAGONHORDE.address}
                  nfts={dragonhorde}
                  onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.MOONRUNNERS_DRAGONHORDE.address, 'dragonhorde')}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          )}
        </main>

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRetry={handleRetryTransaction}
          transactionHash={transactionHash}
          status={transactionStatus}
          errorMessage={errorMessage}
          nftCount={unstakeData?.nftCount}
          gasEstimate={unstakeData?.gasEstimate}
        />
      </div>
    </div>
  )
}
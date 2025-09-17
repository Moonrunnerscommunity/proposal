"use client";

import { useState } from 'react'
import Image from 'next/image';
import { useAppKitAccount } from '@reown/appkit/react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/unstake/ui/tabs'
import { WalletConnect } from '@/components/unstake/WalletConnect'
import { NFTGrid } from '@/components/unstake/NFTGrid'
import { TransactionModal } from '@/components/unstake/TransactionModal'
import { useStakedNFTs } from '@/hooks/useStakedNFTs'
import { useToast } from '@/hooks/use-toast'
import { CONTRACTS } from '@/lib/web3'
import { getContractConfig } from '@/lib/contracts'
import { Wallet, Boxes } from 'lucide-react'

export default function UnstakePage() {
  const { address, isConnected } = useAppKitAccount()
  const { writeContractAsync } = useWriteContract()
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

    } catch (error: unknown) {
      console.error('unstake failed:', error)
      setTransactionStatus('error')
      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message || 'Transaction failed. Please try again.')

      toast({
        title: "Transaction Failed",
        description: message || "Failed to unstake NFTs. Please try again.",
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

      <div className="fixed top-5 right-5 z-40">
        <WalletConnect />
      </div>

      <div className="relative z-40">
        <div className="relative z-10 w-full flex justify-center items-center mt-14 px-4 sm:px-6 lg:px-8">
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
                  Unstaking Portal
                </h1>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-dark border border-[rgba(138,111,183,0.18)] shadow-2xl rounded-2xl p-6 md:p-10 backdrop-blur-md">
            {!isConnected ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="glass-dark border border-[rgba(138,111,183,0.18)] shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-md w-full">
                  <Wallet className="w-14 h-14 text-accent-gold mb-2 animate-float" />
                  <h3 className="text-xl font-bold text-starlight mb-1">Connect Your Wallet</h3>
                  <p className="text-[rgba(194,190,201,0.85)] text-center mb-2">
                    Please connect your wallet to view your staked NFTs and access the unstake portal.
                  </p>
                  <div className="mt-2 w-full flex justify-center">
                    <WalletConnect />
                  </div>
                </div>
              </div>
            ) : totalCount === 0 && !isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="glass-dark border border-[rgba(138,111,183,0.18)] shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-md w-full">
                  <Boxes className="w-14 h-14 text-accent-gold mb-2 animate-float" />
                  <h3 className="text-xl font-bold text-starlight mb-1">No Staked NFTs Found</h3>
                  <p className="text-[rgba(194,190,201,0.85)] text-center mb-2">
                    We couldn&apos;t find any staked NFTs associated with your wallet address. If you believe this is an error, please try refreshing the page.
                  </p>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="primordia">
                <TabsList className="w-full flex flex-col sm:flex-row justify-between overflow-hidden bg-[rgba(44,27,80,0.7)] rounded-xl mb-8 p-0 shadow-md">
                  <TabsTrigger
                    value="primordia"
                    className="tab-trigger no-outline w-full text-lg font-semibold text-starlight px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-accent-gold data-[state=active]:shadow-none data-[state=active]:border-accent-gold border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
                  >
                    Primordia Land
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-accent-gold bg-[rgba(28,13,54,0.95)] text-accent-gold font-bold text-sm">{primordia.length}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="moonrunners"
                    className="tab-trigger no-outline w-full text-lg font-semibold text-starlight px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-accent-gold data-[state=active]:shadow-none data-[state=active]:border-accent-gold border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
                  >
                    Moonrunners
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-accent-gold bg-[rgba(28,13,54,0.95)] text-accent-gold font-bold text-sm">{moonrunners.length}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dragonhorde"
                    className="tab-trigger no-outline w-full text-lg font-semibold text-starlight px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-accent-gold data-[state=active]:shadow-none data-[state=active]:border-accent-gold border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
                  >
                    Dragonhorde
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-accent-gold bg-[rgba(28,13,54,0.95)] text-accent-gold font-bold text-sm">{dragonhorde.length}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="primordia">
                  <NFTGrid
                    title="Primordia Land"
                    nfts={primordia}
                    onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.PRIMORDIA.address)}
                    isLoading={isLoading}
                  />
                </TabsContent>

                <TabsContent value="moonrunners">
                  <NFTGrid
                    title="Moonrunners"
                    nfts={moonrunners}
                    onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.MOONRUNNERS_DRAGONHORDE.address, 'moonrunners')}
                    isLoading={isLoading}
                  />
                </TabsContent>

                <TabsContent value="dragonhorde">
                  <NFTGrid
                    title="Dragonhorde"
                    nfts={dragonhorde}
                    onUnstake={(tokenIds) => handleUnstake(tokenIds, CONTRACTS.MOONRUNNERS_DRAGONHORDE.address, 'dragonhorde')}
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
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
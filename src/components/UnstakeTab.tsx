'use client';

import { useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/unstake/ui/tabs';
import { WalletConnect } from '@/components/unstake/WalletConnect';
import { NFTGrid } from '@/components/unstake/NFTGrid';
import { TransactionModal } from '@/components/unstake/TransactionModal';
import { useStakedNFTs } from '@/hooks/useStakedNFTs';
import { useToast } from '@/hooks/use-toast';
import { CONTRACTS } from '@/lib/web3';
import { getContractConfig } from '@/lib/contracts';
import { Wallet, Boxes } from 'lucide-react';

export default function UnstakeTab() {
  const { address, isConnected } = useAppKitAccount();
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();

  const [transactionHash, setTransactionHash] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [unstakeData, setUnstakeData] = useState<{ nftCount: number; gasEstimate: string }>();

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}`,
  });

  const {
    primordia,
    moonrunners,
    dragonhorde,
    isLoading,
    totalCount
  } = useStakedNFTs(address);

  const handleUnstake = async (tokenIds: string[], contractAddress: string, collection?: string) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to unstake NFTs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const config = getContractConfig(contractAddress);
      const tokenIdsBigInt = tokenIds.map(id => BigInt(id));
      let writeMethod: 'unStake' | 'unstake' | 'unstakeDragons' = config.writeMethod as 'unStake' | 'unstake';

      if (collection === 'dragonhorde') {
        writeMethod = 'unstakeDragons';
      }

      setUnstakeData({
        nftCount: tokenIds.length,
        gasEstimate: `~${(tokenIds.length * 0.005).toFixed(3)} ETH`
      });
      setTransactionStatus('pending');
      setIsModalOpen(true);

      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: config.abi,
        functionName: writeMethod,
        args: [tokenIdsBigInt],
      });

      if (hash) {
        setTransactionHash(hash);
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
      });

    } catch (error: unknown) {
      console.error('unstake failed:', error);
      setTransactionStatus('error');
      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message || 'Transaction failed. Please try again.');

      toast({
        title: "Transaction Failed",
        description: message || "Failed to unstake NFTs. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle transaction receipt
  if (receipt && transactionHash && transactionStatus === 'pending') {
    if (receipt.status === 'success') {
      setTransactionStatus('success');
      toast({
        title: "NFTs Unstaked Successfully!",
        description: "Your NFTs have been unstaked and returned to your wallet.",
      });
    } else {
      setTransactionStatus('error');
      setErrorMessage('Transaction failed on the blockchain.');
    }
  }

  const handleRetryTransaction = () => {
    setIsModalOpen(false);
    setTransactionStatus('pending');
    setTransactionHash(undefined);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          🔓 Unstaking Portal
        </h2>
        <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-4">
          Retrieve your staked Primordia Land, Moonrunners, and Dragonhorde NFTs.
        </p>
        {/* Wallet Connect Button */}
        <div className="flex justify-center">
          <WalletConnect />
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-dark border border-[rgba(138,111,183,0.18)] shadow-2xl rounded-2xl p-4 md:p-8 backdrop-blur-md">
        {!isConnected ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="glass-dark border border-[rgba(138,111,183,0.18)] shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-md w-full">
              <Wallet className="w-14 h-14 text-yellow-400 mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">Connect Your Wallet</h3>
              <p className="text-gray-300 text-center mb-2">
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
              <Boxes className="w-14 h-14 text-yellow-400 mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">No Staked NFTs Found</h3>
              <p className="text-gray-300 text-center mb-2">
                We couldn&apos;t find any staked NFTs associated with your wallet address. If you believe this is an error, please try refreshing the page.
              </p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="primordia">
            <TabsList className="w-full flex flex-col sm:flex-row justify-between overflow-hidden bg-[rgba(44,27,80,0.7)] rounded-xl mb-8 p-0 shadow-md">
              <TabsTrigger
                value="primordia"
                className="tab-trigger no-outline w-full text-base font-semibold text-white px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-yellow-400 data-[state=active]:shadow-none data-[state=active]:border-yellow-400 border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
              >
                Primordia Land
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-yellow-400 bg-[rgba(28,13,54,0.95)] text-yellow-400 font-bold text-sm">{primordia.length}</span>
              </TabsTrigger>
              <TabsTrigger
                value="moonrunners"
                className="tab-trigger no-outline w-full text-base font-semibold text-white px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-yellow-400 data-[state=active]:shadow-none data-[state=active]:border-yellow-400 border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
              >
                Moonrunners
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-yellow-400 bg-[rgba(28,13,54,0.95)] text-yellow-400 font-bold text-sm">{moonrunners.length}</span>
              </TabsTrigger>
              <TabsTrigger
                value="dragonhorde"
                className="tab-trigger no-outline w-full text-base font-semibold text-white px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-0 focus:border-0 data-[state=active]:bg-[rgba(74,43,123,0.7)] data-[state=active]:text-yellow-400 data-[state=active]:shadow-none data-[state=active]:border-yellow-400 border border-transparent hover:bg-[rgba(74,43,123,0.3)]"
              >
                Dragonhorde
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-yellow-400 bg-[rgba(28,13,54,0.95)] text-yellow-400 font-bold text-sm">{dragonhorde.length}</span>
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
  );
}

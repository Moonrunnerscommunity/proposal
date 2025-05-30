import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined. Please set it in your environment variables."
  );
}

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia],
  projectId,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia],
  projectId,
  metadata: {
    name: 'Primordia Unstaking Portal',
    description: 'Unstake your Primordia Land, Moonrunners and Dragonhorde NFTs',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://moonrunners.ai',
    icons: ['/favicon.ico']
  },
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    emailShowWallets: true
  }
})

export const CONTRACTS = {
  PRIMORDIA: {
    address: '0x9972edce48d82d16c82326e23f894f9aa0e3bb32',
    collection: 'primordia' as const
  },
  MOONRUNNERS_DRAGONHORDE: {
    address: '0x717C6dD66Be92E979001aee2eE169aAA8D6D4361',
    collection: 'moonrunners_dragonhorde' as const
  }
}

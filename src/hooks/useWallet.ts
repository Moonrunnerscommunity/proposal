import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

export function useWallet() {
    const { address, isConnected, isConnecting } = useAccount()
    const { connect, connectors, error: connectError } = useConnect()
    const { disconnect } = useDisconnect()
    const { toast } = useToast()

    const connectWallet = async (connectorId?: string) => {
        try {
            const connector = connectorId
                ? connectors.find(c => c.id === connectorId)
                : connectors[0]

            if (connector) {
                connect({ connector })
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error)
            toast({
                title: "Connection Failed",
                description: "Failed to connect to wallet. Please try again.",
                variant: "destructive",
            })
        }
    }

    const disconnectWallet = () => {
        disconnect()
        toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected.",
        })
    }

    const formatAddress = (addr: string) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    return {
        address,
        isConnected,
        isConnecting,
        connectError,
        connectors,
        connectWallet,
        disconnectWallet,
        formatAddress: formatAddress(address || ''),
    }
}
import { Button } from '@/components/unstake/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/unstake/ui/dropdown-menu'
import { Wallet, LogOut } from 'lucide-react'
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'

export function WalletConnect() {
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="glass border border-[rgba(138,111,183,0.18)] text-starlight font-mono px-4 py-2 shadow-md hover:scale-105 transition-transform">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium">{formatAddress(address)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-dark border border-[rgba(138,111,183,0.18)] text-starlight shadow-lg">
          <DropdownMenuItem onClick={() => open({ view: 'Account' })} className="hover:bg-[rgba(74,43,123,0.2)] cursor-pointer">
            <Wallet className="mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => disconnect()} className="hover:bg-[rgba(74,43,123,0.2)] cursor-pointer">
            <LogOut className="mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      onClick={() => open({ view: 'Connect' })}
      className="btn-primary border border-[rgba(255,215,0,0.2)] text-starlight font-mono px-4 py-2 shadow-md hover:scale-105 transition-transform"
    >
      <Wallet className="mr-2" />
      <span>Connect Wallet</span>
    </Button>
  )
}
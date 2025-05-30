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
          <Button variant="outline" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium">{formatAddress(address)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => open({ view: 'Account' })}>
            <Wallet className="w-4 h-4 mr-2 cursor-pointer" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => disconnect()}>
            <LogOut className="w-4 h-4 mr-2 cursor-pointer" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      onClick={() => open({ view: 'Connect' })}
      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </Button>
  )
}
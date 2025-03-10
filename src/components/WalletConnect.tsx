
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const MOCK_WALLETS = [
  { id: "metamask", name: "MetaMask" },
  { id: "wmc", name: "World Mobile Wallet" },
  { id: "walletconnect", name: "WalletConnect" },
];

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className = "" }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  // Mock connect function - in real implementation, this would use actual Web3 wallet providers
  const handleConnect = (walletId: string) => {
    // This would be replaced with actual wallet connection logic
    const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    setWalletAddress(mockAddress);
    setConnected(true);
    setSelectedWallet(walletId);

    toast.success(`Connected to ${MOCK_WALLETS.find(w => w.id === walletId)?.name}`, {
      description: `Address: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
    });
  };

  const handleDisconnect = () => {
    setWalletAddress("");
    setConnected(false);
    setSelectedWallet("");
    
    toast.info("Wallet disconnected");
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className={className}>
      {!connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-ana-darkblue/50 border-ana-purple/30 text-white">
              <Wallet size={16} />
              Connect Wallet
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-ana-darkblue border-ana-purple/30 text-white">
            <DropdownMenuLabel>Select Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            {MOCK_WALLETS.map((wallet) => (
              <DropdownMenuItem
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                className="cursor-pointer hover:bg-ana-purple/20"
              >
                {wallet.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-ana-darkblue/50 border-green-500/30 text-white">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              {truncateAddress(walletAddress)}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-ana-darkblue border-ana-purple/30 text-white">
            <DropdownMenuLabel>
              {MOCK_WALLETS.find(w => w.id === selectedWallet)?.name || "Wallet"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            <DropdownMenuItem className="flex justify-between cursor-default">
              <span className="opacity-70">Address:</span> 
              <span>{truncateAddress(walletAddress)}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between cursor-default">
              <span className="opacity-70">Voting Power:</span> 
              <span>3,250</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            <DropdownMenuItem
              onClick={handleDisconnect}
              className="cursor-pointer hover:bg-red-500/20 text-red-400"
            >
              <LogOut size={16} className="mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default WalletConnect;

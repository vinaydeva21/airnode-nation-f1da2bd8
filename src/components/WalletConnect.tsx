
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown, Coins, LockKeyhole, ShieldCheck, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [stakeDialogOpen, setStakeDialogOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [transactionHistoryOpen, setTransactionHistoryOpen] = useState(false);

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

  const handleStake = () => {
    toast.success(`Staked ${stakeAmount} ANA tokens`, {
      description: "Your tokens are now earning rewards"
    });
    setStakeDialogOpen(false);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Mock transaction history
  const mockTransactions = [
    { id: "tx1", type: "Buy", asset: "Portal 180", amount: "2 shares", value: "$90.00", timestamp: "2023-09-15 14:32" },
    { id: "tx2", type: "Stake", asset: "ANA Token", amount: "150 ANA", value: "$75.00", timestamp: "2023-09-10 09:45" },
    { id: "tx3", type: "Claim", asset: "Rewards", amount: "25 USDC", value: "$25.00", timestamp: "2023-09-01 16:20" },
    { id: "tx4", type: "Vote", asset: "Proposal #24", amount: "-", value: "-", timestamp: "2023-08-28 11:15" },
    { id: "tx5", type: "Collateralize", asset: "Nexus I", amount: "3 shares", value: "$225.00", timestamp: "2023-08-15 10:30" }
  ];

  // Mock wallet assets
  const mockAssets = {
    ana: 250,
    shares: [
      { node: "Portal 180", amount: 2, value: 90 },
      { node: "Nexus I", amount: 3, value: 225 }
    ],
    stakedAna: 150,
    rewards: 25
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
          <DropdownMenuContent className="bg-ana-darkblue border-ana-purple/30 text-white min-w-[240px]">
            <DropdownMenuLabel>
              {MOCK_WALLETS.find(w => w.id === selectedWallet)?.name || "Wallet"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Address:</span> 
                <span>{truncateAddress(walletAddress)}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">ANA Balance:</span> 
                <span>{mockAssets.ana} ANA</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Staked ANA:</span> 
                <span>{mockAssets.stakedAna} ANA</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Pending Rewards:</span> 
                <span className="text-green-400">{mockAssets.rewards} USDC</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Voting Power:</span> 
                <span>3,250</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer hover:bg-ana-purple/20">
                  <Coins size={16} className="mr-2" />
                  Assets & DeFi
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-ana-darkblue border-ana-purple/30 text-white">
                  <DropdownMenuItem 
                    onClick={() => setStakeDialogOpen(true)}
                    className="cursor-pointer hover:bg-ana-purple/20"
                  >
                    <LockKeyhole size={16} className="mr-2" />
                    Stake ANA Tokens
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-ana-purple/20">
                    <ShieldCheck size={16} className="mr-2" />
                    Claim Rewards
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuItem 
                onClick={() => setTransactionHistoryOpen(true)}
                className="cursor-pointer hover:bg-ana-purple/20"
              >
                <History size={16} className="mr-2" />
                Transaction History
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
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
      
      {/* Staking Dialog */}
      <Dialog open={stakeDialogOpen} onOpenChange={setStakeDialogOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Stake ANA Tokens</DialogTitle>
            <DialogDescription className="text-white/70">
              Stake your ANA tokens to earn rewards and increase your governance voting power
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between text-sm bg-ana-darkblue/30 p-3 rounded-md">
              <span>Available ANA Balance:</span>
              <span>{mockAssets.ana} ANA</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Amount to Stake</label>
              <Input
                type="number"
                min="1"
                max={mockAssets.ana}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Staking Period</label>
              <Tabs defaultValue="30days" className="w-full">
                <TabsList className="grid grid-cols-3 bg-ana-darkblue/50">
                  <TabsTrigger value="30days">30 Days</TabsTrigger>
                  <TabsTrigger value="90days">90 Days</TabsTrigger>
                  <TabsTrigger value="180days">180 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex justify-between text-sm bg-green-500/10 p-3 rounded-md">
              <span>Estimated APY:</span>
              <span className="text-green-400">12%</span>
            </div>
            
            <div className="p-3 bg-ana-purple/10 border border-ana-purple/30 rounded-md text-sm">
              <strong>Note:</strong> Staked tokens will be locked for the selected period. Early unstaking incurs a 10% penalty.
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setStakeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStake}>
              Stake Tokens
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Transaction History Dialog */}
      <Dialog open={transactionHistoryOpen} onOpenChange={setTransactionHistoryOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
            <DialogDescription className="text-white/70">
              Your recent transactions on the AirNode Alliance network
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border border-ana-purple/20 rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-ana-purple/20">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Type</th>
                    <th className="text-left p-3 text-sm font-medium">Asset</th>
                    <th className="text-left p-3 text-sm font-medium">Amount</th>
                    <th className="text-left p-3 text-sm font-medium">Value</th>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-ana-purple/10 hover:bg-ana-purple/5">
                      <td className="p-3 text-sm">{tx.type}</td>
                      <td className="p-3 text-sm">{tx.asset}</td>
                      <td className="p-3 text-sm">{tx.amount}</td>
                      <td className="p-3 text-sm">{tx.value}</td>
                      <td className="p-3 text-sm">{tx.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTransactionHistoryOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletConnect;

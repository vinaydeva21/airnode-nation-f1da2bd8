import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown, Coins, LockKeyhole, ShieldCheck, History, User, UserPlus } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

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
  const [myAssetsDialogOpen, setMyAssetsDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // This would be replaced with actual authentication logic
    toast.success("Successfully logged in");
    setAuthDialogOpen(false);
    setConnected(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // This would be replaced with actual registration logic
    toast.success("Account created successfully");
    setAuthDialogOpen(false);
    setConnected(true);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Mock wallets
  const MOCK_WALLETS = [
    { id: "metamask", name: "MetaMask" },
    { id: "wmc", name: "World Mobile Wallet" },
    { id: "walletconnect", name: "WalletConnect" },
  ];

  // Mock transaction history
  const mockTransactions = [
    { id: "tx1", type: "Buy", asset: "Portal 180", amount: "2 shares", value: "$90.00", timestamp: "2023-09-15 14:32" },
    { id: "tx2", type: "Stake", asset: "ANA Token", amount: "150 ANA", value: "$75.00", timestamp: "2023-09-10 09:45" },
    { id: "tx3", type: "Claim", asset: "Rewards", amount: "25 USDC", value: "$25.00", timestamp: "2023-09-01 16:20" },
    { id: "tx4", type: "Vote", asset: "Proposal #24", amount: "-", value: "-", timestamp: "2023-08-28 11:15" },
    { id: "tx5", type: "Collateralize", asset: "Nexus I", amount: "3 shares", value: "$225.00", timestamp: "2023-08-15 10:30" }
  ];

  // Mock wallet assets
  const myAssets = {
    airNodes: [
      { name: "Portal 180", shares: 3, value: 135, earnings: 7.2, roi: 18.6 },
      { name: "Nexus I", shares: 2, value: 150, earnings: 7.2, roi: 22.4 }
    ],
    tokens: {
      ana: 450,
      anaStaked: 150,
      usdc: 125.75
    },
    totalValue: 860.75
  };

  return (
    <div className={className}>
      {!connected ? (
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
            onClick={() => {
              setAuthTab("login");
              setAuthDialogOpen(true);
            }}
          >
            <User size={16} className="mr-1" />
            Log In
          </Button>
          <Button
            onClick={() => {
              setAuthTab("signup");
              setAuthDialogOpen(true);
            }}
          >
            <UserPlus size={16} className="mr-1" />
            Sign Up
          </Button>
        </div>
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
                <span>{myAssets.tokens.ana} ANA</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Staked ANA:</span> 
                <span>{myAssets.tokens.anaStaked} ANA</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Pending Rewards:</span> 
                <span className="text-green-400">{myAssets.tokens.usdc} USDC</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between cursor-default">
                <span className="opacity-70">Voting Power:</span> 
                <span>3,250</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-ana-purple/20" />
            
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setMyAssetsDialogOpen(true)}
                className="cursor-pointer hover:bg-ana-purple/20"
              >
                <Coins size={16} className="mr-2" />
                My Assets
              </DropdownMenuItem>
              
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
      
      {/* Authentication Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{authTab === "login" ? "Log In" : "Sign Up"}</DialogTitle>
            <DialogDescription className="text-white/70">
              {authTab === "login" 
                ? "Welcome back! Log in to your AirNode Alliance account" 
                : "Create a new account to join the AirNode Alliance"
              }
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={authTab} onValueChange={(value) => setAuthTab(value as "login" | "signup")} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-ana-darkblue/50">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="********"
                    className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
                  />
                </div>
                
                <div className="pt-4 flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setAuthDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Log In</Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="********"
                    className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="********"
                    className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
                  />
                </div>
                
                <div className="pt-4 flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setAuthDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Sign Up</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
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
              <span>{myAssets.tokens.ana} ANA</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Amount to Stake</label>
              <Input
                type="number"
                min="1"
                max={myAssets.tokens.ana}
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
      
      {/* My Assets Dialog */}
      <Dialog open={myAssetsDialogOpen} onOpenChange={setMyAssetsDialogOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>My Assets</DialogTitle>
            <DialogDescription className="text-white/70">
              View and manage your AirNode Alliance portfolio
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Card className="bg-ana-darkblue/30 border-ana-purple/20 p-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white/60 text-sm">Total Portfolio Value</h3>
                  <div className="text-2xl font-bold text-white mt-1">${myAssets.totalValue.toFixed(2)}</div>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Monthly Earnings</h3>
                  <div className="text-2xl font-bold text-green-400 mt-1">$14.40</div>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Average ROI</h3>
                  <div className="text-2xl font-bold text-white mt-1">20.2%</div>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-4">My AirNodes</h2>
                <Card className="bg-ana-darkblue/30 border-ana-purple/20 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-ana-purple/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium">Node</th>
                        <th className="text-center p-4 text-sm font-medium">Shares</th>
                        <th className="text-center p-4 text-sm font-medium">Value</th>
                        <th className="text-center p-4 text-sm font-medium">Monthly</th>
                        <th className="text-center p-4 text-sm font-medium">ROI</th>
                        <th className="text-right p-4 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAssets.airNodes.map((node, idx) => (
                        <tr key={idx} className="border-t border-ana-purple/10">
                          <td className="p-4">{node.name}</td>
                          <td className="p-4 text-center">{node.shares}</td>
                          <td className="p-4 text-center">${node.value}</td>
                          <td className="p-4 text-center text-green-400">${node.earnings}</td>
                          <td className="p-4 text-center">{node.roi}%</td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" className="mr-2">Sell</Button>
                            <Button size="sm">Collateralize</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Token Holdings</h2>
                <Card className="bg-ana-darkblue/30 border-ana-purple/20 p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-ana-purple/10">
                      <div>
                        <div className="text-lg font-medium text-white">ANA Token</div>
                        <div className="text-sm text-white/60">Available</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-white">{myAssets.tokens.ana}</div>
                        <div className="text-sm text-white/60">${(myAssets.tokens.ana * 0.52).toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-ana-purple/10">
                      <div>
                        <div className="text-lg font-medium text-white">ANA Staked</div>
                        <div className="text-sm text-white/60">Locked 90 days</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-white">{myAssets.tokens.anaStaked}</div>
                        <div className="text-sm text-white/60">${(myAssets.tokens.anaStaked * 0.52).toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-medium text-white">USDC</div>
                        <div className="text-sm text-white/60">Stablecoin</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-white">{myAssets.tokens.usdc}</div>
                        <div className="text-sm text-white/60">${myAssets.tokens.usdc}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button variant="outline" className="w-full">Stake ANA</Button>
                    <Button className="w-full">Claim Rewards</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMyAssetsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletConnect;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, TrendingUp, ShoppingCart, Wallet, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import AirNodeCard from "@/components/airnode/AirNodeCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  
  const airNodes = [
    {
      id: "portal-180",
      name: "Portal 180",
      location: "Nairobi, Kenya",
      price: 45,
      imageUrl: "/lovable-uploads/944059d9-4b2a-4ce4-a703-1df8d972e858.png",
      totalShares: 1000,
      availableShares: 850,
      performance: {
        uptime: 99.2,
        earnings: 2.4,
        roi: 18.6
      }
    },
    {
      id: "portal-360",
      name: "Portal 360",
      location: "Lagos, Nigeria",
      price: 60,
      imageUrl: "/lovable-uploads/b43073b7-44b5-4631-b30f-dc3671d1e301.png",
      totalShares: 1000,
      availableShares: 600,
      performance: {
        uptime: 98.7,
        earnings: 2.9,
        roi: 19.2
      }
    },
    {
      id: "nexus-1",
      name: "Nexus I",
      price: 75,
      location: "Addis Ababa, Ethiopia",
      imageUrl: "/lovable-uploads/944059d9-4b2a-4ce4-a703-1df8d972e858.png",
      totalShares: 2000,
      availableShares: 1200,
      performance: {
        uptime: 99.8,
        earnings: 3.6,
        roi: 22.4
      }
    },
    {
      id: "nexus-2",
      name: "Nexus II",
      price: 80,
      location: "Kampala, Uganda",
      imageUrl: "/lovable-uploads/b43073b7-44b5-4631-b30f-dc3671d1e301.png",
      totalShares: 2000,
      availableShares: 1800,
      performance: {
        uptime: 97.9,
        earnings: 3.2,
        roi: 20.1
      }
    },
  ];

  const lendingOptions = [
    { 
      id: "loan-1", 
      title: "AirNode-Backed Loan", 
      description: "Borrow stablecoins using your AirNode shares as collateral",
      apy: "4.5%",
      ltv: "70%",
      term: "1-12 months",
      icon: <Wallet className="h-10 w-10 text-ana-purple" />
    },
    { 
      id: "loan-2", 
      title: "Yield Farming", 
      description: "Provide liquidity with your ANA tokens and earn enhanced yields",
      apy: "16%",
      ltv: "N/A",
      term: "Flexible",
      icon: <Coins className="h-10 w-10 text-green-400" />
    },
    { 
      id: "loan-3", 
      title: "ANA Staking", 
      description: "Stake your ANA tokens to earn rewards and increase governance voting power",
      apy: "12%",
      ltv: "N/A",
      term: "30/90/180 days",
      icon: <TrendingUp className="h-10 w-10 text-blue-400" />
    }
  ];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for "${searchQuery}"`, {
      description: "Filtering marketplace listings..."
    });
  };

  const handleLendingCardClick = (option: typeof lendingOptions[0]) => {
    toast.info(`Opening ${option.title}`, {
      description: `Current APY: ${option.apy}`
    });
  };

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">AirNode Marketplace</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid grid-cols-3 max-w-md bg-ana-darkblue/50">
              <TabsTrigger value="buy" className="flex items-center gap-2">
                <ShoppingCart size={16} />
                Buy AirNodes
              </TabsTrigger>
              <TabsTrigger value="lending" className="flex items-center gap-2">
                <Wallet size={16} />
                DeFi Services
              </TabsTrigger>
              <TabsTrigger value="myassets" className="flex items-center gap-2">
                <Coins size={16} />
                My Assets
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="mt-6">
              <div className="mb-8">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <Input 
                      type="text" 
                      placeholder="Search AirNodes..." 
                      className="pl-10 bg-ana-darkblue/50 border-ana-purple/20 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] bg-ana-darkblue/50 border-ana-purple/20 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-ana-darkblue border-ana-purple/20 text-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="sold-out">Sold Out</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="roi">
                      <SelectTrigger className="w-[180px] bg-ana-darkblue/50 border-ana-purple/20 text-white">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent className="bg-ana-darkblue border-ana-purple/20 text-white">
                        <SelectItem value="roi">Highest ROI</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2">
                      <Filter size={18} />
                      Filters
                    </Button>
                    <Button type="submit">Search</Button>
                  </div>
                </form>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-ana-darkblue/30 border-ana-purple/20">
                  <CardContent className="p-4">
                    <div className="text-white/60 text-sm">Total AirNodes</div>
                    <div className="text-xl font-bold text-white mt-1">24 Nodes</div>
                  </CardContent>
                </Card>
                <Card className="bg-ana-darkblue/30 border-ana-purple/20">
                  <CardContent className="p-4">
                    <div className="text-white/60 text-sm">Average ROI</div>
                    <div className="text-xl font-bold text-green-400 mt-1">19.8%</div>
                  </CardContent>
                </Card>
                <Card className="bg-ana-darkblue/30 border-ana-purple/20">
                  <CardContent className="p-4">
                    <div className="text-white/60 text-sm">Total Shares</div>
                    <div className="text-xl font-bold text-white mt-1">42,500</div>
                  </CardContent>
                </Card>
                <Card className="bg-ana-darkblue/30 border-ana-purple/20">
                  <CardContent className="p-4">
                    <div className="text-white/60 text-sm">ANA Token Price</div>
                    <div className="text-xl font-bold text-white mt-1">$0.52 <span className="text-green-400 text-sm">+3.8%</span></div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {airNodes.map((node) => (
                  <AirNodeCard key={node.id} {...node} />
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-ana-purple/20">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lending" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white">DeFi Services</h2>
                  <p className="text-white/70 mt-2">
                    Unlock the financial potential of your AirNode NFTs and ANA tokens
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {lendingOptions.map(option => (
                    <Card 
                      key={option.id} 
                      className="bg-ana-darkblue/30 border-ana-purple/20 hover:border-ana-purple/50 transition-all cursor-pointer"
                      onClick={() => handleLendingCardClick(option)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          {option.icon}
                          <div className="bg-green-500/20 text-green-400 font-medium px-2 py-1 rounded text-sm">
                            {option.apy} APY
                          </div>
                        </div>
                        <CardTitle className="text-white mt-3">{option.title}</CardTitle>
                        <CardDescription className="text-white/70">{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-white/60">Loan-to-Value:</div>
                          <div className="text-white text-right">{option.ltv}</div>
                          
                          <div className="text-white/60">Term:</div>
                          <div className="text-white text-right">{option.term}</div>
                        </div>
                        
                        <Button className="w-full mt-4">Get Started</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-10 p-6 bg-ana-darkblue/30 border border-ana-purple/20 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Coming Soon: Cross-Chain DeFi</h3>
                  <p className="text-white/70 mb-4">
                    We're working on expanding our DeFi capabilities to include cross-chain bridges with Cardano, Ethereum, and other major networks.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">Target Launch: Q2 2024</div>
                    <Button variant="outline">Join Waitlist</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="myassets" className="mt-6">
              <div className="max-w-4xl mx-auto">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Marketplace;

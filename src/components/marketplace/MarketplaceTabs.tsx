
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Wallet, Coins } from "lucide-react";
import { BuyNodesTab } from "./tabs/BuyNodesTab";
import { DeFiServicesTab } from "./tabs/DeFiServicesTab";
import { MyAssetsTab } from "./tabs/MyAssetsTab";

interface AirNode {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  totalShares: number;
  availableShares: number;
  performance: {
    uptime: number;
    earnings: number;
    roi: number;
  };
}

interface LendingOption {
  id: string;
  title: string;
  description: string;
  apy: string;
  ltv: string;
  term: string;
  icon: React.ReactNode;
}

interface MyAssets {
  airNodes: Array<{
    name: string;
    shares: number;
    value: number;
    earnings: number;
    roi: number;
  }>;
  tokens: {
    ana: number;
    anaStaked: number;
    usdc: number;
  };
  totalValue: number;
}

interface MarketplaceTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  airNodes: AirNode[];
  lendingOptions: LendingOption[];
  myAssets: MyAssets;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MarketplaceTabs: React.FC<MarketplaceTabsProps> = ({
  activeTab,
  setActiveTab,
  airNodes,
  lendingOptions,
  myAssets,
  searchQuery,
  setSearchQuery
}) => {
  return (
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
        <BuyNodesTab 
          airNodes={airNodes} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
      </TabsContent>
      
      <TabsContent value="lending" className="mt-6">
        <DeFiServicesTab lendingOptions={lendingOptions} />
      </TabsContent>
      
      <TabsContent value="myassets" className="mt-6">
        <MyAssetsTab myAssets={myAssets} />
      </TabsContent>
    </Tabs>
  );
};

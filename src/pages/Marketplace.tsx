import { useState } from "react";
import { TrendingUp, ShoppingCart, Wallet, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { MarketplaceTabs } from "@/components/marketplace/MarketplaceTabs";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  
  const airNodes = [
    {
      id: "portal-180",
      name: "Portal 180",
      location: "Nairobi, Kenya",
      price: 45,
      imageUrl: "/lovable-uploads/78b9f6e7-7cb9-4dde-bf66-626db696648e.png",
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
      imageUrl: "/lovable-uploads/ef6746ba-fca0-41a8-9d07-a5c6be9b39be.png",
      totalShares: 1000,
      availableShares: 600,
      performance: {
        uptime: 98.7,
        earnings: 2.9,
        roi: 19.2
      }
    },
    {
      id: "apex-90",
      name: "Apex 90",
      price: 75,
      location: "Addis Ababa, Ethiopia",
      imageUrl: "/lovable-uploads/bc07f14e-3203-4583-bb34-75f3df7cd404.png",
      totalShares: 2000,
      availableShares: 1200,
      performance: {
        uptime: 99.8,
        earnings: 3.6,
        roi: 22.4
      }
    },
    {
      id: "apex-180",
      name: "Apex 180",
      price: 80,
      location: "Kampala, Uganda",
      imageUrl: "/lovable-uploads/085aaa1a-3bf1-45a6-a24d-6a133c1b27fe.png",
      totalShares: 2000,
      availableShares: 1800,
      performance: {
        uptime: 97.9,
        earnings: 3.2,
        roi: 20.1
      }
    },
    {
      id: "titan",
      name: "Titan",
      price: 95,
      location: "Cairo, Egypt",
      imageUrl: "/lovable-uploads/ab0fd33f-b255-4496-a801-bb79f6998fa2.png",
      totalShares: 1500,
      availableShares: 900,
      performance: {
        uptime: 99.5,
        earnings: 4.1,
        roi: 24.3
      }
    },
    {
      id: "link",
      name: "Link",
      price: 55,
      location: "Accra, Ghana",
      imageUrl: "/lovable-uploads/42174bda-cb41-437d-a558-07fd1577f8ee.png",
      totalShares: 1200,
      availableShares: 750,
      performance: {
        uptime: 98.3,
        earnings: 2.8,
        roi: 17.9
      }
    }
  ];

  const lendingOptions = [
    { 
      id: "loan-1", 
      title: "AirNode-Backed Loan", 
      description: "Borrow stablecoins using your AirNode shares as collateral",
      apy: "4.5%",
      ltv: "70%",
      term: "1-12 months",
      icon: <Wallet className="h-10 w-10 text-white" />
    },
    { 
      id: "loan-2", 
      title: "Yield Farming", 
      description: "Provide liquidity with your ANA tokens and earn enhanced yields",
      apy: "16%",
      ltv: "N/A",
      term: "Flexible",
      icon: <Coins className="h-10 w-10 text-white" />
    },
    { 
      id: "loan-3", 
      title: "ANA Staking", 
      description: "Stake your ANA tokens to earn rewards and increase governance voting power",
      apy: "12%",
      ltv: "N/A",
      term: "30/90/180 days",
      icon: <TrendingUp className="h-10 w-10 text-white" />
    }
  ];

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header - White Section */}
          <div className="mb-8 bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-2">AirNode Marketplace</h1>
            <p className="text-gray-600">Discover and invest in telecommunications infrastructure</p>
          </div>
          
          {/* Marketplace Introduction - White Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Welcome to the Marketplace</h2>
            <p className="text-gray-600 mb-6">
              Explore our curated selection of AirNode investments and DeFi services. Each AirNode represents 
              real telecommunications infrastructure generating revenue from network usage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-black">24</div>
                <div className="text-gray-600">Active AirNodes</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">19.8%</div>
                <div className="text-gray-600">Average ROI</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-black">$0.52</div>
                <div className="text-gray-600">ANA Token Price</div>
              </div>
            </div>
          </div>
          
          {/* Marketplace Features - White Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-black mb-6">Marketplace Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-black mx-auto mb-2" />
                <h4 className="font-medium text-black">Buy AirNodes</h4>
                <p className="text-sm text-gray-600">Purchase fractional shares</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Wallet className="h-8 w-8 text-black mx-auto mb-2" />
                <h4 className="font-medium text-black">DeFi Services</h4>
                <p className="text-sm text-gray-600">Lending and staking options</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="h-8 w-8 text-black mx-auto mb-2" />
                <h4 className="font-medium text-black">Track Performance</h4>
                <p className="text-sm text-gray-600">Monitor your investments</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Coins className="h-8 w-8 text-black mx-auto mb-2" />
                <h4 className="font-medium text-black">Earn Rewards</h4>
                <p className="text-sm text-gray-600">Monthly passive income</p>
              </div>
            </div>
          </div>
          
          {/* Marketplace Tabs - Dark Section */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            <MarketplaceTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              airNodes={airNodes}
              lendingOptions={lendingOptions}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Marketplace;

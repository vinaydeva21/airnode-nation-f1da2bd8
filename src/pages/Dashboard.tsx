
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import AuthCheck from "@/components/dashboard/AuthCheck";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import PortfolioGrowthChart from "@/components/dashboard/PortfolioGrowthChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Globe, TrendingUp, Users } from "lucide-react";
import { MarketplaceStats } from "@/components/marketplace/MarketplaceStats";

const Dashboard = () => {
  const userShares = [
    {
      id: "portal-180",
      name: "Portal 180",
      location: "Nairobi, Kenya",
      owned: 50,
      totalShares: 1000,
      value: 2250,
      imageUrl: "/lovable-uploads/944059d9-4b2a-4ce4-a703-1df8d972e858.png",
    },
    {
      id: "portal-360",
      name: "Portal 360",
      location: "Lagos, Nigeria",
      owned: 25,
      totalShares: 1000,
      value: 1500,
      imageUrl: "/lovable-uploads/b43073b7-44b5-4631-b30f-dc3671d1e301.png",
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: "Reward", 
      amount: "$12.50", 
      date: "Today, 2:30 PM", 
      status: "Completed" 
    },
    { 
      id: 2, 
      type: "Purchase", 
      amount: "$1,500.00", 
      date: "Yesterday", 
      status: "Completed" 
    },
    { 
      id: 3, 
      type: "Vote", 
      proposal: "Treasury Expansion", 
      date: "3 days ago", 
      status: "Completed" 
    },
  ];

  return (
    <AuthCheck>
      <NetworkBackground>
        <Navbar />
        
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <DashboardHeader />
            
            {/* Network Overview */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe size={18} className="text-ana-purple" />
                  Network Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MarketplaceStats />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-ana-darkblue/30 border border-ana-purple/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={18} className="text-ana-purple" />
                      <h3 className="text-white font-medium">Network Activity</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">987 Txns</p>
                    <p className="text-sm text-white/60">Last 24 hours</p>
                  </div>
                  
                  <div className="bg-ana-darkblue/30 border border-ana-purple/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={18} className="text-ana-purple" />
                      <h3 className="text-white font-medium">Active Users</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">3,482</p>
                    <p className="text-sm text-white/60">+12% this week</p>
                  </div>
                  
                  <div className="bg-ana-darkblue/30 border border-ana-purple/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={18} className="text-ana-purple" />
                      <h3 className="text-white font-medium">Protocol Growth</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">23.5%</p>
                    <p className="text-sm text-white/60">Month-over-month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-bold text-white mb-4">Your Personal Dashboard</h2>
            <StatsCards />
            <PortfolioGrowthChart />
            <DashboardTabs userShares={userShares} recentActivities={recentActivities} />
          </div>
        </div>
        
        <Footer />
      </NetworkBackground>
    </AuthCheck>
  );
};

export default Dashboard;

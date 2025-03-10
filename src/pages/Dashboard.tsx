
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import AuthCheck from "@/components/dashboard/AuthCheck";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

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
            <StatsCards />
            <DashboardTabs userShares={userShares} recentActivities={recentActivities} />
          </div>
        </div>
        
        <Footer />
      </NetworkBackground>
    </AuthCheck>
  );
};

export default Dashboard;

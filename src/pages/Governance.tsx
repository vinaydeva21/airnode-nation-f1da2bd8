
import { useState } from "react";
import { Vote, TrendingUp, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveProposalsTab } from "@/components/governance/ActiveProposalsTab";
import { RecentProposalsTab } from "@/components/governance/RecentProposalsTab";
import { MyVotesTab } from "@/components/governance/MyVotesTab";
import { TreasuryTab } from "@/components/governance/TreasuryTab";
import { GovernanceStats } from "@/components/governance/GovernanceStats";

const Governance = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header - Dark Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
            <p className="text-gray-300">Participate in DAO governance and shape the future of AirNode Alliance</p>
          </div>
          
          {/* Governance Stats - White Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Governance Overview</h2>
            <GovernanceStats />
          </div>

          {/* Governance Tabs - Dark Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 max-w-2xl bg-black/50 mb-6">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Vote size={16} />
                Active
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <TrendingUp size={16} />
                Recent
              </TabsTrigger>
              <TabsTrigger value="my-votes" className="flex items-center gap-2">
                <Users size={16} />
                My Votes
              </TabsTrigger>
              <TabsTrigger value="treasury" className="flex items-center gap-2">
                <DollarSign size={16} />
                Treasury
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <ActiveProposalsTab />
            </TabsContent>
            
            <TabsContent value="recent">
              <RecentProposalsTab />
            </TabsContent>
            
            <TabsContent value="my-votes">
              <MyVotesTab />
            </TabsContent>
            
            <TabsContent value="treasury">
              <TreasuryTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Governance;

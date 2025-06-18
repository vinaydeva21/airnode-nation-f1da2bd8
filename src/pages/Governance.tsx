
import { useState } from "react";
import { Vote, TrendingUp, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveProposalsTab from "@/components/governance/ActiveProposalsTab";
import RecentProposalsTab from "@/components/governance/RecentProposalsTab";
import MyVotesTab from "@/components/governance/MyVotesTab";
import TreasuryTab from "@/components/governance/TreasuryTab";
import GovernanceStats from "@/components/governance/GovernanceStats";

const Governance = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Mock data for demonstration
  const mockStats = {
    activeProposals: 3,
    participationRate: 67,
    votingPower: 1250
  };

  const mockActiveProposals = [
    {
      id: "1",
      title: "Increase AirNode Coverage in Urban Areas",
      description: "Proposal to expand AirNode deployment in major metropolitan areas to improve network coverage.",
      votesFor: 1200,
      votesAgainst: 450,
      abstain: 100,
      totalVotes: 1750,
      threshold: 60,
      endTime: "2 days left",
      status: "Active" as const,
      category: "Infrastructure"
    }
  ];

  const mockRecentProposals = [
    {
      id: "2", 
      title: "Treasury Allocation for Q2 2024",
      description: "Quarterly treasury fund allocation proposal.",
      votesFor: 2100,
      votesAgainst: 300,
      totalVotes: 2400,
      threshold: 60,
      endTime: "Ended March 15, 2024",
      status: "Passed" as const,
      category: "Treasury"
    }
  ];

  const mockVotes = [
    {
      proposalId: "2",
      proposalTitle: "Treasury Allocation for Q2 2024", 
      vote: "For" as const,
      timestamp: new Date("2024-03-12")
    }
  ];

  const mockTreasuryData = {
    totalBalance: 2500000,
    allocation: {
      newAirNodes: 40,
      rewards: 35, 
      operations: 15,
      reserve: 10
    },
    recentTransactions: [
      {
        id: "1",
        description: "AirNode deployment rewards",
        amount: 50000,
        date: "2024-03-15"
      },
      {
        id: "2", 
        description: "Network operations",
        amount: -15000,
        date: "2024-03-14"
      }
    ]
  };

  const handleVote = (proposalId: string, voteType: "For" | "Against" | "Abstain") => {
    console.log(`Voting ${voteType} on proposal ${proposalId}`);
    // Handle voting logic here
  };

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header - White Section */}
          <div className="mb-8 bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-2">Governance</h1>
            <p className="text-gray-600">Participate in DAO governance and shape the future of AirNode Alliance</p>
          </div>
          
          {/* Governance Stats - White Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Governance Overview</h2>
            <GovernanceStats 
              activeProposals={mockStats.activeProposals}
              participationRate={mockStats.participationRate}
              votingPower={mockStats.votingPower}
            />
          </div>

          {/* Governance Tabs - White Section */}
          <div className="bg-white rounded-lg p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 max-w-2xl bg-gray-100 mb-6">
                <TabsTrigger value="active" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <Vote size={16} />
                  Active
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <TrendingUp size={16} />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="my-votes" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <Users size={16} />
                  My Votes
                </TabsTrigger>
                <TabsTrigger value="treasury" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <DollarSign size={16} />
                  Treasury
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <ActiveProposalsTab proposals={mockActiveProposals} onVote={handleVote} />
              </TabsContent>
              
              <TabsContent value="recent">
                <RecentProposalsTab proposals={mockRecentProposals} />
              </TabsContent>
              
              <TabsContent value="my-votes">
                <MyVotesTab votes={mockVotes} />
              </TabsContent>
              
              <TabsContent value="treasury">
                <TreasuryTab treasuryData={mockTreasuryData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Governance;

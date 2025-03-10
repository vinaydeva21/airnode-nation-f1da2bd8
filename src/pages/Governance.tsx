import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ProposalForm from "@/components/ProposalForm";
import { toast } from "sonner";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Users, 
  BarChart3, 
  ThumbsUp, 
  ThumbsDown, 
  Ban
} from "lucide-react";

// Type definitions
interface Proposal {
  id: string;
  title: string;
  description?: string;
  status: "Active" | "Passed" | "Rejected" | "Pending";
  endTime: string;
  votesFor: number;
  votesAgainst: number;
  abstain?: number;
  totalVotes: number;
  threshold: number;
  category?: string;
  createdAt?: Date;
}

interface Vote {
  proposalId: string;
  proposalTitle: string;
  vote: "For" | "Against" | "Abstain";
  timestamp: Date;
}

const Governance = () => {
  // State for proposals
  const [activeProposals, setActiveProposals] = useState<Proposal[]>([
    {
      id: "prop-001",
      title: "Increase Treasury Allocation for New AirNodes",
      description: "Proposal to increase treasury allocation for purchasing new AirNodes from 20% to 30% of monthly revenue.",
      status: "Active",
      endTime: "3 days left",
      votesFor: 65,
      votesAgainst: 15,
      abstain: 20,
      totalVotes: 100,
      threshold: 51,
      category: "treasury",
    },
    {
      id: "prop-002",
      title: "Reduce Staking Lock Period",
      description: "Reduce the minimum staking lock period from 90 days to 60 days to increase liquidity.",
      status: "Active",
      endTime: "5 days left",
      votesFor: 40,
      votesAgainst: 35,
      abstain: 10,
      totalVotes: 85,
      threshold: 51,
      category: "governance",
    },
  ]);

  const [recentProposals, setRecentProposals] = useState<Proposal[]>([
    {
      id: "prop-000",
      title: "Add Support for Layer 2 Solutions",
      status: "Passed",
      endTime: "Ended 2 days ago",
      votesFor: 82,
      votesAgainst: 8,
      totalVotes: 90,
      threshold: 51,
      category: "technical",
    },
    {
      id: "prop-00a",
      title: "Introduce Tiered Reward Structure",
      status: "Rejected",
      endTime: "Ended 1 week ago",
      votesFor: 30,
      votesAgainst: 60,
      totalVotes: 90,
      threshold: 51,
      category: "treasury",
    },
  ]);

  // State for votes
  const [myVotes, setMyVotes] = useState<Vote[]>([
    {
      proposalId: "prop-000",
      proposalTitle: "Add Support for Layer 2 Solutions",
      vote: "For",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    }
  ]);

  // State for wallet and proposal form
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  
  // Mock treasury data
  const treasuryData = {
    totalBalance: 2450000,
    allocation: {
      newAirNodes: 25,
      rewards: 45,
      operations: 20,
      reserve: 10,
    },
    recentTransactions: [
      { 
        id: "tx-001", 
        description: "Monthly rewards distribution", 
        amount: -125000, 
        date: "Dec 01, 2023" 
      },
      { 
        id: "tx-002", 
        description: "New AirNode acquisition", 
        amount: -350000, 
        date: "Nov 15, 2023" 
      },
      { 
        id: "tx-003", 
        description: "Revenue from existing AirNodes", 
        amount: 425000, 
        date: "Nov 01, 2023" 
      },
    ]
  };
  
  // Handle voting
  const handleVote = (proposalId: string, voteType: "For" | "Against" | "Abstain") => {
    setActiveProposals(prevProposals => 
      prevProposals.map(proposal => {
        if (proposal.id === proposalId) {
          const updatedProposal = { ...proposal };
          
          if (voteType === "For") {
            updatedProposal.votesFor += 1;
          } else if (voteType === "Against") {
            updatedProposal.votesAgainst += 1;
          } else if (voteType === "Abstain" && updatedProposal.abstain !== undefined) {
            updatedProposal.abstain += 1;
          }
          
          updatedProposal.totalVotes += 1;
          return updatedProposal;
        }
        return proposal;
      })
    );
    
    const votedProposal = activeProposals.find(p => p.id === proposalId);
    if (votedProposal) {
      setMyVotes(prev => [
        ...prev,
        {
          proposalId,
          proposalTitle: votedProposal.title,
          vote: voteType,
          timestamp: new Date(),
        }
      ]);
      
      toast.success(`Vote cast: ${voteType}`, {
        description: `You voted on "${votedProposal.title.substring(0, 30)}..."`,
      });
    }
  };
  
  // Handle proposal creation
  const handleCreateProposal = (newProposal: Proposal) => {
    setActiveProposals(prev => [newProposal, ...prev]);
  };
  
  // Simulated wallet connection effect
  useEffect(() => {
    const checkWalletStatus = () => {
      setIsWalletConnected(true);
    };
    
    const timer = setTimeout(checkWalletStatus, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Governance</h1>
              <p className="text-white/70">Shape the future of AirNode Alliance</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <Button onClick={() => setShowProposalForm(true)} className="flex gap-2">
                <FileText size={16} />
                Create Proposal
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">14</div>
                  <div className="text-sm text-white/70">Active Proposals</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">78%</div>
                  <div className="text-sm text-white/70">Governance Participation</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">3,250</div>
                  <div className="text-sm text-white/70">Your Voting Power</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="active" className="mt-8">
            <TabsList className="bg-ana-darkblue/50 border border-ana-purple/20">
              <TabsTrigger value="active" className="gap-2">
                <Clock size={14} />
                Active Proposals
              </TabsTrigger>
              <TabsTrigger value="recent" className="gap-2">
                <CheckCircle size={14} />
                Recent Proposals
              </TabsTrigger>
              <TabsTrigger value="my" className="gap-2">
                <Users size={14} />
                My Votes
              </TabsTrigger>
              <TabsTrigger value="treasury" className="gap-2">
                <BarChart3 size={14} />
                Treasury
              </TabsTrigger>
            </TabsList>
            
            {/* Active Proposals Tab */}
            <TabsContent value="active" className="mt-6">
              <div className="space-y-6">
                {activeProposals.map((proposal) => (
                  <Card key={proposal.id} className="glass-card overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-white">{proposal.title}</CardTitle>
                            {proposal.category && (
                              <Badge variant="outline" className="bg-ana-darkblue/50 border-ana-purple/30 ml-2">
                                {proposal.category}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-white/70 mt-1">
                            {proposal.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-ana-blue/10 border-ana-blue/30 text-white flex items-center gap-1 h-fit whitespace-nowrap">
                          <Clock size={14} />
                          {proposal.endTime}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Current Votes</span>
                            <span className="text-white">
                              {Math.round((proposal.votesFor / proposal.totalVotes) * 100) || 0}% For |  
                              {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100) || 0}% Against |  
                              {Math.round(((proposal.abstain || 0) / proposal.totalVotes) * 100) || 0}% Abstain
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex h-2 overflow-hidden text-xs rounded-full bg-ana-darkblue">
                              <div
                                style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100 || 0}%` }}
                                className="bg-green-500 transition-all"
                              ></div>
                              <div
                                style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100 || 0}%` }}
                                className="bg-red-500 transition-all"
                              ></div>
                              <div
                                style={{ width: `${((proposal.abstain || 0) / proposal.totalVotes) * 100 || 0}%` }}
                                className="bg-gray-500 transition-all"
                              ></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-start">
                              <div 
                                className="h-full w-[2px] bg-white"
                                style={{ left: `${proposal.threshold}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-white/50">0%</span>
                            <span className="text-white/50">Threshold: {proposal.threshold}%</span>
                            <span className="text-white/50">100%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-2">
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2"
                            onClick={() => handleVote(proposal.id, "Against")}
                          >
                            <ThumbsDown size={16} />
                            Vote Against
                          </Button>
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-gray-500/30 text-gray-400 hover:bg-gray-500/10 hover:text-gray-300 gap-2"
                            onClick={() => handleVote(proposal.id, "Abstain")}
                          >
                            <Ban size={16} />
                            Abstain
                          </Button>
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 gap-2"
                            onClick={() => handleVote(proposal.id, "For")}
                          >
                            <ThumbsUp size={16} />
                            Vote For
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Recent Proposals Tab */}
            <TabsContent value="recent" className="mt-6">
              <div className="space-y-6">
                {recentProposals.map((proposal) => (
                  <Card key={proposal.id} className="glass-card overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-white">{proposal.title}</CardTitle>
                            {proposal.category && (
                              <Badge variant="outline" className="bg-ana-darkblue/50 border-ana-purple/30 ml-2">
                                {proposal.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            proposal.status === "Passed" 
                              ? "bg-green-500/10 border-green-500/30" 
                              : "bg-red-500/10 border-red-500/30"
                          } text-white flex items-center gap-1 h-fit`}
                        >
                          {proposal.status === "Passed" ? (
                            <CheckCircle size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {proposal.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Final Results</span>
                            <span className="text-white">
                              {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}% For |  
                              {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}% Against
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex h-2 overflow-hidden text-xs rounded-full bg-ana-darkblue">
                              <div
                                style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                                className="bg-green-500"
                              ></div>
                              <div
                                style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                                className="bg-red-500"
                              ></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-start">
                              <div 
                                className="h-full w-[2px] bg-white"
                                style={{ left: `${proposal.threshold}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs mt-2">
                            <span className="text-white/50">{proposal.endTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* My Votes Tab */}
            <TabsContent value="my" className="mt-6">
              {myVotes.length > 0 ? (
                <div className="space-y-4">
                  {myVotes.map((vote, index) => (
                    <Card key={`${vote.proposalId}-${index}`} className="glass-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-white">{vote.proposalTitle}</h3>
                            <p className="text-sm text-white/70">
                              {vote.timestamp.toLocaleDateString()} at {vote.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge 
                            className={`${
                              vote.vote === "For" ? "bg-green-500/20" :
                              vote.vote === "Against" ? "bg-red-500/20" : "bg-gray-500/20"
                            } text-white`}
                          >
                            {vote.vote === "For" && <ThumbsUp size={14} className="mr-1" />}
                            {vote.vote === "Against" && <ThumbsDown size={14} className="mr-1" />}
                            {vote.vote === "Abstain" && <Ban size={14} className="mr-1" />}
                            {vote.vote}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-white">My Voting History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle size={40} className="mx-auto mb-4 text-white/30" />
                      <p className="text-white/70">You haven't voted on any proposals yet.</p>
                      <p className="text-white/50 text-sm mt-2">Active proposals can be found in the "Active Proposals" tab.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Treasury Tab */}
            <TabsContent value="treasury" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Treasury Overview</CardTitle>
                    <CardDescription className="text-white/70">
                      Current balance and fund allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-1">${treasuryData.totalBalance.toLocaleString()}</h3>
                      <p className="text-sm text-white/70">Total treasury balance</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Fund Allocation</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">New AirNodes</span>
                            <span className="text-white">{treasuryData.allocation.newAirNodes}%</span>
                          </div>
                          <Progress value={treasuryData.allocation.newAirNodes} className="h-2 bg-ana-darkblue" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Rewards Distribution</span>
                            <span className="text-white">{treasuryData.allocation.rewards}%</span>
                          </div>
                          <Progress value={treasuryData.allocation.rewards} className="h-2 bg-ana-darkblue" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Operations</span>
                            <span className="text-white">{treasuryData.allocation.operations}%</span>
                          </div>
                          <Progress value={treasuryData.allocation.operations} className="h-2 bg-ana-darkblue" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Reserve</span>
                            <span className="text-white">{treasuryData.allocation.reserve}%</span>
                          </div>
                          <Progress value={treasuryData.allocation.reserve} className="h-2 bg-ana-darkblue" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {treasuryData.recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-start pb-3 border-b border-ana-purple/20">
                          <div>
                            <p className="text-white text-sm font-medium">{tx.description}</p>
                            <p className="text-white/50 text-xs">{tx.date}</p>
                          </div>
                          <span className={`font-mono ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <ProposalForm 
        open={showProposalForm} 
        onClose={() => setShowProposalForm(false)}
        onSubmit={handleCreateProposal}
      />
      
      <Footer />
    </NetworkBackground>
  );
};

export default Governance;


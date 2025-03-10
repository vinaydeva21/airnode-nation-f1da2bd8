
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const Governance = () => {
  const activeProposals = [
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
    },
  ];

  const recentProposals = [
    {
      id: "prop-000",
      title: "Add Support for Layer 2 Solutions",
      status: "Passed",
      endTime: "Ended 2 days ago",
      votesFor: 82,
      votesAgainst: 8,
      totalVotes: 90,
      threshold: 51,
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
    },
  ];

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
            <Button>Create Proposal</Button>
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
              <TabsTrigger value="active">Active Proposals</TabsTrigger>
              <TabsTrigger value="recent">Recent Proposals</TabsTrigger>
              <TabsTrigger value="my">My Votes</TabsTrigger>
              <TabsTrigger value="treasury">Treasury</TabsTrigger>
            </TabsList>
            
            {/* Active Proposals Tab */}
            <TabsContent value="active" className="mt-6">
              <div className="space-y-6">
                {activeProposals.map((proposal) => (
                  <Card key={proposal.id} className="glass-card overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-white">{proposal.title}</CardTitle>
                          <CardDescription className="text-white/70">
                            {proposal.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-ana-blue/10 border-ana-blue/30 text-white flex items-center gap-1 h-fit">
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
                              {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}% For |  
                              {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}% Against |  
                              {Math.round((proposal.abstain / proposal.totalVotes) * 100)}% Abstain
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex h-2 overflow-hidden text-xs rounded-full bg-ana-darkblue">
                              <div
                                style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                                className="bg-green-500 transition-all"
                              ></div>
                              <div
                                style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                                className="bg-red-500 transition-all"
                              ></div>
                              <div
                                style={{ width: `${(proposal.abstain / proposal.totalVotes) * 100}%` }}
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
                          <Button variant="outline" className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                            Vote Against
                          </Button>
                          <Button variant="outline" className="bg-transparent border-gray-500/30 text-gray-400 hover:bg-gray-500/10 hover:text-gray-300">
                            Abstain
                          </Button>
                          <Button variant="outline" className="bg-transparent border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
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
                          <CardTitle className="text-white">{proposal.title}</CardTitle>
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
            
            {/* Placeholder for other tabs */}
            <TabsContent value="my" className="mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">My Voting History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">Your voting history will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="treasury" className="mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">Treasury Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">Treasury allocation and statistics will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Governance;

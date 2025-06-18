
import { useState } from "react";
import { TrendingUp, Wallet, Users, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const portfolioData = {
    totalValue: 15420.50,
    monthlyEarnings: 312.40,
    totalShares: 47,
    roi: 20.5
  };

  const myAirNodes = [
    { name: "Portal 180", shares: 15, value: 675, monthlyEarnings: 112.50, roi: 20.0 },
    { name: "Nexus I", shares: 20, value: 1500, monthlyEarnings: 120.00, roi: 9.6 },
    { name: "Portal 360", shares: 12, value: 720, monthlyEarnings: 79.90, roi: 13.3 }
  ];

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header - White Section */}
          <div className="mb-8 bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your AirNode portfolio and track performance</p>
          </div>
          
          {/* Portfolio Overview - White Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Portfolio Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Total Portfolio Value</CardDescription>
                  <CardTitle className="text-2xl text-black">${portfolioData.totalValue.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Monthly Earnings</CardDescription>
                  <CardTitle className="text-2xl text-green-600">${portfolioData.monthlyEarnings}</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Total Shares</CardDescription>
                  <CardTitle className="text-2xl text-black">{portfolioData.totalShares}</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Average ROI</CardDescription>
                  <CardTitle className="text-2xl text-black">{portfolioData.roi}%</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Dashboard Tabs - White Section */}
          <div className="bg-white rounded-lg p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 max-w-2xl bg-gray-100 mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <TrendingUp size={16} />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="assets" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <Wallet size={16} />
                  My Assets
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <Users size={16} />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 text-black data-[state=active]:bg-white data-[state=active]:text-black">
                  <Settings size={16} />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {/* My AirNodes - White Section */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-black mb-6">My AirNodes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-black">AirNode</th>
                          <th className="text-center py-3 text-black">Shares</th>
                          <th className="text-center py-3 text-black">Value</th>
                          <th className="text-center py-3 text-black">Monthly Earnings</th>
                          <th className="text-center py-3 text-black">ROI</th>
                          <th className="text-right py-3 text-black">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myAirNodes.map((node, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-4 text-black">{node.name}</td>
                            <td className="py-4 text-center text-black">{node.shares}</td>
                            <td className="py-4 text-center text-black">${node.value}</td>
                            <td className="py-4 text-center text-green-600">${node.monthlyEarnings}</td>
                            <td className="py-4 text-center text-black">{node.roi}%</td>
                            <td className="py-4 text-right">
                              <Button variant="outline" size="sm" className="mr-2 border-black text-black hover:bg-black hover:text-white">
                                Sell
                              </Button>
                              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="assets">
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">Asset Management</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage your token holdings and staking positions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Asset management features coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-600">
                      Track your recent transactions and earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Activity tracking features coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">Account Settings</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage your account preferences and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Dashboard;

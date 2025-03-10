
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import AirNodeCard from "@/components/AirNodeCard";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const airNodes = [
    {
      id: "portal-180",
      name: "Portal 180",
      location: "Nairobi, Kenya",
      price: 45,
      imageUrl: "/lovable-uploads/a87b7206-f007-4408-81b9-e12a3723f7f4.png",
      totalShares: 1000,
      availableShares: 850,
    },
    {
      id: "portal-360",
      name: "Portal 360",
      location: "Lagos, Nigeria",
      price: 60,
      imageUrl: "/lovable-uploads/a87b7206-f007-4408-81b9-e12a3723f7f4.png",
      totalShares: 1000,
      availableShares: 600,
    },
    {
      id: "nexus-1",
      name: "Nexus I",
      price: 75,
      location: "Addis Ababa, Ethiopia",
      imageUrl: "/lovable-uploads/a87b7206-f007-4408-81b9-e12a3723f7f4.png",
      totalShares: 2000,
      availableShares: 1200,
    },
    {
      id: "nexus-2",
      name: "Nexus II",
      price: 80,
      location: "Kampala, Uganda",
      imageUrl: "/lovable-uploads/a87b7206-f007-4408-81b9-e12a3723f7f4.png",
      totalShares: 2000,
      availableShares: 1800,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <NetworkBackground>
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">AirNode Marketplace</h1>
          
          {/* Search and Filter */}
          <div className="mb-10">
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
                <Button variant="outline" className="gap-2">
                  <Filter size={18} />
                  Filters
                </Button>
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
          
          {/* AirNode Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airNodes.map((node) => (
              <AirNodeCard key={node.id} {...node} />
            ))}
          </div>
          
          {/* Pagination (Simplified) */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-ana-purple/20">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Marketplace;

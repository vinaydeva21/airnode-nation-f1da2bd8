
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetsTab from "./AssetsTab";
import ActivityTab from "./ActivityTab";
import PlaceholderTab from "./PlaceholderTab";

interface Asset {
  id: string;
  name: string;
  location: string;
  owned: number;
  totalShares: number;
  value: number;
  imageUrl: string;
}

interface Activity {
  id: number;
  type: string;
  amount?: string;
  proposal?: string;
  date: string;
  status: string;
}

interface DashboardTabsProps {
  userShares: Asset[];
  recentActivities: Activity[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ userShares, recentActivities }) => {
  return (
    <Tabs defaultValue="assets" className="mt-8">
      <TabsList className="bg-ana-darkblue/50 border border-ana-purple/20">
        <TabsTrigger value="assets">My Assets</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="rewards">Rewards</TabsTrigger>
        <TabsTrigger value="governance">Governance</TabsTrigger>
      </TabsList>
      
      {/* Assets Tab */}
      <TabsContent value="assets" className="mt-6">
        <AssetsTab assets={userShares} />
      </TabsContent>
      
      {/* Activity Tab */}
      <TabsContent value="activity" className="mt-6">
        <ActivityTab activities={recentActivities} />
      </TabsContent>
      
      {/* Placeholders for other tabs */}
      <TabsContent value="rewards" className="mt-6">
        <PlaceholderTab 
          title="Rewards History" 
          description="Your rewards history and statistics will appear here." 
        />
      </TabsContent>
      
      <TabsContent value="governance" className="mt-6">
        <PlaceholderTab 
          title="Governance Participation" 
          description="Your voting history and active proposals will appear here." 
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

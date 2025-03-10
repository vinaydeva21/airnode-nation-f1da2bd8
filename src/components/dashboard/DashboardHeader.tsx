
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AirNode Alliance Dashboard</h1>
        <p className="text-white/70">Your personal insights and network overview</p>
      </div>
      <Button>
        <Award size={16} className="mr-1" />
        Claim Rewards
      </Button>
    </div>
  );
};

export default DashboardHeader;

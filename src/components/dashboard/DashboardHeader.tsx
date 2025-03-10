
import { Button } from "@/components/ui/button";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="text-white/70">Manage your assets and account</p>
      </div>
      <Button>Claim Rewards</Button>
    </div>
  );
};

export default DashboardHeader;

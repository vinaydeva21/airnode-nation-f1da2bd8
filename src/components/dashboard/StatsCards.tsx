
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Clock, User } from "lucide-react";

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white/70 text-sm font-normal flex items-center gap-2">
            <CircleDollarSign size={16} className="text-ana-purple" />
            Total Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">$3,750.00</div>
          <div className="text-sm text-white/50">+5.2% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white/70 text-sm font-normal flex items-center gap-2">
            <User size={16} className="text-ana-purple" />
            Total Shares Owned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">75</div>
          <div className="text-sm text-white/50">Across 2 AirNodes</div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white/70 text-sm font-normal flex items-center gap-2">
            <Clock size={16} className="text-ana-purple" />
            Pending Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">$150.00</div>
          <div className="text-sm text-white/50">Next distribution: 2 days</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;

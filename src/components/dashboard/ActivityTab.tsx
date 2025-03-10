
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: number;
  type: string;
  amount?: string;
  proposal?: string;
  date: string;
  status: string;
}

interface ActivityTabProps {
  activities: Activity[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center pb-4 border-b border-ana-purple/10">
              <div>
                <div className="font-medium text-white">{activity.type}</div>
                <div className="text-sm text-white/70">
                  {activity.amount || activity.proposal}
                </div>
                <div className="text-xs text-white/50">{activity.date}</div>
              </div>
              <Badge variant="outline" className="bg-ana-purple/10 border-ana-purple/20 text-white">
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab;

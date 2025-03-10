
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderTabProps {
  title: string;
  description: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title, description }) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderTab;

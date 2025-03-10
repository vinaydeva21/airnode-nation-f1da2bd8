
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Asset {
  id: string;
  name: string;
  location: string;
  owned: number;
  totalShares: number;
  value: number;
  imageUrl: string;
}

interface AssetsTabProps {
  assets: Asset[];
}

const AssetsTab: React.FC<AssetsTabProps> = ({ assets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assets.map((asset) => (
        <Card key={asset.id} className="glass-card overflow-hidden">
          <div className="flex">
            <div className="w-1/3">
              <img 
                src={asset.imageUrl}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-semibold text-white">{asset.name}</h3>
              <p className="text-sm text-white/70 mb-2">{asset.location}</p>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Ownership</span>
                  <span className="text-white">{asset.owned}/{asset.totalShares}</span>
                </div>
                <Progress value={(asset.owned / asset.totalShares) * 100} className="h-2 bg-ana-darkblue" />
              </div>
              
              <div className="flex justify-between mt-4">
                <div>
                  <div className="text-sm text-white/70">Value</div>
                  <div className="font-semibold text-white">${asset.value}</div>
                </div>
                <Button size="sm">Manage</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AssetsTab;

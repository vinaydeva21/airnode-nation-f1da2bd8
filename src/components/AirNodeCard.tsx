
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface AirNodeCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  totalShares: number;
  availableShares: number;
  className?: string;
}

const AirNodeCard: React.FC<AirNodeCardProps> = ({
  id,
  name,
  location,
  price,
  imageUrl,
  totalShares,
  availableShares,
  className = "",
}) => {
  return (
    <Card className={`overflow-hidden airnode-card transition-all hover:shadow-lg hover:shadow-ana-purple/10 ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl || "/lovable-uploads/a87b7206-f007-4408-81b9-e12a3723f7f4.png"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-ana-darkblue/80 hover:bg-ana-darkblue border-ana-purple/20 text-white">
            {availableShares}/{totalShares} Available
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-sm text-white/70">{location}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/70">Price</div>
            <div className="text-lg font-semibold text-white">${price}</div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" className="gap-1 bg-transparent border-ana-purple/30 hover:bg-ana-purple/10">
            <Info size={14} />
            Details
          </Button>
          <Button size="sm">Buy Shares</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirNodeCard;

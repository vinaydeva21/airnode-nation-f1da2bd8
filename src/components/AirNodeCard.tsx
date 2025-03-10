
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, ShoppingCart, TrendingUp, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AirNodeCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  totalShares: number;
  availableShares: number;
  className?: string;
  performance?: {
    uptime: number;
    earnings: number;
    roi: number;
  };
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
  performance = {
    uptime: 99.2,
    earnings: 2.4,
    roi: 18.6
  }
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [shareAmount, setShareAmount] = useState(1);
  const [collateralOpen, setCollateralOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  
  const handlePurchase = () => {
    toast.success(`Purchase initiated for ${shareAmount} shares of ${name}`, {
      description: `Total cost: $${(price * shareAmount).toFixed(2)}`,
    });
    setPurchaseOpen(false);
  };
  
  const handleCollateralize = () => {
    toast.success(`Collateralized loan request submitted`, {
      description: `Requested ${loanAmount} USDC against ${name} shares`,
    });
    setCollateralOpen(false);
  };

  return (
    <>
      <Card className={`overflow-hidden airnode-card transition-all hover:shadow-lg hover:shadow-ana-purple/10 ${className}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl || "/placeholder.svg"} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-ana-darkblue/80 hover:bg-ana-darkblue border-ana-purple/20 text-white">
              {availableShares}/{totalShares} Available
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              {performance.uptime}% Uptime
            </Badge>
            <Badge variant="outline" className="bg-ana-purple/20 text-ana-purple border-ana-purple/30">
              {performance.roi}% ROI
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
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 bg-transparent border-ana-purple/30 hover:bg-ana-purple/10"
              onClick={() => setDetailsOpen(true)}
            >
              <Info size={14} />
              Details
            </Button>
            <Button 
              size="sm"
              className="gap-1"
              onClick={() => setPurchaseOpen(true)}
            >
              <ShoppingCart size={14} />
              Buy Shares
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{name} Details</DialogTitle>
            <DialogDescription className="text-white/70">
              AirNode specifications and performance metrics
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-ana-darkblue/50">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/70">Location:</div>
                <div>{location}</div>
                
                <div className="text-white/70">Coverage:</div>
                <div>2.5 km radius</div>
                
                <div className="text-white/70">Technology:</div>
                <div>5G / LoRaWAN</div>
                
                <div className="text-white/70">Installation Date:</div>
                <div>June 2023</div>
                
                <div className="text-white/70">Total Shares:</div>
                <div>{totalShares}</div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/70">Uptime:</div>
                <div className="text-green-400">{performance.uptime}%</div>
                
                <div className="text-white/70">Active Users:</div>
                <div>1,280</div>
                
                <div className="text-white/70">Data Transfer:</div>
                <div>4.8 TB/month</div>
                
                <div className="text-white/70">Maintenance:</div>
                <div className="text-green-400">No issues</div>
              </div>
            </TabsContent>
            
            <TabsContent value="financials" className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/70">Share Price:</div>
                <div>${price}</div>
                
                <div className="text-white/70">Monthly Earnings:</div>
                <div>${performance.earnings}/share</div>
                
                <div className="text-white/70">Annual ROI:</div>
                <div className="text-green-400">{performance.roi}%</div>
                
                <div className="text-white/70">Available Shares:</div>
                <div>{availableShares}</div>
                
                <div className="text-white/70">Collateral Value:</div>
                <div>${(price * 0.7).toFixed(2)}/share</div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 border-ana-purple/30 hover:bg-ana-purple/10"
              onClick={() => {
                setDetailsOpen(false);
                setPurchaseOpen(true);
              }}
            >
              <ShoppingCart size={14} />
              Buy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
              onClick={() => {
                setDetailsOpen(false);
                setCollateralOpen(true);
              }}
            >
              <Lock size={14} />
              Collateralize
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Purchase Dialog */}
      <Dialog open={purchaseOpen} onOpenChange={setPurchaseOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase {name} Shares</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter the number of shares you want to purchase
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Number of Shares</label>
              <Input
                type="number"
                min="1"
                max={availableShares}
                value={shareAmount}
                onChange={(e) => setShareAmount(parseInt(e.target.value) || 1)}
                className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Total Cost</label>
              <div className="p-2 bg-ana-darkblue/30 border border-ana-purple/20 rounded text-right font-semibold">
                ${(price * shareAmount).toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Estimated Monthly Earnings</label>
              <div className="p-2 bg-ana-darkblue/30 border border-green-500/20 rounded text-right font-semibold text-green-400">
                +${(performance.earnings * shareAmount).toFixed(2)}/month
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPurchaseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchase}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Collateralize Dialog */}
      <Dialog open={collateralOpen} onOpenChange={setCollateralOpen}>
        <DialogContent className="bg-ana-darkblue border-ana-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Collateralize {name} Shares</DialogTitle>
            <DialogDescription className="text-white/70">
              Use your shares as collateral to borrow USDC
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Number of Shares to Collateralize</label>
              <Input
                type="number"
                min="1"
                max={5}
                value={shareAmount}
                onChange={(e) => setShareAmount(parseInt(e.target.value) || 1)}
                className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Maximum Loan Value (70% LTV)</label>
              <div className="p-2 bg-ana-darkblue/30 border border-ana-purple/20 rounded text-right font-semibold">
                ${(price * shareAmount * 0.7).toFixed(2)} USDC
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Loan Amount (USDC)</label>
              <Input
                type="number"
                min="1"
                max={(price * shareAmount * 0.7).toFixed(2)}
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/70">Interest Rate</label>
              <div className="p-2 bg-ana-darkblue/30 border border-yellow-500/20 rounded text-right font-semibold">
                4.5% APR
              </div>
            </div>
            
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-yellow-500 text-sm">
              <strong>Note:</strong> If the LTV exceeds 85% due to price fluctuations, your collateral may be liquidated.
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCollateralOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={handleCollateralize}
            >
              Request Loan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AirNodeCard;

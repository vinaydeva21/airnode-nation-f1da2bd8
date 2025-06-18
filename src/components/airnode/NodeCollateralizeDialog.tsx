
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NodeCollateralizeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: {
    id: string;
    name: string;
    price: number;
  };
  shareAmount: number;
  setShareAmount: (amount: number) => void;
}

export const NodeCollateralizeDialog: React.FC<NodeCollateralizeProps> = ({
  open,
  onOpenChange,
  node,
  shareAmount,
  setShareAmount
}) => {
  const [loanAmount, setLoanAmount] = useState("");
  
  const handleCollateralize = () => {
    toast.success(`Collateralized loan request submitted`, {
      description: `Requested ${loanAmount} USDC against ${node.name} shares`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Collateralize {node.name} Shares</DialogTitle>
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
              className="bg-black/50 border-white/30 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white/70">Maximum Loan Value (70% LTV)</label>
            <div className="p-2 bg-black/30 border border-white/20 rounded text-right font-semibold">
              ${(node.price * shareAmount * 0.7).toFixed(2)} USDC
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white/70">Loan Amount (USDC)</label>
            <Input
              type="number"
              min="1"
              max={(node.price * shareAmount * 0.7).toFixed(2)}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="bg-black/50 border-white/30 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white/70">Interest Rate</label>
            <div className="p-2 bg-black/30 border border-white/20 rounded text-right font-semibold">
              4.5% APR
            </div>
          </div>
          
          <div className="p-3 bg-white/10 border border-white/30 rounded-md text-white text-sm">
            <strong>Note:</strong> If the LTV exceeds 85% due to price fluctuations, your collateral may be liquidated.
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-white text-black hover:bg-gray-200"
            onClick={handleCollateralize}
          >
            Request Loan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

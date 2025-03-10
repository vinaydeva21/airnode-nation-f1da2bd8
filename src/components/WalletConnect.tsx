
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthDialog } from "./wallet/AuthDialog";
import { StakingDialog } from "./wallet/StakingDialog";
import { TransactionHistoryDialog } from "./wallet/TransactionHistoryDialog";
import { MyAssetsDialog } from "./wallet/MyAssetsDialog";
import { WalletDropdownMenu } from "./wallet/WalletDropdownMenu";
import { 
  MOCK_WALLETS, 
  MOCK_TRANSACTIONS, 
  DEFAULT_WALLET_ASSETS,
  truncateAddress,
  generateMockAddress
} from "./wallet/WalletData";

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [stakeDialogOpen, setStakeDialogOpen] = useState(false);
  const [transactionHistoryOpen, setTransactionHistoryOpen] = useState(false);
  const [myAssetsDialogOpen, setMyAssetsDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  // Check if user is logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (isLoggedIn) {
      const savedAddress = localStorage.getItem("walletAddress");
      const savedWallet = localStorage.getItem("selectedWallet");
      if (savedAddress && savedWallet) {
        setWalletAddress(savedAddress);
        setSelectedWallet(savedWallet);
        setConnected(true);
      }
    }
  }, []);

  // Mock connect function - in real implementation, this would use actual Web3 wallet providers
  const handleConnect = (walletId: string) => {
    // This would be replaced with actual wallet connection logic
    const mockAddress = generateMockAddress();
    setWalletAddress(mockAddress);
    setConnected(true);
    setSelectedWallet(walletId);
    
    // Store login state in localStorage
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("walletAddress", mockAddress);
    localStorage.setItem("selectedWallet", walletId);

    toast.success(`Connected to ${MOCK_WALLETS.find(w => w.id === walletId)?.name}`, {
      description: `Address: ${truncateAddress(mockAddress)}`,
    });
  };

  const handleDisconnect = () => {
    setWalletAddress("");
    setConnected(false);
    setSelectedWallet("");
    
    // Clear login state from localStorage
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("selectedWallet");
    
    toast.info("Wallet disconnected");
  };

  const handleAuthSuccess = () => {
    // In a real app, this would handle the authentication success flow
    handleConnect("metamask");
  };

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  // We're using a data attribute to make it easier to programmatically trigger this component
  const openAuthDialog = () => {
    setAuthTab("login");
    setAuthDialogOpen(true);
  };

  return (
    <div className={className}>
      <span data-wallet-connect onClick={openAuthDialog} className="hidden" />
      
      {connected && (
        <WalletDropdownMenu
          walletName={MOCK_WALLETS.find(w => w.id === selectedWallet)?.name || "Wallet"}
          address={truncateAddress(walletAddress)}
          anaBalance={DEFAULT_WALLET_ASSETS.tokens.ana}
          stakedAna={DEFAULT_WALLET_ASSETS.tokens.anaStaked}
          pendingRewards={DEFAULT_WALLET_ASSETS.tokens.usdc}
          votingPower={3250}
          onDisconnect={handleDisconnect}
          onAssetsClick={() => setMyAssetsDialogOpen(true)}
          onStakeClick={() => setStakeDialogOpen(true)}
          onHistoryClick={() => setTransactionHistoryOpen(true)}
          onProfileClick={handleProfileClick}
        />
      )}
      
      {/* Authentication Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        activeTab={authTab}
        setActiveTab={setAuthTab}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Staking Dialog */}
      <StakingDialog
        open={stakeDialogOpen}
        onOpenChange={setStakeDialogOpen}
        availableAna={DEFAULT_WALLET_ASSETS.tokens.ana}
      />
      
      {/* Transaction History Dialog */}
      <TransactionHistoryDialog
        open={transactionHistoryOpen}
        onOpenChange={setTransactionHistoryOpen}
        transactions={MOCK_TRANSACTIONS}
      />
      
      {/* My Assets Dialog */}
      <MyAssetsDialog
        open={myAssetsDialogOpen}
        onOpenChange={setMyAssetsDialogOpen}
        airNodes={DEFAULT_WALLET_ASSETS.airNodes}
        tokens={DEFAULT_WALLET_ASSETS.tokens}
        totalValue={DEFAULT_WALLET_ASSETS.totalValue}
        onStakeClick={() => {
          setMyAssetsDialogOpen(false);
          setStakeDialogOpen(true);
        }}
      />
    </div>
  );
};

export default WalletConnect;

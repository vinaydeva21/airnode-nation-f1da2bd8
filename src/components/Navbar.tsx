
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, User } from "lucide-react";
import Logo from "./Logo";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginDialog = () => {
    const walletConnectElement = document.querySelector('[data-wallet-connect]');
    if (walletConnectElement) {
      // Set login mode and click
      (window as any).authTabMode = "login";
      (walletConnectElement as HTMLElement).click();
    }
  };

  const openWalletConnect = () => {
    const walletConnectElement = document.querySelector('[data-wallet-connect]');
    if (walletConnectElement) {
      (walletConnectElement as HTMLElement).click();
    }
  };

  return (
    <nav className="px-4 py-3 bg-ana-darkblue/80 backdrop-blur-md border-b border-ana-purple/20 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-lg font-bold bg-gradient-to-r from-ana-purple to-ana-pink text-transparent bg-clip-text">
            AirNode Alliance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/marketplace" className="text-white/80 hover:text-white transition-colors">
              Marketplace
            </Link>
            <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/governance" className="text-white/80 hover:text-white transition-colors">
              Governance
            </Link>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              onClick={openLoginDialog}
            >
              <User size={16} className="mr-1" />
              Log In
            </Button>
            <Button 
              variant="outline" 
              className="bg-ana-darkblue/50 border-ana-purple/30 text-white"
              onClick={openWalletConnect}
            >
              <Wallet size={16} className="mr-1" />
              Connect Wallet
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-ana-darkblue/95 backdrop-blur-lg border-b border-ana-purple/20 py-4 px-4">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/dashboard" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/governance" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Governance
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="outline" 
                className="w-full bg-ana-darkblue/50 border-ana-purple/30 text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginDialog();
                }}
              >
                <User size={16} className="mr-1" />
                Log In
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-ana-darkblue/50 border-ana-purple/30 text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWalletConnect();
                }}
              >
                <Wallet size={16} className="mr-1" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

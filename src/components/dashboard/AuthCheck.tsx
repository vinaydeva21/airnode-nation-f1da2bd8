
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Check if user is logged in (mock implementation)
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      toast.error("Please log in to access your dashboard", {
        description: "You need to be logged in to view your profile"
      });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <NetworkBackground>
        <Navbar />
        <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <UserX size={48} className="mx-auto mb-4 text-ana-purple" />
            <h1 className="text-2xl font-bold text-white mb-2">Authentication Required</h1>
            <p className="text-white/70 mb-6">Please log in to access your dashboard</p>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </NetworkBackground>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;

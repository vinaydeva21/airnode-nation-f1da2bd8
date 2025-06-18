import { useState } from "react";
import { ArrowRight, Shield, TrendingUp, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Logo from "@/components/Logo";

const Index = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <NetworkBackground>
      <Navbar />
      
      {/* Hero Section - White Background */}
      <section className="pt-24 pb-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <Logo size={120} className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-600 text-transparent bg-clip-text mb-6">
            AirNode Alliance
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Democratizing telecommunications infrastructure through blockchain technology. 
            Own fractionalized shares of real-world AirNodes and earn passive income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-black text-white bg-black hover:bg-gray-800 hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose AirNode Alliance?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Revolutionary infrastructure investment opportunities backed by real-world telecommunications assets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-black/20 bg-black/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-black">Secure Ownership</CardTitle>
                <CardDescription className="text-gray-600">
                  Blockchain-verified fractional ownership of real telecommunications infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-black/20 bg-black/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-black">Passive Income</CardTitle>
                <CardDescription className="text-gray-600">
                  Earn monthly rewards based on AirNode performance and network usage
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-black/20 bg-black/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-black mb-4" />
                <CardTitle className="text-black">Community Governance</CardTitle>
                <CardDescription className="text-gray-600">
                  Vote on network decisions and shape the future of decentralized infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section - White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-black mb-2">24+</div>
              <div className="text-gray-600">Active AirNodes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black mb-2">$2.4M</div>
              <div className="text-gray-600">Total Value Locked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black mb-2">19.8%</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black mb-2">1,280+</div>
              <div className="text-gray-600">Active Investors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to start earning from telecommunications infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-black mb-2">Browse AirNodes</h3>
              <p className="text-gray-600">Explore our marketplace of verified telecommunications infrastructure</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-black mb-2">Purchase Shares</h3>
              <p className="text-gray-600">Buy fractional ownership with our native ANA tokens or stablecoins</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-black mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Receive monthly payments based on AirNode performance and usage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <Globe className="h-16 w-16 text-black mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Join the Future?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Start building your portfolio of telecommunications infrastructure today and be part of the decentralized network revolution.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </NetworkBackground>
  );
};

export default Index;

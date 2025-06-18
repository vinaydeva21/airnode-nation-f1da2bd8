
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: size, 
        height: size 
      }}
    >
      <img 
        src="/lovable-uploads/38c78a16-2a03-41a3-9426-73bde6cd2505.png"
        alt="ANA Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;

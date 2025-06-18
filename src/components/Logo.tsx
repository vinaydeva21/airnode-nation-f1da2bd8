
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
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-gray-400 to-gray-600 animate-pulse-slow"
        style={{ 
          filter: "blur(8px)",
          opacity: 0.7
        }}
      />
      <div 
        className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-gray-300 overflow-hidden flex items-center justify-center"
      >
        <div className="w-3/4 h-3/4 rounded-full bg-black flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-gray-400 to-white" />
        </div>
      </div>
    </div>
  );
};

export default Logo;

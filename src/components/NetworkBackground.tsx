
import React from "react";

interface NetworkBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`network-bg min-h-screen ${className}`}>
      {children}
    </div>
  );
};

export default NetworkBackground;

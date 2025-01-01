import React from "react";

interface AppshellProps {
  children?: React.ReactNode;
}

const Appshell = ({ children }: AppshellProps) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {children}
      </div>
    </div>
  );
};

export default Appshell;

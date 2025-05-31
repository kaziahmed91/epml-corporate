import React from "react";
import Header from "../Header";
import Footer from "../Footer";

interface AppshellProps {
  children?: React.ReactNode;
}

const Appshell = ({ children }: AppshellProps) => {
  return (
    <>
      <Header />
      <main className="w-full">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Appshell;

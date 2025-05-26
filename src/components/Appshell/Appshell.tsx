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
      <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Appshell;

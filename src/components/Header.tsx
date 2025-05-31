"use client";

import { useState } from "react";
import { Menu, XCircle } from "lucide-react";

import Navbar from "./ui/Navbar/Navbar";
import FullScreenNav from "./FullScreenNav";
import { navigationItems } from "@/lib/navigation";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="w-full relative mb-10 mt-10">
        {/* <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]"> */}
        {/* <div className="flex items-center justify-between h-16"> */}

        <div className="hidden lg:flex">
          <Navbar />
        </div>

        {/* Mobile Menu Button */}
        {/* <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label={isNavOpen ? "Close menu" : "Open menu"}
            >
              {isNavOpen ? (
                <XCircle className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button> */}
        {/* </div> */}
        {/* </div> */}
      </header>

      {/* Full Screen Navigation for Mobile */}
      <FullScreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}

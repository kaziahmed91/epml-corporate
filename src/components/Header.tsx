"use client";

import { useState } from "react";
import { Menu, XCircle } from "lucide-react";
import { NavigationMenu } from "./ui/navigation-menu";
import { Logo } from "./ui/logo";
import FullScreenNav from "./FullScreenNav";
import { navigationItems } from "@/lib/navigation";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <NavigationMenu items={navigationItems} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label={isNavOpen ? "Close menu" : "Open menu"}
            >
              {isNavOpen ? (
                <XCircle className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Navigation for Mobile */}
      <FullScreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}

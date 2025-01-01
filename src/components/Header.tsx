"use client";

import { useState } from "react";
import FullScreenNav from "./FullScreenNav";
import cx from "classnames";
import { Menu, XCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 z-10 ">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div
            className={cx("flex mt-14", {
              ["justify-between items-start"]: !isNavOpen,
              ["justify-end"]: isNavOpen,
            })}
          >
            {!isNavOpen && (
              <nav className="hidden sm:flex space-x-6">
                <Link
                  className="text-sm hover:text-gray-600 transition-colors"
                  href="/about"
                >
                  About
                </Link>
                <Link
                  className="text-sm hover:text-gray-600 transition-colors"
                  href="/projects"
                >
                  Projects
                </Link>
                <Link
                  className="text-sm hover:text-gray-600 transition-colors"
                  href="/contact"
                >
                  Contact
                </Link>
              </nav>
            )}

            {isNavOpen ? (
              <div className="">
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsNavOpen(true)}
                className="p-2"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      <FullScreenNav isOpen={isNavOpen} />
    </>
  );
}

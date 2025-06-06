"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
  ProductItem,
  HoveredLink,
} from "@/components/ui/Navbar/components/NavbarItems";
import { Logo } from "../logo";

interface NavigationMenuProps {
  isScrolled?: boolean;
  videoExited?: boolean;
}

export default function NavigationMenu({
  isScrolled = false,
  videoExited = false,
}: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Company",
      children: (
        <div className="flex flex-col space-y-4 text-lg">
          <HoveredLink href="/about-us">Our Brand</HoveredLink>
          <HoveredLink href="/about-us">Our Team</HoveredLink>
          <HoveredLink href="/news">News</HoveredLink>
          <HoveredLink href="/careers">Careers</HoveredLink>
        </div>
      ),
    },
    {
      name: "Projects",
      fullWidth: true,
      children: (
        <div className="text-sm grid grid-cols-2 gap-10 p-4">
          <ProductItem
            title="Algochurn"
            href="https://algochurn.com"
            src="https://assets.aceternity.com/demos/algochurn.webp"
            description="Prepare for tech interviews like never before."
          />
          <ProductItem
            title="Tailwind Master Kit"
            href="https://tailwindmasterkit.com"
            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
            description="Production ready Tailwind css components for your next project"
          />
          <ProductItem
            title="Moonbeam"
            href="https://gomoonbeam.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
            description="Never write from scratch again. Go from idea to blog in minutes."
          />
          <ProductItem
            title="Rogue"
            href="https://userogue.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
          />
        </div>
      ),
    },
    // {
    //   name: "Company",
    //   children: (
    //     <div className="flex flex-col space-y-4 text-sm">
    //       <HoveredLink href="/hobby">Hobby</HoveredLink>
    //       <HoveredLink href="/individual">Individual</HoveredLink>
    //       <HoveredLink href="/team">Team</HoveredLink>
    //       <HoveredLink href="/enterprise">Enterprise</HoveredLink>
    //     </div>
    //   ),
    // },
    {
      name: "Landowners",
      link: "/landowners",
    },
    {
      name: "Buyers Guide",
      link: "/buyers-guide",
    },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <Logo size="md" />
        <NavItems items={navItems} />
        <div className="flex space-x-2">
          <NavbarButton>Sign Up</NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation
      <MobileNav>
        <MobileNavHeader>
          
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link || "#"}
              className="text-neutral-600 dark:text-neutral-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col space-y-2 pt-4">
            <NavbarButton variant="secondary" className="w-full">
              Login
            </NavbarButton>
            <NavbarButton className="w-full">Sign Up</NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav> */}
    </Navbar>
  );
}

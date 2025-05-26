"use client";

import { NavigationLink } from "./navigation-link";

interface NavigationItem {
  href: string;
  label: string;
  children?: NavigationItem[];
}

interface NavigationMenuProps {
  items: NavigationItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function NavigationMenu({ 
  items, 
  className = "", 
  orientation = "horizontal" 
}: NavigationMenuProps) {
  return (
    <nav className={`flex ${orientation === "horizontal" ? "space-x-6" : "flex-col space-y-4"} ${className}`}>
      {items.map((item) => (
        <div key={item.href} className="relative group">
          <NavigationLink href={item.href}>
            {item.label}
          </NavigationLink>
          {item.children && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {item.children.map((child) => (
                  <NavigationLink
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {child.label}
                  </NavigationLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}